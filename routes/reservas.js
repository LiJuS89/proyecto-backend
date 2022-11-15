const express = require("express");
const {
  obtenerReserva,
  obtenerReservaPorId,
  cargarReserva,
  editarReserva,
  eliminarReserva,
  consultaAxios,
} = require("../controllers/reservaController");
const router = express.Router();
const { check } = require("express-validator");
const { validar } = require("../middleware/validarId");
const { coincide } = require("../middleware/validarFecha");
const { auth } = require("../middleware/auth");
const { esMes } = require("../middleware/validarMes");
const { esTurno } = require("../middleware/validarTurno");
const { esDia } = require("../middleware/validarDia");

/* GET */
router.get("/lista", auth, obtenerReserva);
router.get("/id/:id([0-9a-fA-F]{24})", auth, validar, obtenerReservaPorId);
router.get("/feriadosNoLaborables", auth, consultaAxios);

/* POST */
router.post(
  "/crear",
  auth,
  esMes,
  esDia,
  esTurno,
  coincide,
  [
    check("mes")
      .not()
      .isEmpty()
      .withMessage("Debe ingresar un mes")
      .isString()
      .withMessage("El mes no debe contener números")
      .isLength({ min: 1, max: 10 })
      .withMessage("El mes debe tener entre 1 y 10 letras"),
    check("dia")
      .not()
      .isEmpty()
      .withMessage("Ingresar día")
      .isNumeric()
      .withMessage("Solo se admiten números")
      .isLength({ max: 2 })
      .withMessage("El día puede tener hasta dos dígitos"),
    check("turno")
      .not()
      .isEmpty()
      .withMessage("Debe elegir entre mañana, tarde o noche")
      .isString()
      .withMessage("El turno no debe tener números"),
  ],
  cargarReserva
);

/* PUT */
router.put(
  "/editar/:id([0-9a-fA-F]{24})",
  auth,
  validar,
  esMes,
  esDia,
  esTurno,
  coincide,
  [
    check("mes")
      .not()
      .isEmpty()
      .withMessage("Debe ingresar un mes")
      .isString()
      .withMessage("El mes no puede contener números")
      .isLength({ min: 1, max: 10 })
      .withMessage("El mes debe tener entre 1 y 10 letras"),
    check("dia")
      .not()
      .isEmpty()
      .withMessage("Ingresar día")
      .isNumeric()
      .withMessage("Solo se admiten números")
      .isLength({ max: 2 })
      .withMessage("El día puede tener hasta dos dígitos"),
    check("turno")
      .not()
      .isEmpty()
      .withMessage("Debe elegir entre mañana, tarde o noche")
      .isString()
      .withMessage("El turno no debe tener números")
      .isLength({ max: 6 })
      .withMessage("El turno puede terner hasta 6 letras"),
  ],
  editarReserva
);

/* DELETE */
router.delete("/eliminar/:id([0-9a-fA-F]{24})", auth, validar, eliminarReserva);

module.exports = router;
