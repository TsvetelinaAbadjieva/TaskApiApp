 const cleanRequestQuery = (req) => {
    let find = {};
    if(req.query){
        Object.keys(req.query).forEach(key => {
            req.query[key]=req.query[key].toLowerCase().replace(/[',",\s]/g, '');
            if (isNaN(Number(req.query[key])) || !req.query[key]) {
                regex = new RegExp(req.query[key], "ig");
                find[key] = regex;
            } else {
                find[key] = Number(req.query[key])
            }
        })
    }
    return find;
 }
 module.exports = cleanRequestQuery;