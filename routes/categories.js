const router = require('express').Router();
const categoriesController = require('../controllers/categoriesController');
const verify  = require('../middleware/jwtMiddleware').verify;

router.route('/')
    .get(verify,categoriesController.getCategories)

module.exports = router;