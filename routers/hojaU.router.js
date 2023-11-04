const router = require('express').Router();

module.exports = (wagner) => {
    const hojaUCtrl = wagner.invoke((HojaU) =>
        require("../controllers/hojaU.controller")(HojaU));

    router.get('/', (req, res) =>
        hojaUCtrl.getAll(req, res));

    router.get('/:_id', (req, res) =>
        hojaUCtrl.getById(req, res));

    router.post('/', (req, res) =>
        hojaUCtrl.create(req, res));

    router.put('/:_id', (req, res) =>
        hojaUCtrl.update(req, res));

    router.delete('/:_id', (req, res) =>
        hojaUCtrl.remove(req, res));
    return router;
}
