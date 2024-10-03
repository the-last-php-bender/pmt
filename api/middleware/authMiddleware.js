import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
class AuthMiddleware {
  static authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        StatusCode: 401,
        message: "Unauthorized"
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          StatusCode: 403,
          message: "Forbidden"
        });
      }

      if (decoded.role === 'company') {
        req.company = decoded;
      } else if (decoded.role === 'user') {
        req.user = decoded;
      } else {
        return res.status(401).json({
          StatusCode: 401,
          message: "Unauthorized"
        });
      }
      next();
    });
  }
}
export default AuthMiddleware;
