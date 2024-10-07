import resend from "../lib/resend";
import { NODE_ENV, SENDER_EMAIL } from "../const/env";

type MailParams = {
    to: string;
    text: string;
    subject: string;
    html: string;
};

const getEmailFrom = () =>
    NODE_ENV === "development" ? "onboarding@resend.dev" : SENDER_EMAIL;
const getEmailTo = (to: string) =>
    NODE_ENV === "development" ? "delivered@resend.dev" : to;

export const sendMail = async ({ to, text, subject, html }: MailParams) => {
    return await resend.emails.send({
        from: getEmailFrom(),
        to: [getEmailTo(to)],
        text: text,
        subject: subject,
        html: html,
    });
};
