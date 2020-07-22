const jwt = require("jsonwebtoken");
// ====================
// verificar token
//=====================

let verificaToken = (req, res, next) => {
    let token = req.get("token");

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no valido",
                },
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

// ====================
// verificar token
//=====================

let verificaAdmin_role = (req, res, next) => {
    let usuario = req.usuario;

    if (!(usuario.role === "ADMIN_ROLE")) {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Usuario no es administrador",
            },
        });
    }
    next();
};

module.exports = {
    verificaToken,
    verificaAdmin_role,
};