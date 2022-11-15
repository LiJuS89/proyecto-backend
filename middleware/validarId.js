const { Reserva } = require("../models/Reserva");
const validar = async (req, res, next) => {
  const item = await Reserva.findById(req.params.id);
  if (item !== null) {
    next();
  } else {
    res.status(500).json({ msg: "El id ingresado no existe" });
  }
};

module.exports = { validar };
