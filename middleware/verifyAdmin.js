function isAdmin(role) {
  return (req, res, next) => {
    if (req.user.role == role) {
      next();
    } else {
      res.json({ user: "INVALID" });
    }
    console.log(req.user.role);
    console.log("user", role);
  };
}

module.exports = isAdmin;
