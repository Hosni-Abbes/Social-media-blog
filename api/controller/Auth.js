const User = require('../model/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/authJWT');

// Register
exports.register = async (req, res) => {

    if(!req.body.username || !req.body.password || !req.body.email){
        res.status(400).send({message: "All fields are required."});
        return;
    }

    await User.create(req.body)
    .then(() => res.status(200).send({message: `User ${req.body.email} has been created successfully.`}))
    .catch(err => {
        if(err.errors){
            res.status(400).send({message: err.errors[0].message});
        }else if(err.error){
            res.status(400).send({message: err.error.message});
        }else{
            res.status(400).send({message: err || "Invalid credentials: username and email should be unique, password should be more than 6 caracters."});
        }
    });
    
}



// login user
exports.login = async (req, res) => {

    const { email, password } = req.body;
    if(!password || !email){
        res.status(400).send({message: "Enter your email and password."});
        return;
    }

    await User.findAll({
        where:{ email }
    })
    .then( data => {
        if(data.length == 1){
            const user = data[0];
            const verifiedPassword = bcrypt.compareSync(password, user.password);

            if(!verifiedPassword){
                res.status(401).send({message: 'Wrong credentials!'});
            }else{
                // generate access token
                const token = generateToken(user);

                res.status(200).send({user:{
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        accesstoken: token
                    }
                });
            }

        }else{
            res.status(401).send({message: 'Wrong credentials: User not exist'});
        }
    })
    .catch(err => res.status(500).send(err));

}



exports.logout = async (req, res) => {
    try {
        const userId = req.payload.id;

        const user = await User.findByPk(userId);
        
        if(!user) return res.status(400).send({message: "User not exist"});

        res.status(200).send({
            user:{
                id: null,
                username: null,
                email: null,
                accesstoken: null
            },
            message: 'Logout successfully.'
        });


    } catch(err) {
        console.log(err);
        res.status(500).send({message: "Internal server error."});
    }
}