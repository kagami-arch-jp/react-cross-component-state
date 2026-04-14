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
    setValue: newValue => {
      stateRef.value = resolveValue(newValue, stateRef.value)
      for (const subscriber of stateRef.subscribers) {
        subscriber(stateRef.value);
      }
    },
    getValue: () => stateRef.value,
  }

  sharedState.use = () => {
    const { value, subscribers } = stateRef;
    const [stateValue, setStateValue] = React.useState(value);

    React.useEffect(() => {
      subscribers.add(setStateValue);
      return () => {
        subscribers.delete(setStateValue);
      };
    }, []);

    return [stateValue, (...x)=>sharedState.setValue(...x)];
  }

  sharedState.useValue = () => sharedState.use()[0];

  return sharedState;
}
