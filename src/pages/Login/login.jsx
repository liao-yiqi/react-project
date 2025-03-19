import './login.scss'
import logo from '@/assets/logo.png'
import {Button, Card, Form, Input, message} from "antd";
import {useDispatch} from "react-redux";
import {fetchLogin} from "@/store/modules/user.js";
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onSubmit = async (values) => {
        // 13800000002 246810
        await dispatch(fetchLogin(values))
        navigate('/')
        message.success('登录成功')
    }
    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=""/>
                <Form validateTrigger='onBlur' autoComplete="off" onFinish={onSubmit}>
                    <Form.Item
                        name='mobile'
                        rules={[
                            {required: true, message: '请输入手机号'},
                            {pattern: /^1[3-9]\d{9}/, message: '请输入正确的手机号格式'}
                        ]}
                    >
                        <Input allowClear size='large' placeholder='请输入手机号'/>
                    </Form.Item>
                    <Form.Item
                        name='code'
                        rules={[{required: true, message: '请输入验证码'}]}
                    >
                        <Input allowClear size='large' placeholder='请输入验证码'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' size='large' block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Login