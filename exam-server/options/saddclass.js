const formidable = require('formidable');
const fs = require('fs');

function addClass(req,res){
    const form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        const path = './public/user/classmate.json';
        let name = fields.name;
        let author = fields.author;
        let term = fields.term;
        let obj = {};
        obj.teacher = author;
        obj.term = term;
        fs.readFile(path,(err,data)=>{
            if(err){
                console.log(err)
            }
            let arr = JSON.parse(data);
            for(let i = 0,len=arr.length;i<len;i++){
                if(arr[i].name === name){
                    arr[i].myclass.push(obj);
                }
            }
            fs.writeFile(path,JSON.stringify(arr),(err)=>{
                if(err){
                    console.log(err)
                }
                res.send({status:200,message:'success'})
             })
        })
    })
}
module.exports = addClass;