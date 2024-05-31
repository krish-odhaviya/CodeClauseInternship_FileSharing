const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    console.log(err);
    const error = {
      status: 500,
      message: "Fill the details properly",
      extraDetailes: err.issues[0].message,
    };

    next(error);
  }
};

module.exports = validate;
