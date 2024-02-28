const { Router } = require("express");
const router = Router();

const {
   loginUser
} = require("../controller/login.controller");

router.get("/", (req, res) => {
   res.send("LittleBox");
});

router.post("/login", loginUser);

module.exports = router;