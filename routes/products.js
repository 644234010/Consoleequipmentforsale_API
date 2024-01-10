const router = require('express').Router();
const productsController = require('../controllers/productsController');
const verify  = require('../middleware/jwtMiddleware').verify;

router.route('/')
    .get(verify,productsController.getProducts)
    
    
router.route('/:productid/')
    .get(verify,productsController.getProductById)

router.route('/picture/:productid/:colorid/')
    .get(productsController.getProductPicture)

module.exports = router;