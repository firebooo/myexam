import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Table} from 'antd';
import Nav from '../Nav/nav'
 
function addItem(e,index,author){
    e.preventDefault();
    let formData = new FormData();
    formData.append('name',cookie.load('name'))
    formData.append('author',author);
    formData.append('term',index.question);
    console.log(index);
    fetch('http://localhost:3001/saddclass',{
        method:'POST',
        body:formData
    }).then((res)=>{
        res.text().then((data)=>{
            console.log(data)
        })
    })
}

const ExpandedTable = (props)=>{
    const author = props.author;
    const term = props.term
    const columns = [{title:'老师',dataIndex:'teacher'}]
    const data = [{teacher:props.author}]
    const data2 = [];
    for(let i=0;i<props.term.length;i++){
        data2.push({question:props.term[i],score:'未参加',add:'添加'})
    }
    console.log(data2)
    const columns2 = [{title:'题目',dataIndex:'question'},{title:'分数',dataIndex:'score'},{title:'添加',dataIndex:'add',render:(text,index)=>(
        <a href="/" onClick={e=>{addItem(e,index,author,term)}} key={index.key}>{text}</a>
    )}]
    const expandedRowRender = ()=>{

        return(
            <Table className="mytable" columns={columns2} dataSource={data2} pagination={false}/>
        )
    }
    return (
        <Table className="mytable components-table-demo-nested" columns={columns} dataSource={data} expandable={{ expandedRowRender }} />
    )
}

const TableList = (props)=>{
        let arr = [];
        let data = props.data;
        let newData = data.data;
        console.log(newData,newData['root'])
        for(let item in newData){
            arr.push(item);
        }
        console.log(arr)
        const tableList = arr.map((item,index)=>{
            return(
                <div key={index}>
                    <ExpandedTable author={item} term={newData[item]}/>
                </div>
            )
        });
        console.log(tableList)
        return (
        <div>
            {tableList}
        </div>
    )
}

export default class Select extends Component{
    constructor(props){
        super(props);
        this.state = {data:''}
    }
    componentDidMount(){
        fetch('http://localhost:3001/getmyclass?name='+cookie.load('name')+'&job='+cookie.load('job'),{
            method:'GET'
        }).then((res)=>{
            res.text().then((data)=>{
                console.log(data);
                this.setState({data:JSON.parse(data)})
            })
        })
    }
    render(){
        let tableList;
        if(this.state.data){
            tableList = <TableList data={this.state.data} />
        }
        return(
            <div>
                <Nav />
                <h2 style={{fontSize:"40px",margin:"20px"}}>选择课程</h2>
                {tableList}
            </div>
        )
    }
}