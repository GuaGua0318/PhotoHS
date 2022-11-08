import './index.scss';
import { Form, Input, Space, Button } from 'antd-mobile'
const Login = () => {
  return (
    <div className='login'>
      <Form layout='horizontal'>
        <Form.Item label='用户名' name='username'>
          <Input placeholder='请输入用户名' clearable />
        </Form.Item>
        <Form.Item label='密码' name='password'>
          <Input placeholder='请输入密码' clearable type='password' />
        </Form.Item>
      </Form>
      <div className='boxs'>
      <Button color='primary' style={{'marginLeft': '40px'}}>
        登录
      </Button>
      <Button style={{'marginLeft': '100px'}}>注册</Button>
      </div>
    </div>
  );
}

export default Login;