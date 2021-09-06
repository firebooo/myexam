const fs = require('fs');
const formidable = require('formidable');

//注册用户
function addUser(name,password,job,data,res){
    let newUser = {name,password};
    newUser.myclass = [];
    newUser.mystudent = [];
    data.push(newUser);
    let newData = JSON.stringify(data);
    console.log(data)
    fs.writeFile('./public/user/'+job+'.json',newData,(err)=>{
        if(err){
            console.log(err);
        }
        fs.mkdir('./public/class/'+name,(err)=>{
            if(err){
                return false;
            }
        });
        res.send({status:200,message:'success',name,job})
    })
}

// 检查用户是否存在
function checkUser(name,password,job,mode,res){
    console.log(name,password,job,mode)
    let result,arr;
    fs.readFile('./public/user/'+job+'.json',(err,data)=>{
        if(err){
            console.log(err)
        }
        arr = JSON.parse(data.toString());
        //判断是登录还是注册
        if(mode === 'login'){
            result = arr.some((item)=>item.name==name&&item.password==password)
            if(result){
                res.send({status:200,message:'success',name,job})
            }else{
                res.send({status:400,message:'failed'})
            }

        }else{
            result = arr.some((item)=>item.name===name);
            if(result){
                res.send({status:400,message:'failed'});
            }else{
                addUser(name,password,job,arr,res);
            }
        }

    })
}

function login(req,res){
    let form = new formidable.IncomingForm();
    let obj = {}
    // console.log(req);
    // console.log(req.body);
    form.parse(req,(err,fields,files)=>{
        const {name,pwd,job,mode} = fields;
        // console.log(req.session);
        // console.log(fields,typeof fields);
        checkUser(name,pwd,job,mode,res)
    })
    // form.on('field',(name,value)=>{
    //     obj[name] = value;
    // })
    // form.on('end',()=>{
    //     console.log(obj,typeof obj);
    //     if(!req.session.name){
    //         req.session.name = obj.name;
    //     }
    //     console.log(req.session.name)
    // })
}

module.exports = login;