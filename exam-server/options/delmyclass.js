const formidable = require('formidable');
const fs = require('fs');

function delfuc(name,title,res){
    const path = './public/class/'+name+'/'+title+'.json';
    const teacher = './public/user/teacher.json';
    fs.unlinkSync(path)
    fs.readFile(teacher,(err,data)=>{
        let arr = JSON.parse(data);
        for(let i=0,len = arr.length;i<len;i++){
            if(arr[i].name===name){
                for(let j = 0,len = arr[i].myclass.length;j<len;j++){
                    if(arr[i].myclass[j]===title){
                        arr[i].myclass.splice(j,1);
                    }
                }
            }
        }
        fs.writeFile(teacher,JSON.stringify(arr),(err)=>{
            if(err){
                console.log(err);
            }
            res.send({status:200,message:"success"})
        })
    })
}

function delmyclass(req,res){
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        const {name,title} = fields;
        delfuc(name,title,res)
    })
}

module.exports = delmyclass;