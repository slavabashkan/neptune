import React, { useEffect, useRef } from 'react';

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * Author: https://stackoverflow.com/a/57632587
 * Idea stolen from: https://stackoverflow.com/a/55075818/1526448
 */
export default function useUpdateEffect(effect: React.EffectCallback, deps: React.DependencyList = []): void {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
