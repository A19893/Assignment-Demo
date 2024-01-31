const router= require("express").Router();

router.use("/users",require('./user_route'))

module.exports = router;