const router = require('express').Router();

module.exports = (wagner) => {
    const userCtrl = wagner.invoke((User) =>
        require('../controllers/user.controller')(User));

    router.get('/', (req, res) =>
        userCtrl.getAll(req, res));

    router.get('/:_id', (req, res) =>
        userCtrl.getById(req, res));

    router.post('/login', (req, res) =>
        userCtrl.login(req, res));

    router.post('/logout', (req, res) =>
        userCtrl.logout(req, res));

    router.post('/', (req, res) =>
        userCtrl.create(req, res));

    router.put('/:_id', (req, res) =>
        userCtrl.update(req, res));

    router.delete('/:_id', (req, res) =>
        userCtrl.remove(req, res));
    return router;
}