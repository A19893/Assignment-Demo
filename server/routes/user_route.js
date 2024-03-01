const { user_controller } = require("../controllers");
const auth_checker = require("../middlewares/auth_checker");
const existing_session = require("../middlewares/exisitng_session");

const router= require("express").Router();

router.post('/', user_controller.create_user);
router.post('/login', existing_session, user_controller.login_user);
router.patch('/otp/:id',user_controller.submit_otp)
router.get('/sessions/:id',auth_checker,user_controller.get_sessions);
router.delete('/logout',auth_checker,user_controller.logout_user);
module.exports=router;