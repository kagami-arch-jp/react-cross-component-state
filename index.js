import React from 'react';

export default function createSharedState(initialValue) {
  const stateRef = {
    value: typeof initialValue === 'function' ? initialValue() : initialValue,
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
        stateRef.value = newValue;
        for (const subscriber of subscribers) {
          subscriber(newValue);
        }
      };

      return [stateValue, updateState];
    },
    setValue: value => {
      stateRef.value = typeof value==='function'? value(): value;
      for (let setter of stateRef.subscribers) {
        setter(value);
      }
    },
    getValue: () => stateRef.value,
  };

  sharedState.useValue = () => sharedState.use()[0];

  return sharedState;
}
