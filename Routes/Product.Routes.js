const express = require("express");
const { ProductModel } = require("../Models/Product.Model");

const productRouter = express.Router();

// post all products

productRouter.post("/", async (req, res) => {
  const { name, description, category, imageUrl, location, date, price } =
    req.body;

  try {
    const product = new ProductModel({
      name,
      description,
      category,
      imageUrl,
      location,
      date,
      price,
    });
    await product.save();

    res.send({ msg: "Product created successfully", product });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Something went wrong.", error: error.message });
  }
});

// get all products

productRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).send({ Products: products });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Something went wrong.", error: error.message });
  }
});

// edit product

productRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  try {
    await ProductModel.findByIdAndUpdate(id, product);

    res.status(203).send({ msg: "Product updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Something went wrong.", error: error.message });
  }
});

// delete product

productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await ProductModel.findByIdAndDelete(id);

    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Something went wrong.", error: error.message });
  }
});

// filter products by category
productRouter.get("/filter/:category", async (req, res) => {
  const { category } = req.params;
  console.log(category);
  try {
    const products = await ProductModel.find({ category }).limit(4);
    res.status(200).send({ products: products });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// sort products by date
productRouter.get("/date/:order", async (req, res) => {
  const order = req.params.order == "asc" ? 1 : -1;
  try {
    const products = await ProductModel.find().sort({ date: order }).limit(4);
    res.status(200).send({ products: products });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// pagination
productRouter.get("/page/:page", async (req, res) => {
  const page = req.params.page;
  try {
    const products = await ProductModel.find()
      .skip((page - 1) * 4)
      .limit(4);
    res.status(200).send({ products: products });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// search products by name
productRouter.get("/search/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const products = await ProductModel.find({ name }).limit(4);
    res.status(200).send({ products: products });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = { productRouter };
