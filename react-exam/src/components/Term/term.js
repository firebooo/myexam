import {useState} from 'react'
import {useHistory} from 'react-router-dom';
import {Form,Radio,Button} from 'antd';
import cookie from 'react-cookies'
import Nav from '../Nav/nav';

function TermItem(props){
    let id = Number(props.id) + 1;
    let title = props.title;
    let selection = props.selection.split(',');
    let resolve = props.resolve;
    let answer = props.answer;
    let myAnswer = props.myAnswer;
    let isSubmit = props.isSubmit;
    let resolveItem;
    if(isSubmit){
        resolveItem = (<div>
        <p style={{textIndent:'24px',fontSize:16}}>正确答案:{answer} 你的答案：{myAnswer}</p>
        <p style={{textIndent:'24px',fontSize:16}}>解析：{resolve}</p>
    </div>)
    }
    // console.log(props.id,id,title,selection,resolve,answer)
    return(
        <div>
            <p style={{textIndent:'24px',fontSize:24}}>{id}.{title}()</p>
            <Form.Item name={'group-'+(props.group)}>
                <Radio.Group style={{textIndent:'24px',fontSize:24}}>
                    <Radio value="A">{selection[0]}</Radio>
                    <Radio value="B">{selection[1]}</Radio>
                    <Radio value="C">{selection[2]}</Radio>
                    <Radio value="D">{selection[3]}</Radio>
                </Radio.Group>
            </Form.Item>
            {resolveItem}
        </div>
                         
    )
}

const TermForm = (props)=>{
    const data = props.data;
    let newData,title = [];
    let answer = [];
    const [myAnswer,setMyAnswer] = useState([]);
    const [isSubmit,setIsSubmit] = useState(false);
    let button;
    if(!isSubmit){
        button = (<Form.Item wrapperCol={{ span: 24, offset: 10 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>)
    }
    try{
        newData = JSON.parse(data);
        title = newData.test;
        title.forEach((item)=>{
            answer.push(item.answer);
        })
    }catch(e){
        console.log(e)
    }
    // console.log(newData);
    // console.log(answer)
    // console.log(title,typeof title)
    const listItems = title.map((item,index) =>
        <div key={item.key}>
            <TermItem  id={index} title={item.title} selection={item.selection} resolve={item.resolve} group={index+1} answer={item.answer} myAnswer={myAnswer[index]} isSubmit={isSubmit}/>
        </div>
    );
    console.log(listItems)

    const finish = (values)=>{
        console.log(values)
        let keys = Object.keys(values);
        let arr = [],passNum = 0;
        for(let i = 0,len = keys.length;i<len;i++){
            arr[i] = values[keys[i]];
            if(arr[i] === answer[i]){
                passNum++;
            }
        }
        setIsSubmit(true);
        setMyAnswer(arr);
        alert(`你答对了${passNum}题，共得${passNum*5}分`);
    }
    return(
        <Form style={{width:'70%',backgroundColor:'#fff',margin:'30px auto'}} onFinish={finish}>
            {listItems}
            {button}
        </Form>
    )
}

const Term = ({match})=>{
    const history = useHistory();
    const name = match.params.name;
    const title = match.params.title
    const [termData,setTermData] = useState('');
    const [isGet,setIsGet] = useState(false);
    //老师不能访问做题页面
    if(cookie.load('job') === 'teacher'){
        history.replace({pathname:'/'});
    }
        const form = new FormData();
        form.append('name',name);
        form.append('title',title);
        fetch('http://localhost:3001/getTerm',{
            method:'POST',
            body:form
        }).then((res)=>{
            res.text().then((data)=>{
                if(!isGet){
                    setTermData(data);
                    setIsGet(true)
                }
            })
        })
        
        
    return(
        <div>
            <Nav />
            <h2 style={{fontSize:30,textAlign:'center'}}>{title}</h2>
            <h2 style={{fontSize:15,textAlign:'center'}}>出题人：{name}(每小题5分)</h2>
            <TermForm data={termData}/>
        </div>
    )
}

export default Term;