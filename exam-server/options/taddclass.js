const formidable = require('formidable');
const fs = require('fs');

//给老师的class里添加一项课程
function addItem(name,title,res){
    let path = './public/user/teacher.json';
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        let arr = JSON.parse(data);
        for(let i = 0;i<arr.length;i++){
            if(arr[i].name===name&&arr[i].myclass.indexOf(title)==-1){
                arr[i].myclass.push(title);
            }
        }
        fs.writeFile(path,JSON.stringify(arr),(err)=>{
            if(err){
                console.log(err);
            }
            res.send({status:200,message:'success'})
        })
    })
}

//创建一个json文件并放入老师的文件夹中
function addTerm(data,name,res){
    let path = './public/class/'+name+'/'+data.title+'.json'
        fs.writeFile(path,JSON.stringify(data),(err)=>{
            if(err){
                console.log(err);
            }
            addItem(name,data.title,res);
        })
}

function taddclass(req,res){
    const form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        let data = {};
        data.title = fields.title;
        data.count = fields.count;
        data.test = JSON.parse(fields.test);
        // console.log(fields);
        // console.log(data,JSON.stringify(data));
        addTerm(data,fields.name,res);
    })
}
module.exports = taddclass;