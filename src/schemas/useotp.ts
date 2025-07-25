import { z } from 'zod';

export const authUseOTPshema = z.object({
  id : z.string({ message: 'ID do OTP e obrigatorio' }),
  code : z.string().length(6, { message: 'O código OTP deve ter exatamente 6 caracteres' }),
})