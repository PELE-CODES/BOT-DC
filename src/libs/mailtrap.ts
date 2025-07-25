import { MailtrapClient } from "mailtrap"
import { text } from "stream/consumers";
import { email } from "zod";

export const sendemail = async (to: string, subject: string, body: string) => {
  const mailtrap = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN as string,
    testInboxId: 3911982 // Replace with your actual inbox ID
  });

  try {
    await mailtrap.send({
      from: { name: 'sistema' , email: 'sistema@gamil.com'},
      to: [{ email: to }],
      subject,
      text: body,
    });
    return true
  }catch(err) {
    return false;
  }
}