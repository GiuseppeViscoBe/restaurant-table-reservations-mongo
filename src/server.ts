import express from 'express'
import app from './config/app'
import dotenv from 'dotenv';

dotenv.config();

const PORT : Number = Number(process.env.PORT) || 8000

app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT)
})
