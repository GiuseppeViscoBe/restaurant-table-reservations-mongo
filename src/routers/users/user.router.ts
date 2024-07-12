import express from "express";
import userController from './user.controller'

const userRouter = express.Router()

//userRouter.get('/user', userController.getUsers)
userRouter.post('/users', userController.createUser)


export default userRouter