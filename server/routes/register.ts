import handleRegister from "../controllers/registerController";
import express from "../server";
const router = express.Router();

router.route("/").post(handleRegister);

module.exports = router;
