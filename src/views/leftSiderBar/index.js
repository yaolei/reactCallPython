import React from "react";
import "./index.css"
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Row,
  TabContent,
  TabPane,
  Card,
  Col
} from "reactstrap";

function LeftSideBar(){
  const [iconHTabs,setIconHTabs] = React.useState("1");
  return (
    <>
    <Row className="leftSideConnect_layout">
    <Col md="4">
      <Nav className="nav-pills-info nav-pills-icons" pills role="tablist">
        <NavItem>
          <NavLink
            className={iconHTabs === "1" ? "active" : ""}
            href="#pablo"
            onClick={e => {
              e.preventDefault();
              setIconHTabs("1");
            }}
          >
            <i className="now-ui-icons objects_umbrella-13"></i>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={iconHTabs === "2" ? "active" : ""}
            href="#pablo"
            onClick={e => {
              e.preventDefault();
              setIconHTabs("2");
            }}
          >
            <i className="now-ui-icons shopping_shop"></i>
            Messages
          </NavLink>
        </NavItem>
      </Nav>
      </Col>
      <Col md="8">
      <TabContent className="tab-space" activeTab={"iconHTabs" + iconHTabs}>
        <TabPane tabId="iconHTabs1">
          Collaboratively administrate empowered markets via plug-and-play
          networks. Dynamically procrastinate B2C users after installed base
          benefits. <br></br>
          <br></br>
          Dramatically visualize customer directed convergence without
          revolutionary ROI.
        </TabPane>
        <TabPane tabId="iconHTabs2">
          Efficiently unleash cross-media information without cross-media
          value. Quickly maximize timely deliverables for real-time schemas.{" "}
          <br></br>
          <br></br>
          Dramatically maintain clicks-and-mortar solutions without functional
          solutions.
        </TabPane>
      </TabContent>
      </Col>
      </Row>
    </>
  );
}

export default LeftSideBar;