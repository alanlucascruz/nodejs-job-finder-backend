const Usuario = require("../models/Usuario");
const multer = require("multer");
const path = require("path");
const { existsSync, unlink } = require("fs");

const show = async (req, res) => {
  try {
    const data = await Usuario.findById(req.usuario._id).populate(
      "vagas_favoritas"
    );

    delete data._doc.senha;

    res.json(data);
  } catch (error) {
    res
      .json(500)
      .json({ message: "Erro ao buscar os dados do usuário.", error });
  }
};

const updateFavorite = async (req, res) => {
  try {
    const { vaga_id } = req.body;

    const usuario = await Usuario.findById(req.usuario._id);

    const indexOf = usuario.vagas_favoritas.indexOf(vaga_id);

    if (indexOf === -1) {
      usuario.vagas_favoritas.push(vaga_id);

      await Usuario.updateOne({ _id: req.usuario._id }, usuario);
    } else {
      usuario.vagas_favoritas.splice(indexOf, 1);

      await Usuario.updateOne({ _id: req.usuario._id }, usuario);
    }

    const usuarioUpdated = await Usuario.findById(req.usuario._id).populate(
      "vagas_favoritas"
    );

    res.json(usuarioUpdated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao favoritar a vaga.", error });
  }
};

const upload = (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const uploadImage = multer({ storage });

  uploadImage.single("imagem")(req, res, async (error) => {
    try {
      if (error) throw error;

      // delete old image if exists
      const oldData = await Usuario.findById(req.usuario._id).select("imagem");

      if (oldData.imagem && existsSync(`public/${oldData.imagem}`)) {
        unlink(`public/${oldData.imagem}`, (error) => {
          if (error) throw error;
        });
      }

      // update new image
      const updateData = { imagem: `/uploads/${req.file.filename}` };

      const data = await Usuario.findByIdAndUpdate(
        req.usuario._id,
        updateData,
        {
          returnOriginal: false,
        }
      ).populate("vagas_favoritas");

      delete data._doc.senha;

      res.json(data);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erro ao realizar o upload da imagem.", error });
    }
  });
};

module.exports = { show, updateFavorite, upload };
