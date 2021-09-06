import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import cookie from "react-cookies";
import Nav from '../Nav/nav'
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default class AddClass extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '题目',
        dataIndex: 'title',
        width: '30%',
        editable: true,
      },
      {
        title: '选项',
        dataIndex: 'selection',
        width:'25%',
        editable:true
      },
      {
        title: '答案',
        dataIndex: 'answer',
        width:'10%',
        editable:true
      },
      {
        title: '解析',
        dataIndex: 'resolve',
        editable:true
      },
      {
        title: '删除',
        dataIndex: 'operation',
        width:'8%',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="/" onClick={ev=>ev.preventDefault()}>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          title: '在标准的JavaScript中，Ajax异步执行调用基于下面哪一个机制才能实现？',
          selection: 'A:Event和callback,B:多线程操作,C:多CPU核,D:Deferral和promise',
          answer: 'A',
          resolve:'JavaScript是单线程的，浏览器实现了异步的操作，整个js程序是事件驱动的，每个时间都会绑定响应的回调函数'
        },
        {
          key: '1',
          title: '下面关于CSS布局的描述，不正确的是？',
          selection: 'A:块级元素实际占用的宽度与它的width属性有关,B:块级元素实际占用的宽度与它的border属性有关,C:块级元素实际占用的宽度与它的padding属性有关,D:块级元素实际占用的宽度与它的background属性有关',
          answer: 'D',
          resolve:'请翻看课本'
        },
      ],
      count: 2,
    };
  }
  componentDidMount(){
      if(!(cookie.load('name')&&cookie.load('job'))){
          this.props.history.replace('/')
      }
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      title: `点击修改题目名称`,
      selection: 'A:略,B:略,C:略,D:略',
      answer: `A`,
      resolve:'略'
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };
  handleSubmit=()=>{
      const data = new FormData();
      const {title,dataSource,count} = this.state;
      console.log(title,dataSource,count);
      data.append('title',title);
      data.append('count',count)
      data.append('name',cookie.load('name'))
      data.append('job',cookie.load('job'));
    //   for(let item of dataSource){
    //       data.append('term' + (item.key+1),item);
    //   }
      data.append('test',JSON.stringify(dataSource));
      if(!this.state.title){
          alert('课程标题不能为空')
          return;
      }
      fetch('http://localhost:3001/taddclass',{
          method:'POST',
          body:data
      }).then((res)=>{
          res.text().then((data)=>{
              let newData = JSON.parse(data);
              console.log(newData.status)
              if(newData.status!==200){
                  alert('已有此试题！！！')
              }else{
                  alert('上传成功！！！')
              }
          })
      }).catch((e)=>{
          console.log(e);
      })
  }
  handleInput(ev){
      this.setState({title:ev.target.value})
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
          <Nav />
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            margin:30
          }}
        >
          添加课程
        </Button>
        <Button
          type="primary"
          onClick={this.handleSubmit}
        >
          上传课程
        </Button>
        <Input placeholder="请输入课程标题。。" style={{width:"300px",margin:30}} onChange={ev=>this.handleInput(ev)}/>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          size="middle" className="mytable"
        />
      </div>
    );
  }
}
