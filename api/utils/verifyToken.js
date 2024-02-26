import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyUserToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden || token is not valid'));

    req.user = user;
    next();
  });
};

export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err) return next(errorHandler(403, 'Forbidden || token is not valid'));

    if (!admin.isAdmin) return next(errorHandler(403, 'Forbidden || user is not an admin'));

    req.admin = admin;
    next();
  });
};
