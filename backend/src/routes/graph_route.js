import express from 'express';
import {get_tree} from "../controllers/graph_controller.js";


const router = express.Router();


router.get('/', get_tree);

export default router;