import handleLogin from "../controllers/loginController";
import express from "../server";
const router = express.Router();

router.route("/").post(handleLogin);

module.exports = router;
