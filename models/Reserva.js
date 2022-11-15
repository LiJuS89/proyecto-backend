const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const reservaSchema = new Schema({
  mes: {
    type: String,
    required: true,
  },
  dia: {
    type: Number,
    required: true,
  },
  turno: {
    type: String,
    required: true,
  },
});

const Reserva = mongoose.model("Reserva", reservaSchema);

module.exports = { Reserva };
