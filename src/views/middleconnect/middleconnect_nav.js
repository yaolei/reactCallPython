import React from "react";

// reactstrap components
import {
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane
} from "reactstrap";

function MiddleconnectNav(){
  const [iconTabs, setIconTabs] = React.useState("1");
  return (
    <>

        <CardHeader>
          <Nav className="justify-content-center" role="tablist" tabs>
            <NavItem>
              <NavLink
                className={iconTabs === "1" ? "active" : ""}
                href="#pablo"
                onClick={e => {
                  e.preventDefault();
                  setIconTabs("1");
                }}
              >
                <i className="now-ui-icons objects_umbrella-13"></i>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={iconTabs === "2" ? "active" : ""}
                href="#pablo"
                onClick={e => {
                  e.preventDefault();
                  setIconTabs("2");
                }}
              >
                <i className="now-ui-icons shopping_cart-simple"></i>
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={iconTabs === "3" ? "active" : ""}
                href="#pablo"
                onClick={e => {
                  e.preventDefault();
                  setIconTabs("3");
                }}
              >
                <i className="now-ui-icons shopping_shop"></i>
                Messages
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={iconTabs === "4" ? "active" : ""}
                href="#pablo"
                onClick={e => {
                  e.preventDefault();
                  setIconTabs("4");
                }}
              >
                <i className="now-ui-icons ui-2_settings-90"></i>
                Settings
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent
            className="text-center"
            activeTab={"iconTabs" + iconTabs}
          >
            <TabPane tabId="iconTabs1">
              <p>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that things
                could be at. So when you get something that has the name Kanye
                West on it, it’s supposed to be pushing the furthest
                possibilities. I will be the leader of a company that ends up
                being worth billions of dollars, because I got the answers. I
                understand culture. I am the nucleus.
              </p>
            </TabPane>
            <TabPane tabId="iconTabs2">
              <p>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers. I understand
                culture. I am the nucleus. I think that’s a responsibility
                that I have, to push possibilities, to show people, this is
                the level that things could be at. I think that’s a
                responsibility that I have, to push possibilities, to show
                people, this is the level that things could be at.
              </p>
            </TabPane>
            <TabPane tabId="iconTabs3">
              <p>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that things
                could be at. So when you get something that has the name Kanye
                West on it, it’s supposed to be pushing the furthest
                possibilities. I will be the leader of a company that ends up
                being worth billions of dollars, because I got the answers. I
                understand culture. I am the nucleus.
              </p>
            </TabPane>
            <TabPane tabId="iconTabs4">
              <p>
                "I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers. I understand
                culture. I am the nucleus. I think that’s a responsibility
                that I have, to push possibilities, to show people, this is
                the level that things could be at."
              </p>
            </TabPane>
          </TabContent>
        </CardBody>
    </>
  );
}

export default MiddleconnectNav;