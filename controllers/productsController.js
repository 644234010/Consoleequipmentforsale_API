const db = require("../config/db");

//Get All Products
const getProducts = async function (req, res) {

  try {
    res.setHeader("Content-Type", "application/json");

    db.query(
      `SELECT pd.product_id, pd.product_title, 
        pd.product_color_1_name, pd.product_color_1_in_stock, 
        pd.product_color_2_name, pd.product_color_2_in_stock, 
        pd.product_color_3_name, pd.product_color_3_in_stock, 
        pd.product_price, product_description, 
        pd.product_category,ct.category_name,
        pd.product_brand,bd.brand_name 
      FROM product pd,category ct, brand bd 
      WHERE pd.product_category=ct.category_id AND pd.product_brand=bd.brand_id`,
      function (error, results, fields) {
        if (error) throw error;

        return res
          .status(200)
          .send({ error: false, message: "books list", data: results });
      }
    );
  } catch {
    return res.status(401).send();
  }
};

//Get Product by Id
const getProductById = async function (req, res) {
  try {
    res.setHeader("Content-Type", "application/json");

    var productid = Number(req.params.productid);

    db.query(
      `SELECT pd.product_id, pd.product_title, 
      pd.product_color_1_name, pd.product_color_1_in_stock, 
      pd.product_color_2_name, pd.product_color_2_in_stock, 
      pd.product_color_3_name, pd.product_color_3_in_stock, 
      pd.product_price, product_description, 
      pd.product_category,ct.category_name,
      pd.product_brand,bd.brand_name 
    FROM product pd,category ct, brand bd 
    WHERE pd.product_category=ct.category_id AND pd.product_brand=bd.brand_id AND pd.product_id=?`,
    productid.toString(),
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          message: "product id =" + productid.toString(),
          data: results,
        });
      }
    );
  } catch {
    return res.status(401).send();
  }
};



//Upload product picture
const getProductPicture = async function (req, res) {
  const productPicturePath = process.env.PRODUCT_PICTURE_PATH;
  var productid = Number(req.params.productid);
  var colorid = Number(req.params.colorid);
  try {

    var {resolve} = require('path');
    var fullPath=resolve(`${productPicturePath}${productid}_${colorid}.jpg`)
    var fs = require('fs');
    
    if (fs.existsSync(`${productPicturePath}${productid}_${colorid}.jpg`))
      fullPath=resolve(`${productPicturePath}${productid}_${colorid}.jpg`)
    else if (fs.existsSync(`${productPicturePath}${productid}_${colorid}.jpeg`))
      fullPath=resolve(`${productPicturePath}${productid}_${colorid}.jpeg`)
    else if (fs.existsSync(`${productPicturePath}${productid}_${colorid}.png`))
      fullPath=resolve(`${productPicturePath}${productid}_${colorid}.png`)
    else
      fullPath=resolve(`${productPicturePath}no_image.png`)
    
    res.sendFile(fullPath, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "file is not found" });
      }
    });

  } catch (err){
    console.log(err);
    return res.status(401).send();
  }
};




module.exports = {
  getProducts,
  getProductById,
  getProductPicture,
};
