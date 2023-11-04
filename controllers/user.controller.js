const status = require('http-status');
const handler = require('../utils/handler');
const jwt = require('jsonwebtoken');
let _user;

const getAll = (req, res) => {
    _user.find({})
        .sort({ name: 1 })
        .exec(handler.handleMany.bind(null, 'usuarios', res));
};

const getById = (req, res) => {
    let { _id } = req.params;
    _user.findById({ _id })
        .exec(handler.handleOne.bind(null, 'usuario', res));
};

const login = (req, res) => {
    const credentials = req.body;
    _user.findOne({ 'user': credentials.user, 'pass': credentials.pass })
        .select('name lastname idworker job user permissions activeSession')
        .then(user => {
            if (user) {
                if (!user.activeSession) {
                    // el usario ha sido logueado, actualizar su sesión a activa
                    user.activeSession = true;
                    user.save();

                    return res.status(status.OK).json({
                        code: status.OK,
                        token: jwt.sign({
                            user: user
                        }, 's3cr3t4.', { expiresIn: '7d' })
                    });
                } else {
                    return res.status(status.FORBIDDEN).json({
                        code: status.FORBIDDEN,
                        message: 'La sesión del usuario se encuentra activa en otro dispositivo.'
                    });
                }
            } else {
                res.status(status.NOT_FOUND).json({
                    code: status.NOT_FOUND,
                    message: 'Usuario y/o contraseña incorrectos.'
                });
            }
        });
};

const logout = (req, res) => {
    const token = req.body.token;
    if (token) {
        _user.findOne({ '_id': jwt.decode(token).user._id })
            .then(user => {
                user.activeSession = false;
                user.save();
                return res.status(status.OK).json({
                    code: status.OK,
                    message: 'La sesión ha sido revocada correctamente.'
                });
            }).catch(err => res.status(status.BAD_REQUEST).json({
                code: status.BAD_REQUEST,
                message: 'Error in request',
                detail: err.toString()
            }));
    } else {
        return res.status(status.BAD_REQUEST).json({
            code: status.BAD_REQUEST,
            message: 'El token no fué enviado en la petición.'
        });
    }

};

const create = (req, res) => {
    let user = req.body;
    console.log(req.body)//para ver lo que esta mandando al api
    _user.create(user)
        .then(created => res.json({ code: status.OK, user: created }))
        .catch(err => res.status(status.BAD_REQUEST).json({
            code: status.BAD_REQUEST,
            message: 'Error in request',
            detail: err.toString()
        }));
};

const update = (req, res) => {
    let user = req.body;
    let { _id } = req.params;
    _user.findByIdAndUpdate(_id, user, { new: true })
        .exec(handler.handleOne.bind(null, 'usuario', res));
};

const remove = (req, res) => {
    let { _id } = req.params;
    _user.findByIdAndRemove(_id)
        .exec(handler.handleOne.bind(null, 'usuario', res));
};


module.exports = (User) => {
    _user = User;
    return ({
        getAll,
        getById,
        create,
        update,
        remove,
        login,
        logout
    });
}