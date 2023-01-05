const router = require("express").Router();
const authUser = require("./authUser");

router.use(authUser);

module.exports = router;
