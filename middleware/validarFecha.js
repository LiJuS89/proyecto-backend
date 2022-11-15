const { Reserva } = require("../models/Reserva");

const coincide = async (req, res, next) => {
  const consulta = await Reserva.findOne({
    dia: req.body.dia,
    mes: req.body.mes,
    turno: req.body.turno,
  });
  if (consulta !== null) {
    res.json({
      msg: "Lo sentimos, esta fecha no está disponible",
    });
  } else {
    next();
  }
};

module.exports = { coincide };
