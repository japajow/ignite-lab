import { gql } from "@apollo/client";
import { useEffect } from "react";
import { client } from "./lib/apollo";

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
    }
  }
`;

function App() {
  useEffect(() => {
    client
      .query({
        query: GET_LESSONS_QUERY,
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  return <h1 className="text-2xl font-bold text-violet-500">Hello World</h1>;
}

export default App;
