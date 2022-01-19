const Vaga = require("../models/Vaga");
const multer = require("multer");
const path = require("path");
const { unlink } = require("fs");

const index = async (req, res) => {
  try {
    const { filter } = req.params;

    const data = await Vaga.find({ nome: new RegExp(filter, "i") }).sort(
      "-acessos"
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Erro ao listar as vagas.", error });
  }
};

const show = async (req, res) => {
  try {
    const data = await Vaga.findById(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar a vaga.", error });
  }
};

const store = async (req, res) => {
  try {
    const data = await Vaga.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: "Erro ao cadastrar a vaga.", error });
  }
};

const update = async (req, res) => {
  try {
    const data = req.body;

    await Vaga.updateOne({ _id: req.params.id }, data);

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar a vaga", error });
  }
};

const updateAcessos = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Vaga.findById(id).select("acessos");

    data._doc.acessos = data._doc.acessos + 1;

    await Vaga.updateOne({ _id: id }, data);

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar os acessos", error });
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
      const oldData = await Vaga.findById(req.params.id).select("imagem");

      if (oldData.imagem) {
        unlink(`public/${oldData.imagem}`, (error) => {
          if (error) throw error;
        });
      }

      // update new image
      const updateData = { imagem: `/uploads/${req.file.filename}` };

      const data = await Vaga.findByIdAndUpdate(req.params.id, updateData, {
        returnOriginal: false,
      });

      res.json(data);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erro ao realizar o upload da imagem.", error });
    }
  });
};

const destroy = async (req, res) => {
  try {
    // delete old image if exists
    const oldData = await Vaga.findById(req.params.id).select("imagem");

    if (oldData.imagem) {
      unlink(`public/${oldData.imagem}`, (error) => {
        if (error) throw error;
      });
    }

    // delete from database
    await Vaga.deleteOne({ _id: req.params.id });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir a vaga.", error });
  }
};

module.exports = { index, show, store, update, updateAcessos, upload, destroy };
