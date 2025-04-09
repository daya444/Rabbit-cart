import { Product } from "../model/productModel.js";
import { Cart } from "../model/cartModel.js";
import { protect } from "../middlewares/authMiddleware.js";



//post the cartproduct 
//access by public

const getUser = async (guestId, userId) => {
    if (userId) {
        return await Cart.findOne({ user: userId })

    } else if (guestId) {
        return await Cart.findOne({ guestId: guestId })
    }
    return null;

}

export const postCart = async (req, res) => {



    const { guestId, userId, productId, size, color, quantity } = req.body;

    try {
        const product = await Product.findById(productId)

        if (!product) {
            res.status(404).json({ message: "product not found" })
        }

        //let know it is guest or user

        let cart = await getUser(guestId, userId)


        if (cart) {
            const productIndex = cart.products.findIndex((p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color

            )

            //already the cart is theren we need to update
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                //add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                })
            }

            cart.totalPrice = cart.products.reduce((acc, items) => acc + items.price * items.quantity, 0)
            await cart.save()
            res.status(200).json(cart)
        } else {
            // create new cart

            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity

                    }
                ],
                totalPrice: product.price * quantity

            })

            return res.status(201).json(newCart)
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({ message: " server error" })
    }

}

export const updateCart = async (req, res) => {

    const { guestId, userId, productId, size, color, quantity } = req.body;

    try {

        let cart = await getUser(guestId, userId)


        if (cart) {
            const productIndex = cart.products.findIndex((p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color

            )

            if (productIndex > -1) {
                //update the quantity
                if (quantity > 0) {
                    cart.products[productIndex].quantity = quantity
                } else {
                    cart.products.splice(productIndex, 1)
                }

                cart.totalPrice = cart.products.reduce((acc, items) => acc + items.price * items.quantity, 0)
                await cart.save();
                res.status(200).json(cart)
            } else {
                return res.status(404).json({ message: "product not found in cart" })
            }
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })

    }


}

export const deleteCart = async (req, res) => {

    const { userId, guestId, productId, size, color } = req.body
    console.log("Received body:", req.body)


    try {
        let cart = await getUser(guestId, userId)

        if (!cart) return res.status(404).json({ message: "cart not found" })

        if (cart) {
            const productIndex = cart.products.findIndex((p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color

            )

            if (productIndex > -1) {
                cart.products.splice(productIndex, 1)


                cart.totalPrice = cart.products.reduce((acc, items) => acc + items.price * items.quantity, 0)
                await cart.save();
                res.status(200).json(cart)
            }
        } else {
            return res.status(404).json({ message: "product not found in cart" })
        }




    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })


    }
}


//get cart details
export const getCart = async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        let cart = await getUser(guestId, userId)

        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({ message: "cart not found" })
        }

    } catch (error) {

        console.error(error)
        res.status(500).json({ message: " server error" })
    }
}

//merge the guest user

export const mergeGuestCart = async (req, res) => {

    const { guestId } = req.body;


    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                res.status(400).json({ message: "guest cart empty" })
            }

            if (userCart) {
                //merge the guestcart into user cart
                guestCart.products.forEach((guestItems) => {
                    const productIndex = userCart.products.findIndex(
                        (items) =>
                            items.productId.toString() === guestItems.productId.toString() &&
                            items.size === guestItems.size &&
                            items.color === guestItems.color
                    )


                    if (productIndex > -1) {
                        // if items exist in the usercart then update the cart quantity
                        userCart.products[productIndex].quantity += guestItems.quantity
                    } else {
                        //otherwise add the guestitem to the cart
                        userCart.products.push(guestItems)
                    }
                })

                userCart.totalPrice = userCart.products.reduce((acc, items) => acc + items.price * items.quantity, 0)

                await userCart.save();

                //remove the guestcart after removing 

                try {
                    await Cart.findOneAndDelete({ guestId })
                } catch (error) {
                    console.error("Error while deleting the guestcart", error)
                }
                res.status(200).json(userCart)
            } else {
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save()

                res.status(200).json(guestCart)

            }

        } else {
            if (userCart) {
                //guestcart has been already merged

                return res.status(200).json(userCart)
            }
            res.status(400).json({ message: "guest cart not found" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "server error" })

    }

}