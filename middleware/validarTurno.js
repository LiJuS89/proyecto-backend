const esTurno = (req, res, next) => {
  if (
    req.body.turno === "mañana" ||
    req.body.turno === "tarde" ||
    req.body.turno === "noche"
  ) {
    next();
  } else {
    res.status(500).json({
      msg: "Debes escribir mañana, tarde o noche en minúsculas",
    });
  }
};

module.exports = { esTurno };
