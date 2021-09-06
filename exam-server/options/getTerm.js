const formidable = require('formidable');
const fs = require('fs');

function getTerm(req,res){
    const form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        let user = fields.name;
        let title = fields.title;
        fs.readFile(`./public/class/${user}/${title}.json`,(err,data)=>{
            if(err){
                console.log(err)
            }
            res.send(data);
        })
    })
}

module.exports = getTerm;