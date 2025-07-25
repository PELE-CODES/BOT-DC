import {z}  from "zod";


export const authSigninSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Campo email é obrigatório' })
    .email({ message: 'E-mail deve ser um endereço válido' }),
});
