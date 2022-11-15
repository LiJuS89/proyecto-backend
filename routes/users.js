const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  obtenerUsuarios,
  registrarUsuario,
  iniciarSesion,
  cerrarSesion,
  eliminarUsuario,
} = require("../controllers/userController");
const { check } = require("express-validator");
const { validarUserId } = require("../middleware/ValidarUserId");
const { validarEmail } = require("../middleware/validarEmail");
//GET
router.get("/lista", auth, obtenerUsuarios);

//POST
router.post(
  "/registrarUsuario",
  validarEmail,
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("El campo no puede estar vacío")
      .isEmail()
      .withMessage("Debe ingresar un email"),
    check("pass")
      .not()
      .isEmpty()
      .withMessage("El campo no puede estar vacío")
      .isLength({ min: 4, max: 8 })
      .withMessage(
        "La contraseña debe tener 4 caracteres como mínimo y 8 como máximo"
      ),
  ],
  registrarUsuario
);

router.post(
  "/iniciarSesion",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("El campo no puede estar vacío")
      .isEmail()
      .withMessage("Debe ingresar un email"),
    check("pass")
      .not()
      .isEmpty()
      .withMessage("El campo no puede estar vacío")
      .isLength({ min: 4, max: 8 })
      .withMessage(
        "La contraseña debe tener 4 caracteres como mínimo y 8 como máximo"
      ),
  ],
  iniciarSesion
);

//DELETE
router.delete("/cerrarSesion", auth, cerrarSesion);
router.delete(
  "/eliminarUsuario/:id([0-9a-fA-F]{24})",
  auth,
  validarUserId,
  eliminarUsuario
);

module.exports = router;
