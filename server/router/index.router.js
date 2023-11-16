import { Router } from "express";
import { Pool } from "../db.js";

const router = Router();


router.get('/ping', async (req,res) => {
   const [rows ]= await Pool.query('SELECT 1 + 1 as result')
   console.log(rows)
   res.json(rows)
})

export default router;
