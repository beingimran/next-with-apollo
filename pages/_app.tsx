import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { setContext } from '@apollo/client/link/context';

import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
const httpLink = createHttpLink({ uri: "http://localhost:4000/" });


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // include token in request header
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer${token}` : "",
      }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return(<ApolloProvider client= {client}> <Component {...pageProps} /></ApolloProvider>)
}
