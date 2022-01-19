const mongoose = require("mongoose");

const Vaga = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    salario: {
      type: String,
      required: true,
    },
    acessos: {
      type: Number,
      default: 0,
    },
    imagem: {
      type: String,
    },
    requisitos: [String],
    empresa: {
      nome: {
        type: String,
        required: true,
      },
      localizacao: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vaga", Vaga);
