const router = require('express').Router();
const Department = require('../models/Department');
const cleanRequestQuery = require('../common/utils');

router.post('/', async (req, res, next) => {
    const department = new Department({
        name: req.body.name
    });
    try {
        savedDepartment = await department.save();
        res.send(savedDepartment);
    } catch (error) {
        res.send(error)
    }
    next();
})
router.get('/', async (req, res, next) => {
    let find = cleanRequestQuery(req);
    const departments = await Department.find(find).limit(10).exec();
    if (!departments) {
        res.status(404).send({
            message: 'No departments found'
        })
    }
    console.log('in departments')
    res.send(departments);
})
router.get('/:_id', async (req, res, next) => {
    let departments = null;
    try {
        departments = await Department.findById(req.params._id).exec();
        if (!departments || departments.length === 0) {
            res.status(404).send({
                message: 'No departments found'
            })
        }
        res.send(departments);
    } catch (error) {
        if (error) {
            res.status(400).send({
                message: 'Operation error',
                error: error
            })
        }
    }
})

module.exports = router;