import { roadmapData } from '../data.js';

const STORAGE_KEYS = {
  data: 'roadmapData',
  weeklyNotes: 'roadmapWeeklyNotes',
  weeklyLinks: 'roadmapWeeklyLinks',
  portfolio: 'roadmapPortfolio',
  version: 'roadmapStateVersion'
};

export const STORAGE_VERSION = 2;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getStorage(storage) {
  if (storage) {
    return storage;
  }

  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }

  return null;
}

function readJson(key, fallback, storage = getStorage()) {
  try {
    if (!storage) {
      return fallback;
    }

    const rawValue = storage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    return fallback;
  }
}

function readVersion(storage = getStorage()) {
  if (!storage) {
    return 0;
  }

  const rawVersion = storage.getItem(STORAGE_KEYS.version);
  const parsedVersion = Number(rawVersion);
  return Number.isFinite(parsedVersion) ? parsedVersion : 0;
}

function createTodoCompletionMap(savedData) {
  const completionMap = new Map();

  if (!Array.isArray(savedData)) {
    return completionMap;
  }

  savedData.forEach((month) => {
    (month.weeks || []).forEach((week) => {
      (week.todos || []).forEach((todo) => {
        if (typeof todo.id === 'string') {
          completionMap.set(todo.id, Boolean(todo.completed));
        }
      });
    });
  });

  return completionMap;
}

function buildWeekKeyMap(data) {
  const keyMap = new Map();

  data.forEach((month) => {
    month.weeks.forEach((week) => {
      keyMap.set(week.id, week.id);
      keyMap.set(`${month.id}-${week.id}`, week.id);
    });
  });

  return keyMap;
}

function normalizeNotesMap(value, keyMap) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value).reduce((acc, [rawKey, rawValue]) => {
    const normalizedKey = keyMap.get(rawKey);
    if (!normalizedKey || typeof rawValue !== 'string') {
      return acc;
    }

    acc[normalizedKey] = rawValue;
    return acc;
  }, {});
}

function normalizeLinksMap(value, keyMap) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value).reduce((acc, [rawKey, rawLinks]) => {
    const normalizedKey = keyMap.get(rawKey);
    if (!normalizedKey || !Array.isArray(rawLinks)) {
      return acc;
    }

    acc[normalizedKey] = rawLinks
      .filter((link) => link && typeof link === 'object')
      .map((link, index) => ({
        id: typeof link.id === 'string' ? link.id : `${normalizedKey}-${index}`,
        title: typeof link.title === 'string' ? link.title : 'Kaynak',
        url: typeof link.url === 'string' ? link.url : ''
      }))
      .filter((link) => link.url.trim().length > 0);

    return acc;
  }, {});
}

function normalizePortfolioMap(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value).reduce((acc, [key, rawValue]) => {
    if (typeof rawValue === 'string') {
      acc[key] = rawValue;
    }
    return acc;
  }, {});
}

function buildRoadmapDataFromProgress(savedData) {
  const completionMap = createTodoCompletionMap(savedData);
  const template = clone(roadmapData);

  return template.map((month) => ({
    ...month,
    weeks: month.weeks.map((week) => ({
      ...week,
      todos: week.todos.map((todo) => ({
        ...todo,
        completed: completionMap.has(todo.id) ? completionMap.get(todo.id) : todo.completed
      }))
    }))
  }));
}

export function getMonthSummaryTitle(title) {
  return title.split(' - ')[0].trim();
}

export function getWeekStorageKey(week) {
  return week.id;
}

function buildNormalizedState(storage = getStorage()) {
  const defaultData = clone(roadmapData);
  const weekKeyMap = buildWeekKeyMap(defaultData);
  const savedData = readJson(STORAGE_KEYS.data, null, storage);

  return {
    data: buildRoadmapDataFromProgress(savedData),
    weeklyNotes: normalizeNotesMap(readJson(STORAGE_KEYS.weeklyNotes, {}, storage), weekKeyMap),
    weeklyLinks: normalizeLinksMap(readJson(STORAGE_KEYS.weeklyLinks, {}, storage), weekKeyMap),
    portfolioData: normalizePortfolioMap(readJson(STORAGE_KEYS.portfolio, {}, storage))
  };
}

export function persistRoadmapState({ data, weeklyNotes, weeklyLinks, portfolioData }, storage = getStorage()) {
  if (!storage) {
    return;
  }

  storage.setItem(STORAGE_KEYS.data, JSON.stringify(data));
  storage.setItem(STORAGE_KEYS.weeklyNotes, JSON.stringify(weeklyNotes));
  storage.setItem(STORAGE_KEYS.weeklyLinks, JSON.stringify(weeklyLinks));
  storage.setItem(STORAGE_KEYS.portfolio, JSON.stringify(portfolioData));
  storage.setItem(STORAGE_KEYS.version, STORAGE_VERSION.toString());
}

export function migrateRoadmapState(storage = getStorage()) {
  const normalizedState = buildNormalizedState(storage);
  const currentVersion = readVersion(storage);

  if (storage && currentVersion < STORAGE_VERSION) {
    persistRoadmapState(normalizedState, storage);
  }

  return normalizedState;
}

export function loadRoadmapState(storage = getStorage()) {
  return migrateRoadmapState(storage);
}

export function createResetState() {
  return {
    data: clone(roadmapData),
    weeklyNotes: {},
    weeklyLinks: {},
    portfolioData: {}
  };
}

export function resetRoadmapStorage(storage = getStorage()) {
  const resetState = createResetState();
  persistRoadmapState(resetState, storage);
  return resetState;
}

export function toggleTodoInRoadmap(data, monthId, weekId, todoId) {
  return data.map((month) => {
    if (month.id !== monthId) {
      return month;
    }

    return {
      ...month,
      weeks: month.weeks.map((week) => {
        if (week.id !== weekId) {
          return week;
        }

        return {
          ...week,
          todos: week.todos.map((todo) => (
            todo.id === todoId
              ? { ...todo, completed: !todo.completed }
              : todo
          ))
        };
      })
    };
  });
}

export function calculateProgress(data) {
  const totalTodos = data.reduce(
    (monthTotal, month) => monthTotal + month.weeks.reduce((weekTotal, week) => weekTotal + week.todos.length, 0),
    0
  );
  const completedTodos = data.reduce(
    (monthTotal, month) => monthTotal + month.weeks.reduce((weekTotal, week) => weekTotal + week.todos.filter((todo) => todo.completed).length, 0),
    0
  );

  return {
    totalTodos,
    completedTodos,
    percentage: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0
  };
}
