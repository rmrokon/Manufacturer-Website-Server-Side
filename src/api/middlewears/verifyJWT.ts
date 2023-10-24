import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
const jwt = require("jsonwebtoken");

interface DecodedToken {
  username: string
  email: string
}

const verifyJWT = (req: Request & {decoded?: DecodedToken}, res: Response, next: NextFunction) => {
    const { JWT_SECRET } = process.env;
    const authHeader = req.headers.authorization;
    const token = authHeader!.split(" ")[1];
    if (!authHeader) {
      res.status(401).send({ message: "Unauthorized access" });
    }
    jwt.verify(token, JWT_SECRET, (err: JsonWebTokenError, decoded: DecodedToken) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
      req.decoded = decoded; 
      next();
    });
};

module.exports = verifyJWT;