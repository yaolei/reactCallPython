import React from 'react'
import NavMubar from 'views/navbar/index'
import './index.css'
import {
    Card,
    Row,
    Col,
  } from "reactstrap";
  import ConnectPython from 'views/middleconnect/connectPython.js'
function MigrationMainLayout() {
    return(
        <>
      <NavMubar selectId={2}/>
      <div className=" clear-filter" >
        <div className="content">
              <Row>
                <Col className="singIn_layout" xs={12} sm={12} md={12}>
                  <Card className="migrationCardLayout">
                            <ConnectPython />
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