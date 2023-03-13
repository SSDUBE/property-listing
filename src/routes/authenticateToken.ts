import {Response, NextFunction, Request} from 'express';
import jwt from 'jsonwebtoken';
import { AUTH } from '../utils/globals';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
  isValidateRoute?: boolean
) => {
  const authHeader = req.headers.authorization;
  console.log('authHeader ', authHeader)
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, AUTH.secrete, (err: any, user: any) => {
      if (err) {
        return res.status(401).json({message: 'Token has any invalid subject'});
      }
      // @ts-ignore
      req.user = user;
      if (isValidateRoute) res.send();
      return next();
    });
  }

  return res.status(401).json({message: 'Missing authorization token'});
};