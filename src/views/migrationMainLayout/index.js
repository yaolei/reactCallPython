import React , {createContext, useState} from 'react'
import NavMubar from 'views/navbar/index'
import './index.css'
import {
    Card,
    Row,
    Col,
  } from "reactstrap";
  import ConnectPython from 'views/middleconnect/connectPython.js'
export const FatherContext = createContext();
function MigrationMainLayout() {

  //get url pathname
  const [pathname, setPathname] = useState(window.location.pathname);
  React.useEffect(() => {
    // document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.body.classList.add("sidebarColor");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      // document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
      document.body.classList.remove("sidebarColor");
    };
  }, []);
    return(
        <>
      <NavMubar selectId={2}/>
      <div className="clear-filter">
        <div className="content">
              <Row>
                <Col className="singIn_layout" xs={12} sm={12} md={12}>
                  <Card className="migrationCardLayout">
                    <FatherContext.Provider value={pathname}>
                        <ConnectPython />
                    </FatherContext.Provider>
                  </Card>
                </Col>
            </Row>
        </div>
          {/* footer */}
      </div>
        </>
    )
}
export default MigrationMainLayout