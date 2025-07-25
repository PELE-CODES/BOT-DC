import { Router } from "express";
import * as pingController from "../controllers/ping.js";
import * as authController from "../controllers/auth.ts";
import * as privateContreoller from "../controllers/private.ts";
import { verifyJWT } from "../libs/jwt.ts";

export const mainRouter = Router();
mainRouter.get('/ping', pingController.ping);

mainRouter.post('/auth/login', authController.signin);
mainRouter.post('/auth/signup', authController.signup);

mainRouter.post('auth/USEotp', authController.useOtp);

mainRouter.get('/private', verifyJWT, privateContreoller.test);

