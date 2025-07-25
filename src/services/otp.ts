import {prisma} from '../libs/prisma';
import { v4 as uuid } from 'uuid'



export const genereteOTP = async (userId: number) => {
  // Generate a random 6-digit OTP
    let opt : number[] = [];
    for (let i = 0; i < 6; i++) {
        opt.push(Math.floor(Math.random() * 9));
    }

    let code = opt.join('');
    let expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const otp = await prisma.otp.create({
      data : {
        id : uuid(),
        code,
        userId, 
        expiresAt
      }
    });
    return otp;
}

export const validadeOTP = async (id: string, code: string) => {
  const otp = await prisma.otp.findFirst({
    where: {
      id, code,
      expiresAt: {
        gt: new Date(), // check de temporalidade do OTP
      },
      used: false
    }
  });

  if(otp && otp.used) {
    await prisma.otp.update({
      where: {id},
      data: { used: true }
    });

    return otp.used;
  }

  return false;
}