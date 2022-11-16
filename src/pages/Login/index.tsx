import './index.scss';
import { Form, Input, Button } from 'antd-mobile'
import { getRequest,postRequest } from '../../request/index';
import { Fragment, useState } from 'react';
import Bg from '../../components/ui/Bg';

const Login = () => {

  const [form] = Form.useForm();
  const [isLogin,setIsLogin] = useState(true);


  //登录
  const login = () => {
    let value = form.getFieldValue();
    postRequest('http://localhost:3000/auth/login',value).then((res: any) => {
      let token = res.data.token;
      localStorage.setItem('token',token);
    })
  }

  //跳转登录
  const toLogin = () => {
    setIsLogin(true);
  }
  //跳转注册
  const toRegister = () =>{
    setIsLogin(false);
  }

  return (
    <Fragment>
     <Bg/>
     {
      isLogin === true ? <div className='login'>
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
      <div className='boxs' onClick={() => toRegister()}>
        没有账号，先注册
      </div>
    </div> : <div className='register'>
      <Form 
      layout='horizontal'
      name='form'
        footer={
          <Button block type='submit' color='primary' size='large'>
            注册
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
      <div className='boxs' onClick={() => toLogin()}>
        已有账号，直接登录
      </div>
    </div>
     }
    
    </Fragment>
  );
}

export default Login;
