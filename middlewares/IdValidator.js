const validateId = (req, res, next, val) => {
  const id = parseInt(val);
  if (isNaN(id)) {
    res.status(404);
    res.json({ error: "The provided id is not a number" });
  } else {
    req.id = id;
  }
  next();
};

module.exports = validateId;
