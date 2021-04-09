import Product from "../models/product";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash";

export const create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm sản phẩm không thành công",
      });
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: "Bạn cần nhập đầy đủ thông tin",
      });
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 100000) {
        res.status(400).json({
          error: "Bạn nên upload ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: `Không thêm được sản phẩm - ${err}`,
        });
      }

      res.json(data);
    });
  });
};

export const list = async (req, res) => {
  const lists = await Product.find({});
  res.json(lists);
};

export const findById = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send("Không có nhé");
    });
};

export const deleteById = async (req, res) => {
  const product = req.params.id;
  console.log(product);
  Product.deleteOne({ _id: product })
    .then((data) => {
      res.json(`Xóa ô kê`);
    })
    .catch((err) => {
      err;
    });
};

export const updateById = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Sửa sản phẩm không thành công",
      });
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: `Bạn cần nhập đầy đủ thông tin `,
      });
    }

    //  let product = new Product(fields);
    let product = req.product;
    product = _.assignIn(product, fields);
    if (files.photo) {
      if (files.photo.size > 100000) {
        res.status(400).json({
          error: "Bạn nên upload ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
      console.log(product);
    }
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: `Không sửa được sản phẩm ${err}`,
        });
      }
      res.json(data);
    });
  });
};

export const getParamId = async (req, res, next, id) => {
  //   const product = Product.find({ _id: req.params.id });
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.json("Khong tim thay san pham");
    }
    req.product = product;
    next();
  });
};
