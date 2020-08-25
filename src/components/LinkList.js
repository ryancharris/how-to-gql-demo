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
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
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
          {data.feed.links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default LinkList;
