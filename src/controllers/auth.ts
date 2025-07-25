import { RequestHandler } from 'express';
import { authSigninSchema } from '../schemas/auth-signin';
import { createUser, getUserByEmail } from '../services/user';
import { genereteOTP, validadeOTP } from '../services/otp';
import { sendemail } from '../libs/mailtrap';
import { authSignUpSchema } from '../schemas/auth-singup';
import { authUseOTPshema } from '../schemas/useotp';
import { validate } from 'uuid';
import { create } from 'domain';
import { createJWT } from '../libs/jwt';
import { id } from 'zod/locales';


export const signin: RequestHandler = async (req, res) => {
  const data = authSigninSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten().fieldErrors });
  }

  const user = await getUserByEmail(data.data.email);
  if (!user) {
    return res.status(404).json({ error: { email: 'User not found' } });
  }

  const otp = await genereteOTP(user.id);

  await sendemail(
    user.email,
    'Your OTP Code',
    `Your OTP code is: ${otp.code}`
  );

  return res.status(200).json({ id: otp.id });
};

export const signup: RequestHandler = async (req, res) => {
  const data = authSignUpSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten().fieldErrors });
  }

  const user = await getUserByEmail(data.data.email);
  if (user) {
    return res.status(409).json({ error: 'Já existe usuário com esse e-mail' });
  }

  const newUser = await createUser(
    data.data.name,
    data.data.email,
    data.data.password
  );

  return res.status(201).json({ user: newUser });
};

// --------------------------------------------------------------  //

export const useOtp : RequestHandler = async (req, res) => { 

// validando os dados recebidos pela OTP
const data = authUseOTPshema.safeParse(req.body);

if (!data.success) {
  return res.status(400).json({
    error: data.error.flatten().fieldErrors
  });
}

// Validação do OTP
const user = await validadeOTP(data.data.id, data.data.code);
if (!user) {
  return res.status(401).json({ error: 'OTP inválido ou expirado' }); // melhor com status 401
}

//  Criação do token de autenticação
const token = createJWT(user.id); // user precisa ter um `id`

// ✅ Resposta com token e dados do usuário
res.json({ token, user });

}




