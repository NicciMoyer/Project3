import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Animated } from "react-animated-css"

function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
          <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
            </Animated>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
