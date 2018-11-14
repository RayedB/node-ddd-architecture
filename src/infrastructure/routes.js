import { Router } from 'express';
import UserController from '../interfaces/controllers/users.controller'

const router = new Router();

//Auth routes
router.post('/auth/register', (req, res) => {
    res.status(200).json({message:"register"})
});

router.post('/auth/login', (req, res) => {
    res.status(200).json({message:"login"})
});

// UserController
router.post('/user/create', (req,res) => {
    const userController = new UserController(req)
    userController.createUser()
    res.send("ok")
})

// Protected routes

router.all('/api/*', requireAuthentication)

router.post('/api/hello', (req,res) => {
    console.log("hello")
    res.send("hello")
})

function requireAuthentication(req,res,next){
    return next()
}

export default router;