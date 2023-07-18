// Express
import { Router } from "express";
// Controllers
import { getItemDetail, getItems } from "../../controllers";

const router = Router();

router.get("/api/items", getItems);
router.get("/api/items/:id", getItemDetail);

export default router;
