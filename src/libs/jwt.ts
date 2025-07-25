import  jwt  from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/extends";

export const createJWT = (id: number | string) => {
  return jwt.sign({ id },  process.env.JWT_SECRET as string, {
    expiresIn: "1h" // ou "7d", conforme sua regra de expiração
  });
};


export const verifyJWT = async (req:ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token, 
        process.env.JWT_SECRET as string, 
        (err, decoded) => {
            if(err) {
                return res.status(403).json({ message: "Token inválido" });
            }
            req.userid = (decoded as { id: number | string }).id; // Atribui o ID decodificado ao req.userid
            next();
        }
    )
}