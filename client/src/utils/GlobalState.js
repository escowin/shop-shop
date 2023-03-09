import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// createContext | instantiates a new Context object aka creates the container to hold global state data & functionality
// useContext | hook allows app to use the state created from the `createContext` function

// every Context object comes with two components : `provider` and `consumer`
// - provider | wraps around App. state data that's passed into it is available as a prop to all other components
// - consumer | the means of grabbing & using provider-held data

const StoreContext = createContext();
const { Provider } = StoreContext();

// serves as <Provider> | defined paramters allows it to accept props
// - value | opens up possibility to pass in more data for state if needed
// - ...props | handles any other needed props via props.children
const StoreProvider = ({ value = [], ...props }) => {
  // state | most up-to-date version of the global object
  // dispatch | method executes to update state based on the action object passed in as its argument
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: "",
  });

  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

// custom hook | receives `[state, dispatch]` data managed by `StoreProvider`
// - components with access can use any data in the global state container or update it using `dispatch`
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
