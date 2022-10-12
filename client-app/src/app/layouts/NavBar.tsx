import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  //JUST THE NAVBAR
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: "15px" }} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button as={NavLink} to="/createActivity" positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
