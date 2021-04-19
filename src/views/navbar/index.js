import React from 'react'
import { Link } from "react-router-dom";
import {
    Collapse,
    UncontrolledCollapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    FormGroup,
    Form,
    Input,
    Badge,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    UncontrolledTooltip,
    Nav,
    Container
  } from "reactstrap";
  import './index.css'
  function NavMubar(props){
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    let index = "1";
    if (window.location.pathname === "/bpmigration") {
      index = "2"
    }
    const [iconPills, setIconPills] = React.useState(index);
    React.useEffect(() => {
      const updateNavbarColor = () => {
        if (
          document.documentElement.scrollTop > 399 ||
          document.body.scrollTop > 399
        ) {
          setNavbarColor("");
        } else if (
          document.documentElement.scrollTop < 400 ||
          document.body.scrollTop < 400
        ) {
          setNavbarColor("navbar-transparent");
        }
      };
      window.addEventListener("scroll", updateNavbarColor);
      return function cleanup() {
        window.removeEventListener("scroll", updateNavbarColor);
      };
    });
    function hanleLogOut () {
      window.open("/index", "_self");
    }
    return (
      <>
        {collapseOpen ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setCollapseOpen(false);
            }}
          />
        ) : null}
        <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
          <Container>
            <UncontrolledDropdown className="button-dropdown">
              <DropdownToggle
                caret
                data-toggle="dropdown"
                href="#pablo"
                id="navbarDropdown"
                tag="a"
                onClick={(e) => e.preventDefault()}
              >
                <span className="button-bar"></span>
                <span className="button-bar"></span>
                <span className="button-bar"></span>
              </DropdownToggle>
              <DropdownMenu aria-labelledby="navbarDropdown">
                <DropdownItem header tag="a">
                  Dropdown header
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  Action
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  Another action
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  Something else here
                </DropdownItem>
                <DropdownItem divider></DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  Separated link
                </DropdownItem>
                <DropdownItem divider></DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  One more separated link
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <div className="navbar-translate">
              {/* // for the button right */}
              <NavbarBrand href="" id="navbar-brand"></NavbarBrand>
              <button
                className="navbar-toggler navbar-toggler"
                onClick={() => {
                  document.documentElement.classList.toggle("nav-open");
                  setCollapseOpen(!collapseOpen);
                }}
                aria-expanded={collapseOpen}
                type="button"
              >
                <span className="navbar-toggler-bar top-bar"></span>
                <span className="navbar-toggler-bar middle-bar"></span>
                <span className="navbar-toggler-bar bottom-bar"></span>
              </button>
            </div>
            <Collapse
              className="justify-content-end"
              isOpen={collapseOpen}
              navbar
            >
        <Navbar  className={"bg-info fixed-top"}  expand="lg">
          <Container>
            <button
              className="navbar-toggler"
              id="navbarTogglerDemo01"
              type="button"
            >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
            <UncontrolledCollapse navbar toggler="#navbarTogglerDemo01">
              
              <Nav className="mr-auto mt-2 mt-lg-0 " navbar>
              <NavItem >
                  <NavLink className="disabled">
                    BP migration 
                  </NavLink>
                </NavItem>
                <NavItem className={iconPills === "1" ? "active" : ""}>
                  <NavLink href="/mainLayout">
                  <i className="now-ui-icons objects_globe"></i>
                    Home <span className="sr-only">(current)</span>
                  </NavLink>
                </NavItem>
                <NavItem className={iconPills === "2" ? "active" : ""}>
                  <NavLink 
                    href="/bpmigration" 
                  >
                  <i className="now-ui-icons business_chart-bar-32"></i>
                    Daily Migration 
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="disabled"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="now-ui-icons business_bank"></i>
                    Bank
                  </NavLink>
                </NavItem>
                
                <UncontrolledDropdown nav>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  Dropdown link
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </Nav>
              <Form className="form-inline ml-auto" data-background-color="">
                <FormGroup className="has-white">
                  <Input placeholder="Search" type="text"></Input>
                </FormGroup>
                <Nav className="navBar_menuOptions" >
                  <NavItem className="active">
                    <NavLink 
                    href="#pablo"
                    onClick={e => e.preventDefault()}>
                      <i className="now-ui-icons ui-1_bell-53 menu-on-right"></i>
                      <Badge className=" noticeBage_navBar" color="danger">6</Badge>
                    </NavLink>
                </NavItem>
                <UncontrolledDropdown nav>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={e => e.preventDefault()}
                >
                      <i className="now-ui-icons users_single-02 menu-on-right"></i>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Name: Admin
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="now-ui-icons business_badge menu-on-right"></i>
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => hanleLogOut()}
                  >
                    <i className="now-ui-icons media-1_button-power menu-on-right"></i>
                    
                    Login Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                <NavItem className="active">
                    <NavLink 
                    href="#pablo"
                    onClick={e => e.preventDefault()}>
                      <i className="now-ui-icons ui-1_settings-gear-63 menu-on-right"></i>
                    </NavLink>
                </NavItem>
                </Nav>
              </Form>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
  
  export default NavMubar;

