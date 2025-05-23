import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';

const app = express();

app.use(cors({
    origin: '*',
}));

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_auth'
});

const RECAPTCHA_SECRET_KEY = '6LcrER0qAAAAAJy3MYoIJAkOyYrXVbqUvDwyIYt7';

const verifyEmail = async (email) => {
    const response = await fetch(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=2b128fe9b07451039432d4b5d9d4d25580ca901e`);
    const data = await response.json();
    return data.data.status === 'valid';
};

const verifyRecaptcha = async (token) => {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    });
    const data = await response.json();
    return data.success;
};

app.post('/signup', async (req, res) => {
    const checkEmailSql = "SELECT * FROM login WHERE email = ?";
    const insertSql = "INSERT INTO login (name, email, password) VALUES (?)";
    const { name, email, password, captchaToken } = req.body;

    try {
        // Log request body
        console.log('Signup request body:', req.body);

        // Verify CAPTCHA
        const isHuman = await verifyRecaptcha(captchaToken);
        if (!isHuman) {
            return res.json({ success: false, message: "Captcha verification failed. Please try again." });
        }

        // Verify email
        const isEmailValid = await verifyEmail(email);
        if (!isEmailValid) {
            return res.json({ success: false, message: "Email does not exist" });
        }

        db.query(checkEmailSql, [email], async (err, result) => {
            if (err) {
                console.error('Database query error:', err);
                return res.json({ success: false, message: "Database error. Please try again later." });
            }
            if (result.length > 0) {
                return res.json({ success: false, message: "Email already exists in the database" });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const values = [name, email, hashedPassword];
                db.query(insertSql, [values], (err, data) => {
                    if (err) {
                        console.error('Database insertion error:', err);
                        return res.json({ success: false, message: "Database error. Please try again later." });
                    }
                    return res.json({ success: true, message: "User registered successfully" });
                });
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.json({ success: false, message: "Error verifying email" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password, captchaToken } = req.body;

    try {
        // Verify CAPTCHA
        const isHuman = await verifyRecaptcha(captchaToken);
        if (!isHuman) {
            return res.json({ success: false, message: "Captcha verification failed. Please try again." });
        }

        const sql = "SELECT * FROM login WHERE email = ?";
        db.query(sql, [email], async (err, data) => {
            if (err) return res.json(err);
            if (data.length > 0) {
                const validPassword = await bcrypt.compare(password, data[0].password);
                if (validPassword) {
                    return res.json({ success: true, message: "Login successful" });
                } else {
                    return res.json({ success: false, message: "Invalid credentials, please try again" });
                }
            } else {
                return res.json({ success: false, message: "Invalid credentials, please sign up first" });
            }
        });
    } catch (error) {
        return res.json({ success: false, message: "An error occurred. Please try again." });
    }
});


app.listen(8019, '0.0.0.0', () => {
    console.log("listening on port 8019...");
});
