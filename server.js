

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());


app.post('/api/referrals', async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;
    const newReferral = await prisma.referral.create({
      data: {
        name,
        email,
        phone,
        course,
        message,
      },
    });
    res.status(201).json({ message: 'Referral saved successfully', referral: newReferral });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/referrals', async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.status(200).json(referrals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
