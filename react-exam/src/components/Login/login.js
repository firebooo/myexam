import React,{Component,useState} from "react";
import { Form, Input, Button, Radio, Menu, Modal} from 'antd';
import {useHistory} from 'react-router-dom';
import cookie from "react-cookies";
import './login.less'

const Demo = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [mode,setMode] = useState("login");
    const [isPass,setIspass] = useState(false);
    const [isNoPass,setIsNoPass] = useState(false);
    const history = useHistory();

    const onFinish = (values) => {
      console.log('Success:', values);
      console.log(username,password);
      setUsername(values.username);
      setPassword(values.password);
      console.log(username,password);
      let data = new FormData();
      data.append("name",values.username);
      data.append("pwd",values.password);
      data.append("job",values["radio-group"])
      data.append("mode",mode);
      fetch('http://localhost:3001/login',{
          method:'POST',
          body:data
      }).then((res)=>{
          res.text().then((data)=>{
              console.log(data,typeof data);
              data = JSON.parse(data);
              if(data.status===200){
                cookie.save('name',data.name)
                cookie.save('job',data.job);
                setIspass(true);
                setTimeout(()=>{
                  history.replace({pathname:'/'});
                },3000)
              }else{
                setIsNoPass(true);
              }
          })
      })
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
        <div className="loginBox">
          <Modal title="提示" visible={isPass} onOk={(e)=>setIspass(false)} onCancel={(e)=>setIspass(false)}>提交通过，3s后回到主页</Modal>
          <Modal title="提示" visible={isNoPass} onOk={(e)=>setIsNoPass(false)} onCancel={(e)=>setIsNoPass(false)}>用户名或者密码错误</Modal>
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" style={{width:"50%",textAlign:"center"}} onClick={()=>setMode('login')}>登录</Menu.Item>
            <Menu.Item key="2" style={{width:"50%",textAlign:"center"}} onClick={()=>setMode('register')}>注册</Menu.Item>
          </Menu>
            <Form
                name="basic"
                labelCol={{
                span: 6
                }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          "radio-group":'classmate'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
          style={{margin:'50px'}}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>
  
  
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Form.Item name="radio-group" label="选择身份">
            <Radio.Group>
              <Radio value="classmate">我是学生</Radio>
              <Radio value="teacher">我是老师</Radio>
            </Radio.Group>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      </div>

    );
  };

export default class Login extends Component{
        render(){
            if(cookie.load('name')){
                this.props.history.replace({pathname:'/'})
            }

            return(
                <div className="loginContainer">
                  <h1>登录注册页面</h1>
                  <Demo />
                </div>
            )
        }
}