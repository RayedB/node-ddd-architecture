import { Router } from 'express';
import AuthorizationController from '../interfaces/controllers/authorization.controller';
import requireAuth from '../interfaces/security/authGuard';

const router = new Router();

//Auth routes
router.post('/auth/register', async (req, res) => {
    const authController = new AuthorizationController();
    await authController.createUser(req.body)
        .then((creation) => {
            res.status(creation.code).json({message:creation.message})
        })
        .catch((err)=>{
            console.log(err)
        })
    
});

router.post('/auth/login', async (req, res) => {
    const authController = new AuthorizationController();
    const authentication = await authController.authenticateUser(req.body)
    if (authentication) {
        res.status(200).json(authentication)
    }
});

router.get('/auth/confirm', async (req,res)=> {
    const authController = new AuthorizationController();
    const confirmation = await authController.confirmUser(req)
    if (confirmation) {
        res.status(confirmation.code).json({message:confirmation.message})
    }
})

// Protected routes
router.get('/api/protected',requireAuth,async (req,res)=>{
    res.status(200).json({message:"in protected route"})
})

// router.get('/messages', (req,res)=>{
//     res.status(200).json({message:"ok"})
// })

export default router;