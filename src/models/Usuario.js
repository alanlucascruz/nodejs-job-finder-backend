const mongoose = require("mongoose");

const types = mongoose.Schema.Types;

const Usuario = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    profissao: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    link_portfolio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    imagem: {
      type: String,
    },
    vagas_favoritas: [{ type: types.ObjectId, ref: "Vaga" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuario", Usuario);
