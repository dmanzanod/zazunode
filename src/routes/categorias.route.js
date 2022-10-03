import  Router  from "express";
import { methods as categoriacontroller} from "./../controllers/categoria.controller.js";

const router = Router();

router.get("/", categoriacontroller.getCateoria);
router.get("/:nombre", categoriacontroller.getProducto);
router.get("/formato/:nombre", categoriacontroller.getFormato);
export default router;