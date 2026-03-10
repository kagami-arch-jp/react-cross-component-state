# Shared State Management with React Hooks

## Overview
This module provides a way to manage and share state across multiple React components using the Observer pattern combined with React hooks. It allows for decoupling of data from component lifecycles, enabling more flexible and maintainable code.

### Features
- **Cross-component State Sharing**: Share state between different components without prop drilling.
- **Lifecycle Independence**: The state's lifecycle is independent of any specific component, allowing it to persist beyond the lifespan of individual components.
- **Ease of Use**: Simple API for accessing and updating shared state.

## Implementation Principle
The core idea is to use a combination of React hooks (`useState` and `useEffect`) along with JavaScript's Set data structure to manage subscribers. When a component subscribes to the state, it registers its setter function from `useState`. Whenever the state changes, all registered setters are called to update their respective components.

## Usage Example

```jsx
import React from 'react';
import createSharedState from 'react-cross-component-state';

const sharedCounter = createSharedState(0);

function Counter() {
  const [count, setCount] = sharedCounter.use();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function Display() {
  const count = sharedCounter.useValue();

  return (
    <div>
      <h2>Shared Count: {count}</h2>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <Display />
    </div>
  );
}

export default App;
```

## Method Descriptions

### `createSharedState(initialValue)`
- **Parameters**: 
  - `initialValue`: The initial value of the shared state. It can be a static value or a function that returns a value.
- **Returns**: An object with methods to interact with the shared state.

### `use()`
- **Returns**: A tuple containing the current state and a function to update it.
- **Usage Example**:
  ```jsx
  const [state, setState] = sharedState.use();
  ```

### `setValue(value)`
- **Parameters**: 
  - `value`: The new value to set for the shared state.
- **Usage Example**:
  ```javascript
  sharedState.setValue(10);
  ```

### `getValue()`
- **Returns**: The current value of the shared state.
- **Usage Example**:
  ```javascript
  const currentValue = sharedState.getValue();
  ```

### `useValue()`
- **Returns**: The current value of the shared state without providing an update function.
- **Usage Example**:
  ```jsx
  const count = sharedState.useValue();
  ```