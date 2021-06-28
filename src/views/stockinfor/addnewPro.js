import React, {useState, useEffect, useContext} from 'react';
import { Form, Row, Col, Input, Button, Select, message} from 'antd';
import axios from 'axios';
import City from '../../assets/json/city.json'
import {FatherContext} from './index'
const { Option } = Select;

let selectOptionCityVal = "",
    selectOptionProVal = "",
    selectOptionGoodsVal = "",
    selectOptionGoodsName = "",
    func

const CityOptionslist = (cityDatas) => {
    let optionlist = [];
    if (cityDatas['datas'].length < 1) {
        return (
            <Select placeholder="选择一个仓库位置">
                <Option value=""></Option>
            </Select>
        )
    }

    const handledChangOptionsVal = (value)=> {
        selectOptionCityVal = value["key"][0]
        selectOptionProVal = value["key"][1]
    }

    cityDatas['datas'].forEach((record) => {
        let stieVal =[];
        stieVal.push(record.cityId)
        stieVal.push(record.proId)
            
        
        optionlist.push(
            <Option key={record.cityId} value={stieVal} title={record.proId}>{record.cityName}</Option>
        )
    })
    return (
        <Select placeholder="选择一个仓库位置" onChange={handledChangOptionsVal} labelInValue>
            {optionlist}
        </Select>
    )
}


const GoodsOptionslist = (goodsDatas) => {
    let optionlist = [];
    if (goodsDatas['datas'].length < 1) {
        return (
            <Select placeholder="选择一个产品">
                <Option value=""></Option>
            </Select>
        )
    }

    const handledChangGoodsOptionsVal = (value)=> {
        selectOptionGoodsVal = value["key"]
        selectOptionGoodsName = value["label"]
    }

    goodsDatas['datas'].forEach((record) => {
        optionlist.push(
            <Option key={record.goodsId} value={record.goodsId} >{record.goodsName}</Option>
        )
    })
    return (
        <Select placeholder="选择一个产品" onChange={handledChangGoodsOptionsVal} labelInValue>
            {optionlist}
        </Select>
    )
}

const AddnewPro = () => {
    func = useContext(FatherContext);
    const [form] = Form.useForm();
    const [siteDatas, setSitesDatas] = useState([])
    const [goodsDatas, setGooodsDatas] = useState([])

    //get stock city site
    useEffect(()=>{
        const urlOrderList = "/getSiteDatas";
        let data = [];
        let URL =  "http://localhost:8000" + urlOrderList;
        axios.get(URL)
        .then(res => {
          if (res.data === "") {
            console.log("no datas return")
          } else {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i][3] =='false') {
                    data.push({
                        key: i,
                        id: res.data[i][0],
                        cityId: res.data[i][2],
                        proId: res.data[i][1],
                        cityName: getCityName (res.data[i]['1'], res.data[i]['2']) 
                      });
                }
            }
            setSitesDatas(data)
          }
        })
    },[])

    useEffect(()=>{
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
                    goodsId: res.data[i][0],
                    goodsName: res.data[i][1]
                });
            }
            setGooodsDatas(data)
          }
        })
    },[])



    const getCityName = (proId, cityId) => {
        let displayValue = ""
            Object.values(City[proId]).forEach((record)=>{
                if (record['value'] === cityId) {
                    displayValue = record['label']
                }
            })
        return displayValue
    }


    const onSubmit = (values) => {
        //set the stock value
        values.repertory = selectOptionCityVal;
        values.province = selectOptionProVal;
        values.productname= selectOptionGoodsVal;

        const urlPro = "/submitProjects"
        console.log('Received project values of form: ', values);
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
                let sucessMes = '产品名称为: '+ selectOptionGoodsName + ' 的产品添加成功!!';
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
                    func();
                }, 1000);
            } else {
                let errMes = '保存失败请联系管理员';
               
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
    const getFields = () => {
        const children = [];
        const filedNameList =[
            {
                'name': 'productname',
                'label': '产品名称',
                'isrequired': false,
                'requiredMes':'',
                'placeholder': '输入产品',
                'isOptions': true,
                'isCityOptions':false
            },
            {
                'name': 'repertory',
                'label': '库存地址',
                'isrequired': false,
                'requiredMes':'',
                'placeholder': '产品所在位置',
                'isOptions': true,
                'isCityOptions': true
            },
            {
                'name': 'stock',
                'label': '在库数量',
                'isrequired': false,
                'requiredMes':'',
                'placeholder': '默认为0',
                'isOptions': false
            },
            {
                'name': 'price',
                'label': '产品单价',
                'isrequired': false,
                'requiredMes':'',
                'placeholder': '可以不输入',
                'isOptions': false
            },
        ];
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
                {
                    filedNameList[i]['isOptions']?
                        filedNameList[i]['isCityOptions']?<CityOptionslist datas={siteDatas}/>:
                            <GoodsOptionslist datas={goodsDatas}/>
                    :
                    <Input placeholder={filedNameList[i]['placeholder']}/>
                }
                
              </Form.Item>
            </Col>,
          );
        }
    
        return children;
      };
    return(
        <>
            <Form
                form={form}
                name="sumit_new_pro"
                className="ant-advanced-search-form"
                onFinish={onSubmit}
                initialValues={{
                    repertory: "",
                    price:'0',
                    stock: '0'
                }}
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
        </>
    )
}
export default AddnewPro;