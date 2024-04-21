const {Router}=require('express');
const router=Router();

const userController=require('../Controllers/user');

router.post('/signup',userController.signup);
router.post('/login',userController.login);

module.exports=router;