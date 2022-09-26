const User = require('../models/user');

exports.getStatus = (req, res, next) => {
    // console.log(userId);
    User.findById(req.userId)
    .then(user => {
        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error;
        }
        const status = user.status;
        res.status(200).json({
            message: 'Status found successfully',
            status: status
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateStatus = (req, res, next) => {
    const updatedStatus = req.body.status;
    User.findById(req.userId)
    .then(user => {
        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error;
        }
        user.status = updatedStatus;
        return user.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Updated Status Successfully'
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};