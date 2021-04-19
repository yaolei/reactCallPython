import React from 'react'
import NavMubar from 'views/navbar/index'
import {
    Card,
    Row,
    Col,
  } from "reactstrap";
  import './index.css'

import LeftSiderBar from 'views/leftSiderBar/index.js'
import Histogram from '../../components/Charts/Histogram.js'
import BallCharts from '../../components/Charts/ballCharts.js'
import MiddleconnectLayout from 'views/middleconnect/middleconnect_layout'
function MainLayout() {
    React.useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.body.classList.add("sidebarColor");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
          document.body.classList.remove("login-page");
          document.body.classList.remove("sidebar-collapse");
          document.body.classList.remove("sidebarColor");
        };
      }, []);
    return(
        <>
      <NavMubar />
      <div className=" clear-filter" >
        <div className="content">
              <Row>
                <Col className="singIn_layout" xs={12} sm={12} md={4}>
                  <Card className="leftSidebar_marginLeft20_card"><LeftSiderBar /></Card>
                </Col>
                <Col className="singIn_layout_middle "xs={12} sm={12} md={4}>
                  <Card className="leftSidebar_marginLeft20_card">
                    <Histogram/>
                  </Card>
                </Col>
                <Col className="singIn_layout "  xs={12} sm={12} md={4}>
                    <Card className="rightSidebar_marginright20_card">
                      <BallCharts />
                    </Card>
                </Col>
                <Col className="singIn_layout_seconed " xs={12} sm={12} md={12}>
                  <Card className="middle_connect_seconde">
                      <MiddleconnectLayout />
                  </Card>
                </Col>
            </Row>
        </div>
          {/* footer */}
      </div>
        </>
    )

}

export default MainLayout;