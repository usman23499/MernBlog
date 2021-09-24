const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid'); // for make unique name
const fs = require('fs'); // to copy image


module.exports.createPost=(req,res)=>{
    const form=formidable({multiples:true}); // ye line fix hai
    form.parse(req,async(error,fields,files)=>{
        const{title,body,description,slug}=fields;
        const errors=[];
        if(title===""){
            errors.push({msg:"Title is required"});
        }
        if(body===""){
            errors.push({msg:"Body is required"});
        }
        if(description===""){
            errors.push({msg:"Description is required"});
        }
        if(slug===""){
            errors.push({msg:"Slug is required"});
        }
        if(Object.keys(files).length===0){
            errors.push({msg:"Image is required"});
        }
        else{
                const {type} =files.image;
                const split = type.split('/');
                const extension = split[1].toLowerCase();
                console.log(extension);
                // change name to lower case
                if(extension !=='jpg' && extension !=='jpeg' && extension !=='png' ){
                 errors.push({msg:`${extension} is not valid`});

                }
                else{
                    files.image.name=uuidv4() + "."+extension; // change image name
                    const newPath = __dirname + `/../client/public/images/${files.image.name}`;
                    // path where you want to save image
                    fs.copyFile(files.image.path,newPath,(error)=>{
                        if(!error){
                            console.log('Image uploaded');
                        }
                    })
                }
            }
        if (errors.length !== 0) {
			return res.status(400).json({errors,files});
		}
    })
}