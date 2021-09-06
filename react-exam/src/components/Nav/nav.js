import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Menu,Dropdown} from 'antd';
import { DownOutlined} from '@ant-design/icons';
import './nav.less'

function out(e){
    cookie.remove('name');
    cookie.remove('job');
}

const menu = (
    <Menu>
        <Menu.Item key="1">
            <a href="/home" onClick={e=>out(e)}>退出</a>
        </Menu.Item>
    </Menu>
)


const User = (props)=>{
    let isLogin;
    if(cookie.load('name')){
        isLogin = (<Dropdown overlay={menu} className="userInfo">
        <a className="ant-dropdown-link" href="http://www.baidu.com" onClick={e=>e.preventDefault()}>
            {props.user} <DownOutlined />
        </a>
    </Dropdown>)
    }else{
        isLogin = (
            <a href="/login" className="userInfo">{props.user}</a>
        )
    }
    return(
            isLogin
    )
}



export default class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {user:'登录'}
        
    }
    componentDidMount(){
        //检查登录状态
        if(cookie.load('name')){
            this.setState({user:cookie.load('name')})
        }
    }
    render(){
        return(
            <div className="nav">
                    <h2 className="logo"><a href="/">考试系统</a></h2>
                    <User user={this.state.user} className="userInfo"/>
            </div>
        )
    }
}