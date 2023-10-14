const Category = require('../model/Category');

exports.create = async (req, res) => {
    if(!req.body.name){
        res.status(400).send({message: 'Category is required'});
        return;
    }

    Category.create(req.body)
    .then(() => res.status(200).send({message: 'Category added successfully'}))
    .catch(err => res.status(500).send(err));

}