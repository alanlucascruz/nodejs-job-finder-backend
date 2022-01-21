const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_EXPIRES_IN = "7 days";

const signIn = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email }).populate(
      "vagas_favoritas"
    );

    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Usuário não encontrado na base de dados." });
    }

    const match = await bcrypt.compare(senha, usuario.senha);

    if (!match) {
      return res.status(401).json({ message: "E-mail e/ou senha inválidos." });
    }

    const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET);

    delete usuario._doc.senha;

    res.json({ ...usuario._doc, token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao entrar no sistema.", error });
  }
};

const signUp = async (req, res) => {
  try {
    const { nome, profissao, whatsapp, link_portfolio, email, senha } =
      req.body;

    const oldUsuario = await Usuario.findOne({ email });

    if (oldUsuario) {
      return res
        .status(409)
        .json({ message: "Usuário já existe. Por favor, faça o seu Login." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      profissao,
      whatsapp,
      link_portfolio,
      email: email.toLowerCase(),
      senha: senhaCriptografada,
    });

    const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET);

    delete usuario._doc.senha;

    res.status(201).json({
      ...usuario._doc,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: "Erro ao registrar o usuário.", error });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { old_senha, new_senha } = req.body;
    const { _id } = req.usuario;

    const usuario = await Usuario.findById(_id).select("senha");

    const match = await bcrypt.compare(old_senha, usuario.senha);

    if (!match) {
      return res.status(401).json({ message: "A antiga senha não confere." });
    }

    const senhaCriptografada = await bcrypt.hash(new_senha, 10);

    await Usuario.updateOne(
      { _id },
      { senha: senhaCriptografada },
      { returnOriginal: false }
    );

    res.json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    res.status(400).json({ message: "Erro ao alterar a senha.", error });
  }
};

module.exports = { signIn, signUp, updatePassword };
