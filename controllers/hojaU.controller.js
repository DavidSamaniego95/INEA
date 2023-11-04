const status = require ('http-status');
const handler = require('../utils/handler');

let _hojaU;

const getAll = (req, res) => {
 _hojaU.find({})
    .sort({ name : 1})
    .exec(handler.handleMany.bind(null, 'hojasU' , res))
};

const getById = (req, res) => {
    let { _id } = req.params;
    _hojaU.findById({ _id} )
    .exec(handler.handleOne.bind(null,'hojaU', res ));
};

const create = (req, res) => {
    let hojaU = req.body;
    console.log(hojaU)//para ver lo que esta mandando al api
    _hojaU.create(hojaU)
        .then(created => res.json({ code : status.OK, hojaU : created }))
        .catch(err => res.status(status.BAD_REQUEST).json({
            code : status.BAD_REQUEST,
            message: 'Error in request',
            detail: err.toString()
        }));
};

const update = (req, res) => {
    let hojaU = req.body;
    console.log(req.body);
    let { _id } = req.params;
    _hojaU.findByIdAndUpdate(_id, hojaU, { new : true})
        .exec(handler.handleOne.bind(null, 'hojaU', res));
};

const remove = (req, res) => {
    let { _id } = req.params;
    _hojaU.findByIdAndRemove(_id)
        .exec(handler.handleOne.bind(null,'hojaU',res));
};

module.exports = (HojaU) => {
    _hojaU =  HojaU;
    return ({
        getAll,
        getById,
        create,
        update,
        remove
    });
};