import './index.scss';
import { Form, Input, Button, Toast } from 'antd-mobile'
import { Fragment, useState } from 'react';
import Bg from '../../components/ui/Bg';
import { PostLoginApi, PostRegisterApi } from '../../axios/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [form] = Form.useForm();
  const [isLogin,setIsLogin] = useState(true);
  const navigate = useNavigate();
  const avator = "https://img2.baidu.com/it/u=3094149767,177600321&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"

  
  //登录
  const login = () => {
    let user = form.getFieldsValue();
    PostLoginApi(user).then((res:any) => {
      let token = res.data.data.token;
      localStorage.setItem('token',token);
      navigate('/shared');
    }).catch(() => {
      Toast.show({
        icon: 'fail',
        content: '账号或密码错误',
      })
    })
  }

  //注册
  const register = () => {
    let user = form.getFieldsValue();
    PostRegisterApi({...user,avator:avator,nickname:"guagua"}).then((res:unknown) => {
      toLogin();
      Toast.show({
        icon: 'success',
        content: '注册成功，请登录'
      })
    }).catch(() => {
      Toast.show({
        icon: 'fail',
        content: '用户名已经注册',
      })
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
        onValuesChange={(value) => console.log(value)}
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
        onFinish={() => register()}
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
