const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al iniciar sesion',
                errors: err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                message: 'Credenciales incorrectas',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok: false,
                message: 'Credenciales incorrectas',
                errors: err
            });
        }
        
        userDB.password = 'PROTECTED';
        let token =  jwt.sign({ user: userDB }, 'seed', { expiresIn: 14400 });

        res.status(200).json({
            ok: true,
            message: 'Login correcto',
            token: token,
            id: userDB._id
        });

    })
    
};