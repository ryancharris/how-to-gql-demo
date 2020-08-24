import React from "react";
import Link from "./Link";

import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

function LinkList(props) {
  const { loading, error, data } = useQuery(FEED_QUERY);

  return (
    <>
      {loading && <div>Fetching</div>}
      {error && <div>Error</div>}
      {data && (
        <div>
          {data.feed.links.map((link) => (
            <Link key={link.id} link={link} />
          ))}
        </div>
      )}
    </>
  );
}

export default LinkList;
