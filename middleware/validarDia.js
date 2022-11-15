const esDia = (req, res, next) => {
  if (req.body.dia > 0 && req.body.dia < 16) {
    next();
  } else {
    res.status(500).json({
      msg: "Solo se admiten reservas del 1 al 15 de cada mes",
    });
  }
};

module.exports = { esDia };
