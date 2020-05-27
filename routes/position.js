const router = require('express').Router();
const Position = require('../models/Position');
const cleanRequestQuery = require('../common/utils');

router.post('/', async (req, res, next) => {
    const position = new Position({
        name: req.body.name
    });
    try {
        savedPosition = await position.save();
        res.send(savedPosition);
    } catch (error) {
        res.send(error)
    }
    next();
})
router.get('/', async (req, res, next) => {
    let find = cleanRequestQuery(req);
    const positions = await Position.find(find).limit(10).exec();
    if (!positions) {
        res.status(404).send({
            message: 'No positions found'
        })
    }
    res.send(positions);
})
router.get('/:_id', async (req, res, next) => {
    let positions = null;
    try {
        positions = await Position.findById(req.params._id).exec();
        if (!positions || positions.length === 0) {
            res.status(404).send({
                message: 'No positions found'
            })
        }
        res.send(positions);
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