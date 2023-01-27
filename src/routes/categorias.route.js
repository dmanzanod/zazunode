import  Router  from "express";
import { methods as categoriacontroller} from "./../controllers/categoria.controller.js";

const router = Router();

router.get("/", categoriacontroller.getCateoria);
router.get("/:nombre", categoriacontroller.getProducto);
router.get("/formato/:nombre/:nuevo", categoriacontroller.getFormato);
router.get("/categorias/:nombre", categoriacontroller.getProductosCat);
router.get("/despacho/:nombre", categoriacontroller.getDespacho);
router.get("/comunas/:nombre", categoriacontroller.getComunas);
router.get("/oferta/:nombre", categoriacontroller.getProductoOferta);
export default router;