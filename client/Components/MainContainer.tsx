/** @format */

import React from "https://dev.jspm.io/react";

const MainContainer = () => {
  return (
    <div>
      <h1>Obsidian Server Cache Is Active</h1>
      <p>
        You can send graphql Requests through postman localhost:3000/graphql
      </p>
      <p>
        If the usePlayground option is set to true you can use the graphql
        playground at localhost:3000/graphql
      </p>
      <button>Get Movie</button>
    </div>
  );
};

export default MainContainer;
