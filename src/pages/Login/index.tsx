import './index.scss';
import { Form, Input, Space, Button, Dialog } from 'antd-mobile'
import { getRequest,postRequest } from '../../request/index';
import { FormInstance } from 'antd-mobile/es/components/form';
import { Fragment } from 'react';

const Login = () => {

  const [form] = Form.useForm();


  //登录
  const login = () => {
    let value = form.getFieldValue();
    console.log(value)
    postRequest('http://localhost:3000/user',value).then((res: any) => {
      console.log('ddd')
    })
  }

  return (
    <Fragment>
     
    <div className='login'>
      <Form 
      layout='horizontal'
      name='form'
        footer={
          <Button block type='submit' color='primary' size='large'>
            登录
          </Button>
        }
        form={form}
        onFinish={() => login()}
      >
        <Form.Item label='用户名' name='username' rules={[{required: true, message: '请输入用户名'}]}>
          <Input placeholder='请输入用户名' clearable />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={[{required: true, message: '请输入密码'}]}>
          <Input placeholder='请输入密码' clearable type='password' />
        </Form.Item>
      </Form>
      <div className='boxs'>
      </div>
    </div>
    </Fragment>
  );
}

export default Login;
