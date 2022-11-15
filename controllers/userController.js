const { User } = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const registrarUsuario = async (req, res) => {
  try {
    const err = validationResult(req);
    if (err.isEmpty()) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.pass, salt);
      const user = {
        email: req.body.email,
        pass: hash,
      };
      const nuevoUsuario = new User(user);
      await nuevoUsuario.save();
      res
        .status(201)
        .json({ msg: "Se ha registrado correctamente", nuevoUsuario });
    } else {
      res.status(501).json(err);
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const obtenerUsuarios = async (req, res) => {
  const usuarios = await User.find();
  res.status(200).json({ usuarios });
};

const iniciarSesion = async (req, res) => {
  try {
    const usuario = await User.findOne({ email: req.body.email });
    if (usuario === null) {
      res
        .status(404)
        .json({ msg: "No existe un usuario registrado con ese email" });
    } else {
      bcrypt.compare(req.body.pass, usuario.pass).then((validPass) => {
        if (validPass) {
          const user = {
            _id: usuario._id,
            email: usuario.email,
          };
          req.session.user = user;
          res.status(200).json({
            msg: "Se ha iniciado sesión correctamente",
            usuario: user,
          });
        } else {
          res.status(401).json({ msg: "Revisa tu contraseña" });
        }
      });
    }
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const cerrarSesion = async (req, res) => {
  req.session.destroy();
  res.status(200).json({ msg: "Se ha cerrado sesión correctamente" });
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "El usuario ha sido eliminado", usuario });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registrarUsuario,
  obtenerUsuarios,
  iniciarSesion,
  cerrarSesion,
  eliminarUsuario,
};
