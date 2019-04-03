const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.getUsers = (req, res) => {
    User.find({ }, 'name email img role')
        .exec((err, users) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error listando usuarios',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Get de usuarios',
            data: {
                users: users
            }
        })
    });
}

module.exports.editUser = (req, res) => {
    
    let id = req.params.id;
    let body = req.body;

    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID'}
            });
        }

        user.name = body.name;
        user.email = body.email;
        user.role = body.role;

        user.save( (err, savedUser) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar usuario',
                    errors: err
                });
            }

            savedUser.password = 'PROTECTED'
            res.status(200).json({
                ok: true,
                data: {
                    user: savedUser
                }
            });
        });
    });

};

module.exports.createUser = (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password ? bcrypt.hashSync(body.password, 10) : null,
        img: body.img,
        role: body.role
    });

    user.save( (err, savedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear usuario',
                errors: err
            });
        }

        savedUser.password = 'PROTECTED'
        res.status(201).json({
            ok: true,
            data: {
                user: savedUser
            }
        });
    });

};

module.exports.deleteUser = (req, res) => {
    
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al eliminar usuario',
                errors: err
            });
        }
        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                message: 'No existe usuario con ese id',
                errors: { message: 'No existe ningun usuario con el id ' + id }
            });
        }
        res.status(200).json({
            ok: true,
            data: {
                user: deletedUser
            }
        });
    });

};