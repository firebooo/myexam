import React,{Component} from 'react';
import {Table} from 'antd';
import cookie from 'react-cookies';
import Nav from '../Nav/nav';

//传入数据的格式
// const data = [
//     {key:'1',name:'JS测试（一）',delete:'delete'},
//     {key:'2',name:'JS测试(二)',delete:'delete'}
// ]

const ClassList = (props)=>{

    return(
        <Table className="mytable" size="middle" dataSource={props.dataSource} columns={props.columns}/>
    )
}

export default class TClass extends Component{
    constructor(props){
        super(props);
        this.state = {data:[],isGet:false,column:[]}
        this.tcolumns = [
            {title:'课程名',dataIndex:'name'},
            {title:'删除',dataIndex:'delete',render:(text,index)=><a href="/" onClick={(e)=>{this.handleClass(e,index)}}>{text}</a>}
        ]
        this.scolumns = [
            {
                title: '课程名',
                dataIndex: 'name',
              },
              {
                title: '教师',
                dataIndex: 'age',
              },
              {
                title: '分数',
                dataIndex: 'address',
              },
              {
                  title:'添加',
                  dataIndex:'add',
                  render:(text,index)=><a href={'/'} onClick={e=>{this.handleClass(e,index)}}>{text}</a>
              }
        ]
    }
    handleClass(e,index){
        e.preventDefault();
        //教师删除课程
        let message = new FormData();
        message.append('name',cookie.load('name'))
        message.append('job',cookie.load('job'));
        message.append('title',index.name);
        if(cookie.load('job')==="teacher"){
            fetch('http://localhost:3001/delmyclass',{
                method:'POST',
                body:message
            }).then((res)=>{
                res.text().then(data=>{
                    let message = JSON.parse(data);
                    if(message.status===200){
                        let arr = [...this.state.data];
                        for(let i = 0,len=arr.length;i<len;i++){
                            if(arr[i].key === index.key){
                                arr.splice(i,1);
                            }
                        }
                        //修改数据，更新视图
                        this.setState({data:arr})
                    }
                })
            }).catch((e)=>{
                console.log(e);
            })
        }
        console.log(index);
    }
    componentDidMount(){
        if(!cookie.load('name')){
            this.props.history.replace('/');
            return;
        }
        fetch('http://localhost:3001/getmyclass?name='+cookie.load('name')+'&job='+cookie.load('job'),{
            method:'GET'
        }).then((res)=>{
            res.text().then((data)=>{
                let newdata = JSON.parse(data);
                console.log(newdata,newdata.data)
                if(newdata.status === 200){
                    let arr = newdata.data;
                    console.log(arr);
                    if(!this.state.isGet){
                        if(cookie.load('job')==='teacher'){
                            for(let i=0;i<arr.length;i++){
                                arr[i] = {key:String(i+1),name:arr[i],delete:'delete'}
                            }
                            this.setState({column:this.tcolumns,data:arr,isGet:true})
                        }else{
                            this.setState({column:this.scolumns,data:arr,isGet:true})
                        }
                    }
                }
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    render(){
        return(
            <div>
                <Nav />
                <h2 style={{fontSize:"40px",margin:"20px"}}>课程列表</h2>
                <ClassList dataSource={this.state.data} columns={this.state.column}/>
            </div>
        )
    }
}