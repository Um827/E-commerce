const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncErrors")
const User = require("../models/userModel")
const sendToken = require("../utils/jwtToken")
const { options } = require("../app")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

//register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {

    let { name, email, password } = req.body
    // name = name["name"]
    // email = email["email"]
    // password = password["password"]
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl"
        }
    })

    sendToken(user, 201, res)
})


//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user)
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler(" password no match", 401));
    }

    sendToken(user, 200, res);
})

//Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })


    next(new ErrorHandler("Logout", 200))
})


//Forget Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    //Get resetPasswordToken
    const resetToken = user.getResetPasswordToken()
    console.log("resetToken", resetToken)

    await user.save({ validateBeforeSave: false })
    const resetPasswordUrl = await `${req.protocol}://${req.get("host")}/api/v1/password/reset/${await resetToken}`
    console.log("resetPasswordUrl", resetPasswordUrl);
    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have 
not requested this email then, please ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))


    }

})

//Reset Password

exports.resetPassword = catchAsyncError(async (req, res, next) => {

    //Creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler("Reset Token Password is invalid or has been expired", 404))
    }
    console.log("user", user, req.body.password,);
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password unmatched", 404))

    }
    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    // console.log("user.password", user.password);
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    sendToken(user, 200, res)
})

//Get user Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

//update user Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("old password is incorrect", 401));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler(" password does not match", 401));

    }
    user.password = req.body.newPassword

    await user.save()
    sendToken(user, 200, res)
})

//update user Peofile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })
    res.status(200).json({
        success: true
    })


})

//get all users 
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users,
    })


})

//get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(res.params.id)
    if (!user) {
        return next(new ErrorHandler(`user does not exist with id: ${res.params.id}`))
    }
    console.log(user);
    res.status(200).json({
        success: true,
        user,
    })


})


// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});



//update user role --Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "User deleted Sucessfully"
    })


})

//Delete user --Admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`))
    }

    await user.remove()
    res.status(200).json({
        success: true
    })


})




