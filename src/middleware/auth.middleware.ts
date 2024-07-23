import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.models';

const secretKey = 'your_secret_key';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      if (decoded?.email) {
        const user = await User.findOne({ where: { email: decoded.email } });

        if (user) {
          req.user = {
            id: user.id,
            email: user.email,
          };
          next();
        } else {
          res.status(401).json({ error: 'User not found' }); 
        }
      } else {
        res.status(403).json({ error: 'Invalid token' }); 
      }
    } catch (err) {
      res.status(403).json({ error: 'Failed to authenticate token' }); 
    }
  } else {
    res.status(401).json({ error: 'No token provided' }); 
  }
};

export default authenticateJWT;
