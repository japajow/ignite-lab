import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4o87jp717vc01z20w4v30a8/master",
  cache: new InMemoryCache(),
});
