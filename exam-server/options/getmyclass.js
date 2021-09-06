const url = require('url');
const qs = require('querystring');
const fs = require('fs');

function getmyclass(req,res){
    let myurl = url.parse(req.url);
    let {name,job} = qs.parse(myurl.query);
    const tpath = './public/user/teacher.json';
    const cpath = './public/user/classmate.json';
    console.log(name,job);
    if(job === 'teacher'){
        fs.readFile(tpath,(err,data)=>{
            if(err){
                console.log(err);
            }
            let arr = JSON.parse(data);
            console.log(arr);
            let filter = '';
            filter = arr.filter((item)=>{return item.name === name})
            if(filter){
                res.send({status:200,data:filter[0].myclass});
            }else{
                res.send({status:400,data:'notfound'});
            }
        })
    }else{
        // const files = fs.readdirSync('./public/class');
        // for(let i=0,len=files.length;i<len;i++){
        //     const fileName = fs.readdirSync('./public/class/'+files[i])
        //     console.log(fileName)
        //     obj[files[i]] = fileName;
        // }
        let obj = {}
        fs.readFile('./public/user/teacher.json',(err,data)=>{
            let arr = JSON.parse(data);
            for(let i = 0,len=arr.length;i<len;i++){
                obj[arr[i].name] = arr[i].myclass;
            }
            console.log(obj);
            res.send({status:200,data:obj})
        })
    }
}

module.exports = getmyclass;