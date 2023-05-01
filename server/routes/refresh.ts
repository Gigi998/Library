import refreshTokenController from "../controllers/refreshTokControllers";
import express from "../server";
const router = express.Router();

router.get("/", refreshTokenController);

module.exports = router;
