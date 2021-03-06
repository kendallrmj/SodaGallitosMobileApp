import { Router } from "express";
import {
  getOrders,
  saveOrder,
  deleteOrder,
  getTable,
  getTables,
  getExtras,
  getDishes,
  login
} from "../controllers/mobileApp.js";


const router = Router();

//orders
router.get("/orders/:id", getOrders);
router.post("/orders", saveOrder);
router.delete("/orders/:id", deleteOrder)
//tables
router.get("/tables", getTables);
router.get("/tables/:id", getTable);
//dishes
router.get("/dishes", getDishes);
//extras
router.get("/extras", getExtras);
//Login
router.post("/login",login);
export default router;
