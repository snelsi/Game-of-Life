import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== undefined) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay || 0);
    return () => clearInterval(id);
  }, [delay]);
}

export function generateEmptyGrid(rows: number, columns: number, defaultValue: any = undefined) {
  const matrix = Array.from(Array(rows), () => new Array(columns));
  if (defaultValue !== undefined) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        matrix[i][j] = defaultValue;
      }
    }
  }
  return matrix;
}

export interface StableActions<K> {
  add: (key: K) => void;
  remove: (key: K) => void;
  reset: () => void;
}

export interface Actions<K> extends StableActions<K> {
  has: (key: K) => boolean;
  setSet: (newSet: Set<K>) => void;
}

export const useSet = <K>(initialSet = new Set<K>()): [Set<K>, Actions<K>] => {
  const [set, setSet] = useState(initialSet);

  const stableActions = useMemo<StableActions<K>>(
    () => ({
      add: item => setSet(prevSet => new Set([...Array.from(prevSet), item])),
      remove: item => setSet(prevSet => new Set(Array.from(prevSet).filter(i => i !== item))),
      reset: () => setSet(initialSet),
    }),
    [setSet, initialSet],
  );

  const utils = {
    has: useCallback(item => set.has(item), [set]),
    setSet,
    ...stableActions,
  } as Actions<K>;

  return [set, utils];
};
