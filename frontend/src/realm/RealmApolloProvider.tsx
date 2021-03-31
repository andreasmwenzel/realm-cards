import * as React from "react";
import * as RealmWeb from "realm-web";
import { useRealmApp } from "./RealmApp";

// Apollo
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-hooks";

const RealmApolloProvider: React.FC = ({ children }) => {
  const { id, user } = useRealmApp();
  const [client, setClient] = React.useState(createApolloClient(id, user));
  React.useEffect(() => {
    setClient(createApolloClient(id, user));
  }, [id, user]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default RealmApolloProvider;

// Implement createApolloClient()
function createApolloClient(realmAppId: string, user: RealmWeb.User<Realm.DefaultFunctionsFactory, any> | null) {
  const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${realmAppId}/graphql`;
  const client = new ApolloClient({
    link: new HttpLink({
      uri: graphql_url,
      fetch: async (uri: RequestInfo, options: RequestInit) => {
        if (!options.headers) {
          options.headers = {} as Record<string, string>;
        }
        // Refreshing custom data also ensures a valid access token
        await user?.refreshCustomData();
        const authenticatedOptions: RequestInit = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${user?.accessToken}`
          }
        }
        return fetch(uri, authenticatedOptions);
      },
    }),
    cache: new InMemoryCache(),
  });

  return client
}
