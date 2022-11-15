const { Reserva } = require("../models/Reserva");
const { validationResult } = require("express-validator");
const axios = require("axios");

const obtenerReserva = async (req, res) => {
  const reservas = await Reserva.find();
  res.json({ reservas });
};

const obtenerReservaPorId = async (req, res) => {
  const reserva = await Reserva.findById(req.params.id);
  res.status(200).json({ reserva });
};

const consultaAxios = async (req, res) => {
  try {
    const respuesta = await axios.get(
      "http://nolaborables.com.ar/api/v2/feriados/2023"
    );
    res.json({ data: respuesta.data, status: respuesta.staus });
  } catch (error) {
    res.json({ data: error.response.data, status: error.response.status });
  }
};

const cargarReserva = async (req, res) => {
  try {
    const err = validationResult(req);
    if (err.isEmpty()) {
      const reserva = new Reserva(req.body);
      await reserva.save();
      res.status(201).json({
        msg: "Tu reserva ha sido guardada",
        reserva: reserva,
      });
    } else {
      res.status(501).json(err);
    }
  } catch (error) {
    res.status(501).json({ error });
  }
};

const editarReserva = async (req, res) => {
  try {
    const error = validationResult(req);
    if (error.isEmpty()) {
      await Reserva.findByIdAndUpdate(req.params.id, req.body);
      res.status(201).json({ msg: "Tu reserva ha sido actualizada" });
    } else {
      res.status(501).json({ msg: error });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    res.json({ msg: "Su reserva ha sido eliminada", reserva });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  obtenerReserva,
  obtenerReservaPorId,
  cargarReserva,
  editarReserva,
  eliminarReserva,
  consultaAxios,
};
