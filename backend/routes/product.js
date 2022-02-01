const express = require('express');
const router = express.Router();

const { getProducts,
        getAdminProducts,
        newProduct, 
        getSingleProduct, 
        updateProduct,
        deleteProduct,
        createProductReview,
        getProductReviews,
        deleteReview,
        createPromoCode,
        getRelatedProducts
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/relatedproducts').get(getRelatedProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route('/admin/product/:id')
                .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
                .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

//! My route
router.route('/admin/promo').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)

module.exports = router;