import React from 'react';
import { Form, Input, Cascader, Select, Button, message} from 'antd';
import axios from 'axios';
const { Option } = Select;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
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
  const onFinish = (values) => {
    const urlReprot = "/submitReport"
    const key = 'submitReport'
    console.log('Received values of form: ', values);
    let URL =  "http://localhost:8000" + urlReprot;

    message.loading({ 
      content: 'Loading...', key, 
      style: {
      marginTop: '20vh',
    }, });

    axios.post(URL, values)
    .then(res => {
        if (res.data) {
          let sucessMes = '用户: ' + values.clientName +' 的订单创建成功, 4秒后跳转到订单详情页面. ';
        
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
              window.open("/orderlist", "_self");
          }, 1000);
      } else {
          let errMes = '用户: ' + values.clientName +'的订单创建失败. 请联系管理员 ';
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
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
        sells_num: '1',
        goodsType: "xi01"

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
              <Cascader options={residences} />
          </Form.Item>
          <Form.Item
            name={['user_address', 'street']}
            noStyle
          >
            <Input style={{ width: '50%' }} placeholder="输入详细街道" />
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
        rules={[
          {
            required: true,
            message: '请选择产品!',
          },
        ]}
      >
        <Select placeholder="选择一个销售的产品">
          <Option value="xi01">硒蛋白</Option>
          <Option value="xi02">硒悦康</Option>
          <Option value="xi03">植萃片</Option>
          <Option value="xi04">参精片</Option>
        </Select>
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