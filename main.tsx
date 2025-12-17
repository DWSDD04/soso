import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import App from './App.tsx';
import { Provider } from "react-redux";
import { store } from "./store";

// Apollo Client imports
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/client"; // your Apollo Client setup

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
