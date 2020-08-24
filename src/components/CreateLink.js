import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

function CreateLink(props) {
  let history = useHistory();
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [createLink, { data }] = useMutation(POST_MUTATION, {
    onCompleted: () => history.push("/"),
    onError: () => history.push("/"),
  });

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button
        onClick={() => {
          createLink({
            variables: {
              description: description,
              url: url,
            },
          });
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default CreateLink;
