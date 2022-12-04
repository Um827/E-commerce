const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError=require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apiFeatures")
//Create Product---Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user=req.user.id

        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            product
        })
    
    }
) 

//Get All Products

exports.getAllProducts = catchAsyncError( async (req, res) => { 
    const resultPerPage=10
    const productCount =await Product.countDocuments()
const apiFeatures= new ApiFeatures(Product.find(),req.query)
.search()
.filter()
.pagination(resultPerPage)

    const products = await apiFeatures.query
    res.status(201).json({
        success: true,
        products,
        productCount
    })
})

//Update,Edit the Products  --Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        returnnext(new ErrorHandler("Product not found",500))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
         useFindAndModify: false 
        });
        res.status(200).json({
            success: true,
            product
        })
})

//Delete the Products  --Admin
exports.deleteProduct =catchAsyncError( async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found",500))
    }
    product = await product.remove()
        res.status(200).json({
            success: true,
            message:"Product deleted sucessfully"
        })
})

//Get Specific Product Details
exports.getProductDetails=catchAsyncError( async (req, res, next) => {
    //console.log(req.params.id);
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("Product not found",500))
    }

    res.status(200).json({
        success: true,
        product
    })

}) 


// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.noOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });


  // Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });

  // Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  

