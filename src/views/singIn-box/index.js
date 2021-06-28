import React from "react";
import './index.css'
// reactstrap components
import {
  Button,
  Card,
  FormGroup,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

function LoginPage(props) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [userNamevalStyle, setUserNameValStyle] = React.useState("");
  const [passwordvalStyle, setPasswordNameValStyle] = React.useState("");

  const [userNameErrorMsg, setUserNameErrorMsg] = React.useState("");
  const [userPasswordErrorMsg, setPasswordNameErrorMsg] = React.useState("");

  const [userInfor, setUserInfor] = React.useState("")
  const form = React.useRef(null);


  const [pswType, setPasTypw] = React.useState("password");


  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
    function handleSubmit(e) {
      e.preventDefault();
      let vailationInputForm = 0
      if (userInfor.name && userInfor.name === "admin") {
        setUserNameValStyle("");
        setUserNameErrorMsg("");
      } else {
        vailationInputForm = 1
          setUserNameValStyle("has-danger");
          let accountErrorMsg = "用户名称不正确，请确定使用正确的用户名称";
          if (!userInfor.name) {
            accountErrorMsg = "用户名称不能为空, 请重新填写."
          }
          setUserNameErrorMsg(accountErrorMsg)
      }

      if (userInfor.password && userInfor.password === "123") {
        setPasswordNameErrorMsg("")
        setPasswordNameValStyle("");
      } else {
        vailationInputForm = 1
        setPasswordNameValStyle("has-danger");
        let passwordErrorMsg = "密码不正确, 请输入正确的密码.";
        if (!userInfor.name) {
          passwordErrorMsg = "用户密码不能为空,请重新填写."
        }
        setPasswordNameErrorMsg(passwordErrorMsg)
      }
      console.log(userInfor);
      if (vailationInputForm === 1) {
        return;
      } else {
        window.open("/mainLayout", "_self");
      }
    }
  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
      <Col className="ml-auto mr-auto singInHeader_layout" md="6">
        <div className="content-center brand">
                    <img
                      alt="..."
                      className="n-logo"
                      src={require("assets/img/now-logo.png")}
                    ></img>
                    <h1 className="h1-seo">BP MIGRATION.</h1>
                    <h3>Risk nothing, and you'll gain nothing.</h3>
        </div>
      </Col>
            <Col className="singIn_layout ml-auto mr-auto" md="6">
              <Card className="card-login card-plain">
                <Form onSubmit={handleSubmit} ref={form}>
                <Container>
                  <CardBody >
                  <FormGroup className={userNamevalStyle}>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Account Name..."
                        type="text"
                        defaultValue={userInfor.name}
                        onChange={e => setUserInfor({ ...userInfor, name: e.target.value })}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <i className="errorMsgLi_style">{userNameErrorMsg}</i>
                    </FormGroup>
                    
                    <FormGroup className={passwordvalStyle}>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons objects_key-25"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password..."
                        type={pswType}
                        defaultValue={userInfor.password}
                        onChange={e => setUserInfor({ ...userInfor, password: e.target.value })}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                    <i className="errorMsgLi_style">{userPasswordErrorMsg}</i>
                    </FormGroup>
                  </CardBody>
                  </Container>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      type="submit"
                      color="info"
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="/sing-up"
                          // onClick={(e) => e.preventDefault()}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
