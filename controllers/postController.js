const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid'); // for make unique name
const fs = require('fs'); // to copy image
const Post = require('../models/Post');


module.exports.createPost=(req,res)=>{
    const form=formidable({multiples:true}); // ye line fix hai
    form.parse(req,async(error,fields,files)=>{
        const{title,body,description,slug,id,name}=fields;
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
                    
                }
                const checkSlug=await Post.findOne({slug});
                if (checkSlug){
                    errors.push({msg : "Please choose a unique slug/Url"});
                }
                
            }
        if (errors.length !== 0) {
			return res.status(400).json({errors,files});
		}
        else{
            const newPath = __dirname + `/../client/public/images/${files.image.name}`;
                    // path where you want to save image
                    fs.copyFile(files.image.path,newPath, async (error)=>{
                        if(!error){
                            // console.log('Image uploaded');
                            try {
                                const response = await Post.create({
                                    title,
                                    body,
                                    image: files.image.name,
                                    description,
                                    slug,
                                    userName: name,
                                    userId: id,
                                });
                                return res.status(200).json({msg:'Your post has been created sucessfully',
                                response,
                            })
                            } catch (error) {
                                return res.status(500).json({ errors: error, msg: error.message });
                            }
                        }
                    })
            
        }
    })
};

module.exports.fetchPosts = async (req, res) => {
	const id = req.params.id;
    const page= req.params.page;
    const perPage=3; // 3 items per page
    const skip=(page-1)*perPage; // formula to skip and get new post
    // console.log(id);
	try {
		const count = await Post.find({ userId: id }).countDocuments();

		const response = await Post.find({ userId: id })
        .skip(skip)
        .limit(perPage)
        .sort({updateAt:-1}); //mean deseing sort
        
        ;
		return res.status(200).json({ response:response,count,perPage });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.fetchPost=async(req,res)=>{
    const id=req.params.id;
    try {
        const post= await Post.findOne({_id:id});
        return res.status(200).json({post}); // in this post all data send to client
    } catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
        
    }
}