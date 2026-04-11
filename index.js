import React from 'react';

function resolveValue(value, prevValue) {
  return typeof value === 'function' ? value(prevValue) : value
}

export default function createSharedState(initialValue) {
  const stateRef = {
    value: resolveValue(initialValue),
    subscribers: new Set(),
  };

  const sharedState = {
    use: () => {
      const { value, subscribers } = stateRef;
      const [stateValue, setStateValue] = React.useState(value);

      React.useEffect(() => {
        subscribers.add(setStateValue);
        return () => {
          subscribers.delete(setStateValue);
        };
      }, []);

      const updateState = newValue => {
        stateRef.value = resolveValue(newValue, stateRef.value)
        for (const subscriber of subscribers) {
          subscriber(stateRef.value);
        }
      };

      return [stateValue, updateState];
    },
    setValue: value => {
      stateRef.value = resolveValue(value, stateRef.value)
      for (let setter of stateRef.subscribers) {
        setter(stateRef.value);
      }
    },
    getValue: () => stateRef.value,
  };

  sharedState.useValue = () => sharedState.use()[0];

  return sharedState;
}
