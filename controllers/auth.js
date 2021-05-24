const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Register User
// @route       GET /api/v1/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
