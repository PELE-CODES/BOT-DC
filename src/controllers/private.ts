import { Response } from "express";
import { ExtendedRequest } from "../types/extends";
import { getUserById } from "../services/user";

export const test = async (req: ExtendedRequest, res: Response) => {
if(!req.userid) {
    res.status(401).json({ message: "Usuário não autenticado" });
} 

 const user = await getUserById(req.userid);
 if(!user) {
   res.status(401).json({ message: "Usuário não encontrado" });
   return
 }

 res.json({ user });
  
}