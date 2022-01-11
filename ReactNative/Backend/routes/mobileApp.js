import { Router } from "express";
import {
  getOrders,
  saveOrder,
  deleteOrder,
  getTable,
  getTables,
  getExtras,
  getDishes
} from "../controllers/mobileApp.js";


const router = Router();

//orders
router.get("/orders", getOrders);
router.post("/orders", saveOrder);
router.delete("/orders/:id", deleteOrder)
//tables
router.get("/tables", getTables);
router.get("/tables/:id", getTable);
//dishes
router.get("/dishes", getDishes);
//extras
router.get("/extras", getExtras);

export default router;
