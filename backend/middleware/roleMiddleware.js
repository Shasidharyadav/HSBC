const roleMiddleware = (requiredRole) => (req, res, next) => {
  const { role } = req.user;
  if (role !== requiredRole) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = roleMiddleware;
