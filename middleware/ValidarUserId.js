const { User } = require("../models/User");
const validarUserId = async (req, res, next) => {
  const item = await User.findById(req.params.id);
  if (item !== null) {
    next();
  } else {
    res.status(500).json({ msg: "El id ingresado no existe" });
  }
};

module.exports = { validarUserId };
