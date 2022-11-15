const esMes = (req, res, next) => {
  if (
    req.body.mes === "enero" ||
    req.body.mes === "febrero" ||
    req.body.mes === "marzo" ||
    req.body.mes === "abril" ||
    req.body.mes === "mayo" ||
    req.body.mes === "junio" ||
    req.body.mes === "julio" ||
    req.body.mes === "agosto" ||
    req.body.mes === "septiembre" ||
    req.body.mes === "octubre" ||
    req.body.mes === "noviembre" ||
    req.body.mes === "diciembre"
  ) {
    next();
  } else {
    res.status(500).json({
      msg: "Debes ingresar un mes en minúsculas. Ej: enero",
    });
  }
};

module.exports = { esMes };
