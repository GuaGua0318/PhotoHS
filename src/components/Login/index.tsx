import './index.scss';
import { Form, Input, Space, Button, Dialog } from 'antd-mobile'
import { getRequest,postRequest } from '../../request/index';

const Login = () => {

  const login = () => {
    postRequest('http://localhost:3000/user',{username: 'lalalalalalal',password: '123'}).then((res: any) => {
      console.log('ddd');
    })
  }

  return (
    <div className='login'>
      <Form 
      layout='horizontal'
      name='form'
        footer={
          <Button block type='submit' color='primary' size='large' onClick={() => login()}>
            登录
          </Button>
        }
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
  );
}

export default Login;
