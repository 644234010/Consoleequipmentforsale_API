const db = require("../config/db");

//Get All Categories
const getCategories = async function (req, res) {

  try {
    res.setHeader("Content-Type", "application/json");

    db.query(
      `SELECT *  FROM category order by category_id asc`,
      function (error, results, fields) {
        if (error) throw error;

        return res
          .status(200)
          .send({ error: false, message: "category list", data: results });
      }
    );
  } catch {
    return res.status(401).send();
  }
};


module.exports = {
    getCategories
  };
  