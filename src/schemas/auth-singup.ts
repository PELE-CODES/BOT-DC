import { z } from 'zod';

export const authSignUpSchema = z.object({
  name: z.string().nonempty({ message: 'Campo nome é obrigatório' }),
  email: z.string().nonempty({ message: 'Campo email é obrigatório' }).email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
});