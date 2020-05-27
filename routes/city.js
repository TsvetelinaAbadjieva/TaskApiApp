const router = require('express').Router();
const City = require('../models/City');
const cleanRequestQuery = require('../common/utils');

router.post('/', async (req, res, next) => {
    const city = new City({
        name: req.body.name,
        zip: req.body.zip
    });
    try {
        savedCity = await city.save();
        res.send(savedCity);
    } catch (error) {
        res.send(error)
    }
    next();
})
router.get('/:_id', async (req, res, next) => {
    let city = null;
    try {
        city = await City.findById(req.params._id).exec();
        if (!city || city.length === 0) {
            res.status(404).send({
                message: 'No city found'
            })
        }
        res.send(city);
    } catch (error) {
        if (error) {
            res.status(400).send({
                message: 'Operation error',
                error: error
            })
        }
    }
})

router.get('/', async (req, res, next) => {
    let regex = null;
    let find = cleanRequestQuery(req);
    const cities = await City.find(find).limit(10).exec();
    if (!cities) {
        res.status(404).send({
            message: 'No cities found'
        })
    }
    console.log('in cities')
    res.send(cities);
})


module.exports = router;