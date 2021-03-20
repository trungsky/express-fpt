import Product from "../models/product";

export const create = (req, res) => {
  const product = new Product(req.body);
  product.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
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
