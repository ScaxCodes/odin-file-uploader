function f(req, res, next) {
  // Your code here
  console.log("Function executed");
  next();
}

module.exports = {
  f,
};
