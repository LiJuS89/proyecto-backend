const { User } = require("../models/User");

const validarEmail = async (req, res, next) => {
  const consulta = await User.findOne({
    email: req.body.email,
  });
  if (consulta !== null) {
    res.json({
      msg: "Ya existe un usuario registrado con el email ingresado",
    });
  } else {
    next();
  }
};

module.exports = { validarEmail };
