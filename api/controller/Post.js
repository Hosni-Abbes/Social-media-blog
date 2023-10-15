const slugify = require('slugify');

const Category = require('../model/Category');
const Post = require('../model/Post');
const Image = require('../model/Image');
const User = require('../model/User');


// Relationships
Category.hasMany(Post, {as: 'category'});
Post.belongsTo(Category);

Post.belongsToMany(Image, {through: 'PostImages'});
Image.belongsToMany(Post, {through: 'PostImages'});

User.hasMany(Post, {as: 'postId'})
Post.belongsTo(User)


// get all posts
exports.findAll = async (req, res) => {
    try {
        const posts = await Post.findAll();
        if(posts.length == 0) return res.status(404).send({message: 'No post exist.'});
        
        res.status(200).send(posts);

    } catch(err) {
        res.status(500).send({message: err});
    }
}

// get one post
exports.findOnePostBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await Post.findOne({where: {slug}});

        if(!post) return res.status(404).send({message: 'Post not exist'});

        res.status(200).send(post);

    } catch(err) {
        res.status(500).send({message: err});
    }
}




// create post
exports.create = async (req, res) => {

    try{
        const { title, content, category, images } = req.body;

        const userId = req.payload.id;
        
        if(!title || !content || !category){
            return res.status(400).send('Please enter a title content and category for post.');
        }

        // Check on user
        const user = await User.findOne({where:{id: userId}});

        // Set slug
        const slug = slugify(title, {lower: true});
        const slugExist = await Post.findOne({where: {slug}});
        if(slugExist){
            req.body.slug = `${slug}-${Date.now()}`;
        }else{
            req.body.slug = slug;
        }


        // create Post
        const post = await Post.create({
            title: title,
            content: content,
            slug: req.body.slug
        });


        // Set user
        await post.setUser(user);

        
        // Add images to post
        if(images.length > 0){
            for(const image of images){
                let [img] = await Image.findOrCreate({where: {image: image.image}});
                await post.addImage(img);
            }
        }
                
        // add category to post
        const existCategory = await Category.findOne({where:{name: category.name}});
        if(existCategory){
            await post.setCategory(existCategory);
        }else{
            const newCategory = await Category.create({name: category.name});
            await post.setCategory(newCategory);
        }


        res.status(200).send({message: 'Post has been created.'});


    }catch(err){
        res.status(500).send(err);
    }

}

// update post
exports.update = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.payload.id;
        const { title, content, category, images } = req.body;
        
        const post = await Post.findByPk(postId);

        if(!post) return res.status(404).send({message: 'Post not exist.'});

        // 
        if(post.UserId !== userId) return res.status(403).send({message: 'You are not authorized to this action.'});

        // check Category
        const categoryExist = await Category.findOne({where: {name: category.name}});
        if(categoryExist){
            await post.setCategory(categoryExist);
        }else{
            const newCategory = await Category.create({name: category.name});
            await post.setCategory(newCategory);
        }

        // remove images
        const postImages = await post.getImages();
        await post.removeImage(postImages);

        // add images

        if(images.length > 0){
            for(const image of images ){
                let [img] = await Image.findOrCreate({where: {image: image.image}});
                await post.addImage(img);
            }
        }

        // update slug
        const slug = slugify(title, {lower: true});
        const slugExist = await Post.findOne({where: {slug}});
        if(slugExist){
            req.body.slug = `${slug}-${Date.now()}`;
        }else{
            req.body.slug = slug;
        }

        await Post.update({
            title: title,
            content: content,
            slug: req.body.slug
        }, {where: {id: postId}});

        
        res.status(200).send({message: 'Post has been updated.'})


    } catch(err) {
        res.status(500).send({message: err});
    }
}

// delete one post
exports.deleteOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.payload.id;

        const post = await Post.findByPk(postId);
        if(!post) return res.status(400).send({message: 'Error: Post not exist.'});

        if(post.UserId !== userId) return res.status(403).send({message: 'You are not authorized to this action.'});
        
        await Post.destroy({where:{id: postId}});
        res.status(200).send({message: 'Post has been removed.'});

    } catch(err) {
        res.status(500).send({message: err});
    }
}

// delete all posts
exports.deleteAll = async (req, res) => {
    try {
        const userId = req.payload.id;
        const posts = await Post.findAll({where:{user_id: userId}});

        if(posts.length == 0) return res.status(404).send({message: 'No posts exist.'});

        await Post.destroy({
            where: {user_id: userId},
            truncate: false
        });

        res.status(200).send({message: 'All posts has been deleted.'});

    } catch(err) {
        res.status(500).send({message: err});
    }
}
