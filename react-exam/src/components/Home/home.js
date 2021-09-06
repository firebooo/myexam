import React,{Component} from "react";
import cookie from 'react-cookies';
import {useHistory} from 'react-router-dom'
import {Card,Row} from 'antd';
import {UserOutlined,FolderAddOutlined,SmileOutlined,FolderOutlined} from '@ant-design/icons';
import './home.less'
import About from '../About/about'
import Nav from '../Nav/nav'


const UserSelect = (props)=>{
    let userJob;
    const history = useHistory();
    function go(path){
        if(cookie.load('name')){
            history.push({pathname:path});
        }else{
            history.push('/login');
        }
    }
    userJob = (<div className="popup">
        <Row>
        <Card style={{width:"300px",height:"300px"}} className="card" onClick={go.bind(null,'class')}>
            <UserOutlined style={{fontSize:"120px",marginTop:"60px",marginLeft:"60px"}}/>
            <h2>我的课程</h2>    
        </Card>
        <Card style={{width:"300px",height:"300px"}} className="card" onClick={go.bind(null,'select')}>
            <FolderAddOutlined style={{fontSize:"120px",marginTop:"60px",marginLeft:"60px"}}/>
            <h2>课程选择</h2>
        </Card>
        </Row>
        
    </div>)
    if(cookie.load('job')==='teacher'){
        userJob = (
            <div className="popup">
                <Row>
                <Card style={{width:"300px",height:"300px"}} className="card" onClick={go.bind(null,'student')}>
                    <SmileOutlined  style={{fontSize:"120px",marginTop:"60px",marginLeft:"60px"}}/>
                    <h2>学生管理</h2>
                </Card>       
                <Card style={{width:"300px",height:"300px"}} className="card" onClick={go.bind(null,'class')}>
                    <FolderOutlined  style={{fontSize:"120px",marginTop:"60px",marginLeft:"60px"}}/>
                    <h2>课程管理</h2>
                </Card>
                <Card style={{width:"300px",height:"300px"}} className="card" onClick={go.bind(null,'addclass')}>
                    <FolderAddOutlined  style={{fontSize:"120px",marginTop:"60px",marginLeft:"60px"}}/>
                    <h2>添加课程</h2>
                </Card>
                </Row>
            </div>
        )
    }
    
    return(
        userJob
    )
}

export default class Home extends Component{
    
    render(){
        return(
            <div>
                <Nav></Nav>
                <UserSelect className="userJob"/>
                <About></About>
            </div>
        )
    }
}