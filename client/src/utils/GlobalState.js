import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// createContext | creates container to hold global state data & functionality
// useContext | react hook to use state created from createContext

const StoreContext = createContext();
// every context object comes with two components (provider, and consumer).
// - provider | wraps around an application in order to make the state data thats passed into it available as a prop for other components.
// - consumer | means of grabbing and using the data that the provider holds.
// ex: <ApolloProvider> is used to make graphql api requests available to entire app
const { Provider } = StoreContext;

// instantiates initial global state w/ useProductReducer()
const StoreProvider = ({ value = [], ...props }) => {
  // - state | returns most up-to-date version of global state
  // - dispatch | method used to update state. looks for an action object passed in as its argument
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: "",
  });
  console.log(state);

  // returns custom <Provider> component with state object & dispatch function as data for the `value` prop.
  // `...props` is needed in return otherwise nothing on page can be rendered
  return <Provider value={[state, dispatch]} {...props} />;
};

// custome hook | when exectuted from within a component, `[state, dispatch]` data (managed by StoreProvider) is received. any component that has access to StoreProvider component can use any data in global state container and/or update it (using dispatch).
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
