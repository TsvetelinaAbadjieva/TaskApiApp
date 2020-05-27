const router = require('express').Router();
const Country = require('../models/Country');
const cleanRequestQuery = require('../common/utils');


router.post('/', async (req, res, next) => {
    const country = new Country({
        name: req.body.name,
        code:req.body.code
    });
    try {
        savedCountry = await country.save();
        res.send(savedCountry);
    } catch (error) {
        res.send(error)
    }
    next();
})
router.get('/:_id', async (req, res, next) => {
    let country = null;
    try {
        country = await Country.findById(req.params._id).exec();
        if (!country || country.length === 0) {
            res.status(404).send({
                message: 'No country found'
            })
        }
        res.send(country);
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
    let find = cleanRequestQuery(req);
    // let regex = new RegExp(req.query.name.replace(/[',"]/g,''),"ig");
    // console.log(req.query,regex)

    const countries = await Country.find(find).limit(10).exec();
    if (!countries) {
        res.status(404).send({
            message: 'No cities found'
        })
    }
    console.log('in cities')
    res.send(countries);
})


module.exports = router;