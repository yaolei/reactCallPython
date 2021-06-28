import React , {useState,useEffect} from 'react'
import NavMubar from 'views/navbar/index'
import axios from 'axios';
import { Table} from 'antd';
import moment from 'moment'
import {
    Card,
    Row,
    Col,
  } from "reactstrap";

const OrderList = ()=>  {

    const columns = [
        {
          title: '姓名',
          dataIndex: 'clientname',
          key:'clientname',
          width: 120,
          fixed: 'left',
          ellipsis: true,
          render: text => <a>{text}</a>,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend'],
    
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key:'phone',
          width: 150,
          ellipsis: true,
        },
        {
            title: '购买产品名称',
            dataIndex: 'goodstype',
            key: 'goodstype',
            width: 120,
            ellipsis: true,
          },
          {
            title: '本次购买数量',
            dataIndex: 'sellsnum',
            key: 'sellsnum',
            sorter: (a, b) => a.sellsnum - b.sellsnum,
            width: 120,
            ellipsis: true,
          },
        {
          title: '详细地址',
          dataIndex: 'detailaddress',
          ellipsis: true,
        },
        {
            title: '下单时间',
            sorter: (a, b) => a.createdata - b.createdata,
            dataIndex: 'createdata',
            ellipsis: true,
          },
        {
            title: '省',
            dataIndex: 'province',
            key: 'province',
            width: 150,
            ellipsis: true,
          },
          {
            title: '市',
            dataIndex: 'city',
            key: 'city',
            width: 150,
            ellipsis: true,
          },
          {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            ellipsis: true,
          },
          {
            title: '是否为会员',
            dataIndex: 'is_members',
            key: 'is_members',
            width: 120,
            ellipsis: true,
          },
          {
            title: '备注',
            dataIndex: 'coments',
            key: 'coments',
            width: 150,
            ellipsis: true,
          },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            ellipsis: true,
            render: () => <a>action</a>,
          },
      ];


    const [tabledatas, setTableDatas] = useState('')
    const [scrollY, setScrollY] = useState("")

    useEffect(() => {
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
    })
    useEffect(() => {
            const urlOrderList = "/getOrderDatas";
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
                    clientname: res.data[i][1],
                    phone: res.data[i][2],
                    goodstype: res.data[i][3],
                    sellsnum: res.data[i][4],
                    detailaddress:res.data[i][5],
                    province:res.data[i][6],
                    city:res.data[i][7],
                    status: res.data[i][8] == "completed"?"完成":"未完成",
                    is_members:res.data[i][9] == "false" ?"否":"是",
                    coments:res.data[i][10],
                    createdata: moment(res.data[i][11]).format('YYYY-MM-DD')
                  });
                }
              }
              setTableDatas(data);
            })
    },[])


    return(
        <>
      <NavMubar selectId={2}/>
      <div className="clear-filter">
        <div className="content">
              <Row>
                <Col className="singIn_layout" xs={12} sm={12} md={12}>
                  <Card className="migrationCardLayout">
                    <Table 
                        columns={columns} 
                        dataSource={tabledatas} 
                        bordered
                        pagination={{ pageSize: 20 }} 
                        scroll={{y:'calc(100vh - 200px)'}}
                    />
                  </Card>
                </Col>
            </Row>
        </div>
          {/* footer */}
      </div>
        </>
    )
}


export default OrderList


