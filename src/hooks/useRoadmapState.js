import { useEffect, useMemo, useRef, useState } from 'react';
import {
  calculateProgress,
  loadRoadmapState,
  persistRoadmapState,
  resetRoadmapStorage,
  toggleTodoInRoadmap
} from '../utils/roadmapState';

export default function useRoadmapState() {
  const persistTimeoutRef = useRef(null);
  const [initialState] = useState(() => loadRoadmapState());
  const [data, setData] = useState(initialState.data);
  const [weeklyNotes, setWeeklyNotes] = useState(initialState.weeklyNotes);
  const [weeklyLinks, setWeeklyLinks] = useState(initialState.weeklyLinks);
  const [portfolioData, setPortfolioData] = useState(initialState.portfolioData);

  useEffect(() => {
    if (persistTimeoutRef.current) {
      clearTimeout(persistTimeoutRef.current);
    }

    persistTimeoutRef.current = setTimeout(() => {
      persistRoadmapState({ data, weeklyNotes, weeklyLinks, portfolioData });
    }, 250);

    return () => {
      if (persistTimeoutRef.current) {
        clearTimeout(persistTimeoutRef.current);
      }
    };
  }, [data, weeklyNotes, weeklyLinks, portfolioData]);

  const progress = useMemo(() => calculateProgress(data), [data]);

  const toggleTodoCompletion = (monthId, weekId, todoId) => {
    setData((currentValue) => toggleTodoInRoadmap(currentValue, monthId, weekId, todoId));
  };

  const resetRoadmap = () => {
    const nextState = resetRoadmapStorage();
    setData(nextState.data);
    setWeeklyNotes(nextState.weeklyNotes);
    setWeeklyLinks(nextState.weeklyLinks);
    setPortfolioData(nextState.portfolioData);
  };

  return {
    data,
    setData,
    weeklyNotes,
    setWeeklyNotes,
    weeklyLinks,
    setWeeklyLinks,
    portfolioData,
    setPortfolioData,
    progress,
    toggleTodoCompletion,
    resetRoadmap
  };
}
