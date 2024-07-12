import express, { Application } from 'express'
import userRouter from '../routers/users/user.router';
import connectDb from './db.config'
import errorHandler from '../middlewares/errorHandler.middleware';
import reservationRouter from '../routers/reservations/reservation.router';

const app : Application = express()

connectDb()

app.use(express.json())
app.use('/api',userRouter)
app.use('/api',reservationRouter)
app.use(errorHandler)

export default app;


