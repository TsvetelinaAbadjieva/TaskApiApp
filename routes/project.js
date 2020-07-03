const Project = require('../models/Project');
const projectValidator = require('../validators/project-validator');
const projectSchema = projectValidator();
const validateRequest = require('../validators/main-validator');
const router = require('express').Router();
const mongoose = require('mongoose');


router.post('/', validateRequest(projectSchema), async (req, res, next) => {
    const data = Object.assign({_id:new mongoose.Types.ObjectId()},req.body);
    const project = new Project({
        ...data
    });
    try {
        const savedProject = await project.save();
        res.status(200).send(savedProject);
    } catch (err) {
        res.status(400).send('Operation impossible')
        if (err) throw err;
    }
    next();
})

router.get('/',async(req,res,next)=>{
    try{
        const projects = await Project.find().populate('responsible_persons').exec();
        res.status(200).send(projects);
    }catch(err){
        res.status(400).send(err)
    }
    next();
})

module.exports = router;