import resend from "../lib/resend";

type MailParams = {
    from: string;
    to: string;
    subject: string;
    html: string;
};

export const sendMail = ({ from, to, subject, html }: MailParams) => {
    return resend.emails.send({
        from: "onboarding@resend.dev",
        to: "delivered@resend.dev",
        subject: subject,
        html: html,
    });
};
