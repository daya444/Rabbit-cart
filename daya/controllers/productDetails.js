
import { Product } from "../model/productModel.js";


// creating the product 
export const productDetails = async(req, res) => {

   
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
    
            tags,
            dimensions,
            weight,
    
        } = req.body

         const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            user: req.user._id
         })

         const createdProduct = await  product.save()

         res.status(201).json({createdProduct})

    }catch (err){
        
        res.status(500).send("server error")
    }
}


// upadting the product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body; // Extracting updated fields from request body

        // Find the product by ID and update it with new data
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            updatedData, 
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);

    } catch (err) {
        console.error("Update Product Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

//deleting  the product

export const deleteProduct = async(req,res)=>{
    try {
        const { id} = req.params

        const deleteProduct = await Product.findByIdAndDelete(id)
        if (deleteProduct){
             await deleteProduct.deleteOne()
             res.json({message :"product removed"})
        }else {
            res.status(404).json({message : "product not found"})
        }
    }catch ( err){
        console.log(err)
        res.status(500).json({message : " server error"})
    }
}

//get  api/products 
// products according to the query filters


export const  filteredProducts = async (req,res)=>{
    console.log("daya",req.query)

   try {
    const {collections,sizes,colors,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit} = req.query

    let query ={}

    //filter logic

    if(collections && collections.toLocaleLowerCase() !== "all"){
        query.collections = collections
    } 
    if(category && category.toLocaleLowerCase() !== "all"){
        query.category = category
    } 
    if(material){
        query.material = {$in: material.split(",")}
    }
    if(brand){
        query.brand = {$in: brand.split(",")}
    }
    if(sizes){
        query.sizes = {$in: sizes.split(",")}
    }
    if (colors) {
        query.colors = { $in: colors.split(",").map(color => color.trim()) };
    }
   if (gender){
    query.gender =gender
   }

   if (minPrice || maxPrice) {
    query.price = {};  
    if (minPrice && !isNaN(minPrice)) query.price.$gte = Number(minPrice);
    if (maxPrice && !isNaN(maxPrice)) query.price.$lte = Number(maxPrice);
}



if (search) {
    query.$or = [
        { name: { $regex: search, $options: "i" } }, 
        { description: { $regex: search, $options: "i" } }
    ];
}

console.log("Final Query:", JSON.stringify(query, null, 2));


let sort = {}
if(sortBy){
    switch (sortBy){
        case "priceAsc":
             sort = {price :1}
             break;
        case "priceDesc":
            sort ={price :-1}
            break  
        case "popularity":
            sort ={rating : -1}   
            break;
            
            default :
            break
    }
}

let product = await Product.find(query).sort(sort).limit(Number(limit)|| 0)

 res.json(product)

    
   } catch (error) {
     console.log(error)
     res.status(500).json({message : " server error"})
   }




}


// to get single product
export const singleProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
 
      if (product) {
         res.status(200).json(product); 
      } else {
         console.error("Product not found");
         res.status(404).json({ message: "Product not found" }); 
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" }); 
    }
 };

 // to get similar product

 export const similarProduct = async(req,res)=>{
    const {id} = req.params

    try{
         const product = await Product.findById(id)
         if (!product) {
            res.status(400).json({message : "product not found"})
         }

         const similarItems = await Product.find({
            _id :{$ne : id}, //exclude current product
            category : product.category,
            gender :product.gender
         }).limit(4)

         res.json(similarItems)

    }catch(err){
        console.log(err)
        res.status(500).json({message : "Server Error"})

    }
   

 }

 //best seller
 
export const bestSeller = async (req, res) => {
    try {
        
        const topProducts = await Product.findOne()
            .sort({ rating: -1 })
           
      if (topProducts){
        res.status(200).json(topProducts);
      }else {
        res.status(404).json({ message:"No best seller found"})
      }
       
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
 

// new arrivals

export const newArrivals =async (req,res)=>{
      try {
        const newArrival = await Product.find().sort({
            createdAt : -1
        }).limit(8)
       
        res.json(newArrival)

      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error: error.message });
        
      }
}




