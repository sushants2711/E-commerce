import expres from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { productMiddleWareValidation } from "../middleware/productMiddleWare.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { ensureAuthentication } from "../middleware/userAuth.js";

const productRouter = expres.Router();

productRouter.route("/add").post( adminAuth, upload.fields([
    productMiddleWareValidation, 
    {name: 'image1', maxCount:1},
    {name: 'image2', maxCount:1},
    {name: 'image3', maxCount:1},
    {name: 'image4', maxCount:1}]),
    addProduct)

productRouter.route("/remove").post(adminAuth, removeProduct)
productRouter.route("/single").post( ensureAuthentication, singleProduct)
productRouter.route("/list").get(ensureAuthentication, listProducts)

export default productRouter