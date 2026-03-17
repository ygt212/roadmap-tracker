import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_VERSION,
  calculateProgress,
  loadRoadmapState,
  resetRoadmapStorage,
  toggleTodoInRoadmap
} from './roadmapState.js';

function createMemoryStorage(seed = {}) {
  const store = new Map(Object.entries(seed));

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    dump() {
      return Object.fromEntries(store.entries());
    }
  };
}

test('loadRoadmapState migrates legacy week keys and persists latest version', () => {
  const legacyStorage = createMemoryStorage({
    roadmapStateVersion: '1',
    roadmapData: JSON.stringify([
      {
        id: 1,
        weeks: [
          {
            id: 'm1-w1',
            todos: [{ id: 't-1', completed: true }]
          }
        ]
      }
    ]),
    roadmapWeeklyNotes: JSON.stringify({
      '1-m1-w1': 'Legacy note'
    }),
    roadmapWeeklyLinks: JSON.stringify({
      '1-m1-w1': [{ id: 'l1', title: 'Example', url: 'https://example.com' }]
    }),
    roadmapPortfolio: JSON.stringify({
      eda: 'https://github.com/example/repo'
    })
  });

  const state = loadRoadmapState(legacyStorage);
  const persisted = legacyStorage.dump();

  assert.equal(state.weeklyNotes['m1-w1'], 'Legacy note');
  assert.equal(state.weeklyLinks['m1-w1'][0].url, 'https://example.com');
  assert.equal(state.data[0].weeks[0].todos[0].completed, true);
  assert.equal(persisted.roadmapStateVersion, String(STORAGE_VERSION));

  const savedNotes = JSON.parse(persisted.roadmapWeeklyNotes);
  assert.deepEqual(Object.keys(savedNotes), ['m1-w1']);
});

test('resetRoadmapStorage clears supplemental state and writes latest version', () => {
  const storage = createMemoryStorage({
    roadmapWeeklyNotes: JSON.stringify({ 'm1-w1': 'note' }),
    roadmapWeeklyLinks: JSON.stringify({ 'm1-w1': [{ id: '1', title: 'x', url: 'https://x.com' }] }),
    roadmapPortfolio: JSON.stringify({ eda: 'https://github.com/example/repo' })
  });

  const resetState = resetRoadmapStorage(storage);
  const persisted = storage.dump();

  assert.deepEqual(resetState.weeklyNotes, {});
  assert.deepEqual(resetState.weeklyLinks, {});
  assert.deepEqual(resetState.portfolioData, {});
  assert.equal(persisted.roadmapStateVersion, String(STORAGE_VERSION));
  assert.deepEqual(JSON.parse(persisted.roadmapWeeklyNotes), {});
});

test('toggleTodoInRoadmap flips only the requested todo', () => {
  const source = [
    {
      id: 1,
      weeks: [
        {
          id: 'm1-w1',
          todos: [
            { id: 't-1', completed: false },
            { id: 't-2', completed: false }
          ]
        }
      ]
    }
  ];

  const updated = toggleTodoInRoadmap(source, 1, 'm1-w1', 't-2');

  assert.equal(updated[0].weeks[0].todos[0].completed, false);
  assert.equal(updated[0].weeks[0].todos[1].completed, true);
  assert.notEqual(updated, source);
});

test('calculateProgress returns rounded completion percentage', () => {
  const progress = calculateProgress([
    {
      id: 1,
      weeks: [
        {
          id: 'm1-w1',
          todos: [
            { id: 't-1', completed: true },
            { id: 't-2', completed: false },
            { id: 't-3', completed: true }
          ]
        }
      ]
    }
  ]);

  assert.deepEqual(progress, {
    totalTodos: 3,
    completedTodos: 2,
    percentage: 67
  });
});
