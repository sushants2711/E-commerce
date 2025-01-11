import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";


// function for add the product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subcategory, sizes, bestseller, brand } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        const image5 = req.files.image5 && req.files.image5[0]
        const image6 = req.files.image6 && req.files.image6[0]

        const images = [image1, image2, image3, image4, image5, image6].filter((item) => item !== undefined)

        let imagesurl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'auto',
                    quality: 'auto:low'
                });
                return result.secure_url;
            })
        )

        const newproductData = new productModel({
            name,
            description,
            price,
            category,
            subcategory,
            sizes: JSON.parse(sizes),
            bestseller,
            brand,
            image: imagesurl,
            date: Date.now()
        })
        await newproductData.save();
        return res
            .status(201)
            .json({ success: true, message: "Product added successfully" })

    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ success: false, message: "Internal Server error" })
    }
}


// function for list all the product
export const listProducts = async (req, res) => {
    try {
        const product = await productModel.find({})
        if (product.length <= 0) {
            return res
                .status(400)
                .json({ success: false, message: "No products available" })
        }
        return res
            .status(200)
            .json({ success: true, product })

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" })
    }
}



// function for remove the product
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const productFind = await productModel.findById(id)
        if(!productFind){
            return res
            .status(400)
            .json({ success: false, message: "Product not found"})
        }
        // await Promise.all(
        // productFind.filter(async (currimage) => {
        //         await cloudinary.uploader.destroy(currimage.image);
        //     })
        // );
        console.log(productFind)
        await productModel.findByIdAndDelete(id)
        return res
        .status(200)
        .json({ success: true, message: "Product deleted"})

    } catch (error) {
        return res
        .status(400)
        .json({ success: false, message: "Internal server error"})
    }
}



// function for single product info
export const singleProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const productFind = await productModel.findById(id)
        if (!productFind) {
            return res
                .status(400)
                .json({ success: false, message: "Product not listed" })
        }
        return res
            .status(200)
            .json({ success: true, productFind })

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" })
    }

}