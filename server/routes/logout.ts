import handleLogout from "../controllers/logoutController";
import express from "../server";
const router = express.Router();

router.route("/").get(handleLogout);

module.exports = router;
