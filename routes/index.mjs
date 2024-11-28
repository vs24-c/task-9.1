import { Router } from "express";
import Controller from "../controller/productsController.mjs";

const router = Router();
router.get("/", (req, res) => {
  res.render("index", {title: "Main Phone"});
});

router.post('/login',
  Controller.addSession);

export default router;
