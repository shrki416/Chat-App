import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Header, Icon } from "semantic-ui-react";

const Title = () => {
  return (
    <>
      <Header as="h1">
        <Icon name="comments outline" />
        <Header.Content>Chat App</Header.Content>
      </Header>
    </>
  );
};

export default Title;
