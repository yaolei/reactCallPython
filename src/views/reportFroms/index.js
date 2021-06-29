import React, {useState, useEffect} from 'react';
import { Form, Input, Cascader, Select, Button, message} from 'antd';
import axios from 'axios';
import City from '../../assets/json/city.json'
import Province from '../../assets/json/province.json'
import Region from '../../assets/json/region.json'
const { Option } = Select;


let selectStockCityVal = "",
    selectStockProVal = "",
    selectOptionGoodsVal = "",
    selectOptionGoodsName = "";

  
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
      selectStockCityVal = value["key"][0]
      selectStockProVal = value["key"][1]
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

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const [goodsDatas, setGoodsDatas] = useState([])
  const [siteDatas, setSitesDatas] = useState([])
  const [maxStockdatas, setMaxStockdatas] = useState(false)
  
  useEffect(() => {
    getGoodsList();
    getStockList();
  }, [])


  const getGoodsList = () => {
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
        setGoodsDatas(data)
      }
    })
  }

    const getStockList = () => {
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

    const setSiteOptions = () => {
      let array = [],
         cityArray = [],
         streatArray = [];
  
      const getCityArray = (pId) => {
          cityArray = []
          City[pId].forEach((cid) => {
              cityArray.push(
                getStreat(cid['value'], cid)
              )
          })
          return cityArray;
      }
      const getStreat = (cId, records) => {
          records['children'] = []
          if (Region[cId] != undefined) {
              Region[cId].forEach((rId) => {
                records['children'].push(
                  rId
                )
              },[])
          }
          return records
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

  const onFinish = (values) => {
    const urlReprot = "/submitReport",
          key = 'submitReport';
    values.stock_site_city = selectStockCityVal;
    values.stock_site = selectStockProVal;
    values.goodsType= selectOptionGoodsVal;
    message.loading({ 
      content: 'Loading...', key, 
      style: {
      marginTop: '20vh',
    }, });

    let URL =  "http://localhost:8000" + urlReprot;

    axios.post(URL, values)
    .then(res => {
        if (res.data.result) {
          let sucessMes = '用户: ' + values.clientName +' 的订单创建成功,剩余库存'+ res.data. stock_num +' 4秒后跳转到订单详情页面. ';
        
          setTimeout(() => {
              message.success({
                  content:sucessMes, 
                  key,
                  style: {
                      marginTop: '20vh',
                    },
                    duration:5});
              // clear the filed values
              form.resetFields();
              window.open("/orderlist", "_self");
          }, 1000);
      } else {
          let errMes = '用户: ' + values.clientName +'的订单创建失败. 请联系管理员.';
          if (res.data.stockNum) {
            errMes = '剩余库存数量: '+ res.data. stock_num +'. 当前库存不足, 或选择的仓库不存在,请查看库存管理.';
          }
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

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['', '', ''],
        prefix: '86',
        sells_num: '1',
        detail_address:'',
        coments: ''
      }}
      scrollToFirstError
    >
      <Form.Item
        name="clientName"
        label="客户名称"
        rules={[
          {
            required: true,
            message: '请输入客户名称!',
          },
        ]}
      >
        <Input  placeholder="客户名称" style={{ width: '80%' }}/>
      </Form.Item>
      <Form.Item
        name="phone"
        label="电话号码"
        rules={[
          {
            required: true,
            message: '请输入客户的联系电话!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
          placeholder="客户联系电话"
        />
      </Form.Item>

      <Form.Item label="客户地址">
        <Input.Group compact>
          <Form.Item
            name={['user_address', 'province']}
            noStyle
            rules={[{ required: true, message: '省份市区必须填一个' }]}
          >
              <Cascader options={setSiteOptions()} placeholder="选择发货地址"/>
          </Form.Item>
          <Form.Item
            name={['user_address', 'street']}
            noStyle
          >
            <Input style={{ width: '50%' }} placeholder="输入详细地址" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
        name="detail_address"
        label="详细地址"
      >
          <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="goodsType"
        label="产品类型"
      >
          <GoodsOptionslist datas={goodsDatas}/>
      </Form.Item>

      <Form.Item
        name="stock_stie"
        label="产品出仓位置"
      >
        <CityOptionslist datas={siteDatas}/>
      </Form.Item> 

      <Form.Item
        name="sells_num"
        label="购买数量"
        rules={[{ required: true, message: '数量必须大于0个!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="coments"
        label="备注"
      >
          <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationForm;