class RoleMiddleware {
  static checkRole(roles) {
    return (req, res, next) => {
      const { user, company } = req;
      if (user) {
        if (user.role===roles) {
          return next();
        }
        return res.status(403).json({ error: `Forbidden: Only ${userRoles} can access this resource` });
      }

      if (company) {
        if (company.role===roles) {
          return next();
        }
      }
      return res.status(401).json({ error: 'Not authenticated' });
    };
  }
}

export default RoleMiddleware;
