import Product from "../models/product";
import formidable from "formidable";

export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      ers.send("Loi");
    }
    console.log(fields);
    console.log(files.photo.size);
  });
  // const product = new Product(req.body);
  // product.save((err, data) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.json(data);
  //   }
  // });
};

export const list = async (req, res) => {
  const lists = await Product.find({});
  res.json(lists);
};

export const findById = async (req, res) => {
  const product = await Product.find({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send("Không có nhé");
    });
};

export const deleteById = async (req, res) => {
  const product = Product.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send("Không có nhé" + err);
    });
};

export const updateById = async (req, res) => {
  //   const product = Product.find({ _id: req.params.id });
  await Product.updateOne({ _id: req.params.id }, req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const updateById = async (req, res, next, id) => {
  //   const product = Product.find({ _id: req.params.id });
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.json("Khong tim thay");
    }
    req.product = product;
    next();
  });
};
