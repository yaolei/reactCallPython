import React, {useEffect, useState, createContext} from 'react';
import NavMubar from 'views/navbar/index'
import {Card} from 'antd';
import AddnewPro from './addnewPro'
import ProjectList from './projectList'
import axios from 'axios';
import City from '../../assets/json/city.json'
import './index.css'
import {
    Row,
    Col,
  } from "reactstrap";

export const FatherContext = createContext();
const StockLayout =()=>{
    const [tabledatas, setTabledatas] = useState([])
    useEffect(() => {
        document.body.classList.add("sidebar-collapse");
        document.body.classList.add("sidebarColor");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
          document.body.classList.remove("sidebar-collapse");
          document.body.classList.remove("sidebarColor");
        };
    })

    useEffect(()=>{
        getProductListDatas();
    },[])

    const getProductListDatas = () => {
        const urlOrderList = "/productDatas";
        let data = [];
        let URL =  "http://localhost:8000" + urlOrderList;
        axios.get(URL)
        .then(res => {
            if (res.data === "") {
            console.log("no datas return")
            } else {
            for (let i = 0; i < res.data.length; i++) {
                data.push({
                key: i,
                productname: res.data[i][0],
                repertory:  getCityName(res.data[i]['2'], res.data[i]['1']),
                stock: res.data[i][3],
                price:res.data[i][4]
                });
            }
            setTabledatas(data)
            }
        })
    }

    const getCityName = (proId, cityId) => {
        let displayValue = ""
            Object.values(City[proId]).forEach((record)=>{
                if (record['value'] === cityId) {
                    displayValue = record['label']
                }
            })
        return displayValue
    }

    return(
        <>
          <NavMubar selectId={2}/>
            <div className="clear-filter">
                <div className="content">
                    <Row>
                        <Col className="singIn_layout" xs={12} sm={12} md={12}>
                            <Card title="添加新产品" bordered={false} style={{ width: 'auto' }}>
                                <FatherContext.Provider value={getProductListDatas}>
                                    <AddnewPro />
                                </FatherContext.Provider>
                            </Card>
                        </Col>

                        <Col className="stockinfor_layout" xs={12} sm={12} md={12}>
                            <Card title="产品信息列表" bordered={false} style={{ width: 'auto' }}>
                                <ProjectList datas={tabledatas}/>
                            </Card>
                        </Col>
                    </Row>


                </div>
                {/* footer */}
            </div>
        </>
    )
}

export default StockLayout