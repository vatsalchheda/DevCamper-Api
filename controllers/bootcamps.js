// @desc        Get All Bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

// @desc        Get a single Bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get bootcamp ${req.params.id}` });
};

// @desc        Create a Bootcamp
// @route       POST /api/v1/bootcamps/
// @access      Private

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamp' });
};

// @desc        Update a Bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Private

exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a bootcamp ${req.params.id}` });
};

// @desc        Delete a single Bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Private

exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a bootcamp ${req.params.id}` });
};
