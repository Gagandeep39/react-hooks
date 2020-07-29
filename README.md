# React Hooks

- [React Hooks](#react-hooks)
  - [Deployment](#deployment)
  - [React Hooks](#react-hooks-1)
    - [`useState`](#usestate)
    - [Functional Component](#functional-component)
    - [Classs based component](#classs-based-component)

## Deployment 
Test the application at https://gagandeep39.github.io/react-hooks


## React Hooks
- Used in Functional COmponents
- JS FUnctions that can only be used from inside functonal compoents
- Naming convection `useXYZ()`
- Exposes state mnagamenet functionalitie to functional component
- Nothing to do with lifecycle hooks
- Introduced in 16.8
- Note
  - Must not be used in react specific nested function
  - Must only be used in functional components
  - Cannot be iitialized in loops and if statement
- Important hooks
  - `useState` - To manage State
  - `useEffect` - Execute lifecycle method in a functional component. Executes everytime after the component is re rendered (componentDidUpdate lifecycle to be precise)
  - `useContext` - 
  - `useCallback` - Caches the function to prevent rerender cycle
  - `useRef` - Reference object for an element
  - `useReducer` - When one state depends on another, write a cleaner logic. COnsists of a current state and dispatcher to change states
  - `useMemo` - Performance improvement. SImilar to React.memo. Also prevent rerendering. Must be used to prevent mmultiple computation due to re rendering

### `useState`
- Provds state management in functional component
- To update a statement we are required to update the state of all values associated with it
- Hence we must use a different variable for different data eg. 2 different variables for 2 different input box
- In case of Multiple values
  ```js
  setInputState((previousInputState) => ({
    title: newTitle,
    amount: previousInputState.amount,
  }));
  ```
  - Here we have to access previous state and set the current state as previous state for values that arent changing
- In case of single vaue 
  ```js
  const [amountState, setAmountState] = useState('');
  setAmountState('sxdcfvgthynju')
  ```

### Functional Component
- Props in and JSX output
- Used for presentation 
- Used for One purpose
- Handler is provided as prop
- State can be change in a class that will update the view component

### Classs based component
- Uses props and state
- BUssiness logic goes here
- Orchestrate components (Arrange components)
