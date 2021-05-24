const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get All Courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      Public

exports.getCourses = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  if (bootcampId) {
    const courses = await Course.find({ bootcamp: bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc        Get A single Course
// @route       GET /api/v1/courses/:id
// @access      Public

exports.getCourse = asyncHandler(async (req, res, next) => {
  course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No Course with the id of ${req.params.id} found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc        Add a Course
// @route       POST /api/v1/bootcamps/:bootcampId/courses
// @access      Private

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No Bootcamp with the id of ${req.params.id} found`,
        404
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc        Update a Course
// @route       PUT /api/v1/Courses/:id
// @access      Private

exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No Course with the id of ${req.params.id} found`, 404)
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc        Delete a Course
// @route       DELETE /api/v1/Courses/:id
// @access      Private

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No Course with the id of ${req.params.id} found`, 404)
    );
  }
  await course.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
