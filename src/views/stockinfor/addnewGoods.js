import React, {useEffect, useState} from 'react';
import { Form, Row, Col,Button, message, Card, Input, Table} from 'antd';
import NavMubar from 'views/navbar/index'
import axios from 'axios';
import moment from 'moment'

import Province from '../../assets/json/province.json'
import City from '../../assets/json/city.json'
// import Region from '../../assets/json/region.json'

const tablecolumns = [
    {
      title: '编号',
      dataIndex: 'id',
      key:'id'
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'createdata',
      key: 'createdata'
    },
  ];

const SiteTables = (datas) => {
    return (
        <>
         <Table  columns={tablecolumns} dataSource={datas['newDatas']} />
        </>
    )
}

const AddnewGoods = () => {
    const [form] = Form.useForm();
    const [tabledata, setTabledata] = useState([])

    useEffect(() => {
        document.body.classList.add("sidebar-collapse");
        document.body.classList.add("sidebarColor");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            if (document.body.classList) {
                document.body.classList.remove("sidebar-collapse");
                document.body.classList.remove("sidebarColor");
            }
        };
    })

    useEffect(()=>{
        getTableList()
    },[])

    const getTableList = () => {
        const urlOrderList = "/getGoodsDatas";
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
                id: res.data[i][0],
                name: res.data[i][1],
                createdata: moment(res.data[i][2]).format('YYYY-MM-DD')
              });
            }
            setTabledata(data)
          }
        })
    }

 
    const onSubmit = (values) => {
        const urlPro = "/addnewGoods"
        let URL =  "http://localhost:8000" + urlPro;

        const key = 'submit'
        message.loading({ 
            content: 'Loading...', key, 
            style: {
            marginTop: '20vh',
          }, });
        axios.post(URL, values)
        .then(res => {
            if (res.data) {
                let sucessMes = '新产品添加成功';
                getTableList();
                setTimeout(() => {
                    message.success({
                        content:sucessMes, 
                        key,
                        style: {
                            marginTop: '20vh',
                          },
                          duration:3});
                    // clear the filed values
                    form.resetFields();
                }, 1000);
            } else {
                let errMes =  '新产品添加失败,产品已存在';
                setTimeout(() => {
                    message.error({
                        content:errMes, 
                        key,
                        style: {
                            marginTop: '20vh',
                          },
                          duration:4});
                }, 1000);
            }
        })
  };

 const setSiteOptions = () => {
    let array = [],
       cityArray = [];

    const getCityArray = (pId) => {
        cityArray = []
        City[pId].forEach((cid, index) => {
            cityArray.push(
                cid
            )
        })
        return cityArray;
    }

    Province.forEach(data => {
        array.push(
            {
                value:data['id'],
                label:data['name'],
                children: getCityArray(data['id'])
            }
        )
    });
    return array
 }

    const getFields = () => {
        const children = [];
        const filedNameList =[
            {
                'name': 'name',
                'label': '产品名称',
                'isrequired': true,
                'requiredMes':'必须添加一个产品',
                'placeholder': '产品名称',
            },
        ];
        const arryList = setSiteOptions();
        for (let i = 0; i < filedNameList.length; i++) {
          children.push(
            <Col span={8} key={i}>
              <Form.Item
                name={filedNameList[i]['name']}
                label={filedNameList[i]['label']}
                rules={[
                  {
                    required: filedNameList[i]['isrequired'],
                    message: filedNameList[i]['requiredMes'],
                  },
                ]}
              >
                <Input placeholder={filedNameList[i]['placeholder']}/>
              </Form.Item>
            </Col>,
          );
        }
        return children;
      };
    return(
        <>
        <NavMubar selectId={2}/>
            <div className="clear-filter">
                <div className="content">
                    <Row>
                        <Col className="singIn_layout" xs={12} sm={12} md={12}>
                            <Card title="添加新产品" bordered={false} style={{ width: 'auto' }}>
                            <Form
                                form={form}
                                name="sumit_new_pro"
                                className="ant-advanced-search-form"
                                onFinish={onSubmit}
                            >  
                            <Row gutter={24}>{getFields()}</Row>
                            <Row>
                                <Col
                                span={24}
                                style={{
                                    textAlign: 'right',
                                }}
                                >
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                                <Button
                                    style={{
                                    margin: '0 8px',
                                    }}
                                    onClick={() => {
                                    form.resetFields();
                                    }}
                                >
                                    重置
                                </Button>
                                </Col>
                            </Row>
                            </Form>
                            </Card>
                        </Col>
                    </Row>
                </div>
                {/* footer */}
                <div>
                    <SiteTables newDatas={tabledata}/>
                </div>
            </div>
        </>
    )
}
export default AddnewGoods;