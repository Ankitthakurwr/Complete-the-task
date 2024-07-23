import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.models';

const secretKey = 'Ankit'; 

class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
            const user = await User.findOne({ where: { email } });

      if (user) {
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (isPasswordValid) {
          const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async createUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({ email, password: hashedPassword });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
}

export default new AuthController();
