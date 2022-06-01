const router=require("express").Router()
const prisma=require("../Client/prisma")
const {ordertValidator}=require("../Validator/orders")
const {validationResult}=require("express-validator")

router.post("/",ordertValidator,async (req,res)=>
{
    const errors=validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: errors.array() });
    }
    const body=req.body
    console.log(body);
    const user=await prisma.user.findUnique({
        where:
        {
            id:body.userId
        }
    })
    if (!user)
    {
        return res.status(404).json({status:"user with this id does not exist"})
    }
    const product=await prisma.products.findUnique({
        where:
        {
            id:body.itemId
        }
    })
    if (!product)
    {
        return res.status(404).json({status:"product with this id does not exist"})
    }
    else if (!product.quantity>0)
    {
        return res.status(400).json({status:"product out of stock"})
    }
    product.quantity-=1
    console.log(product);
    await prisma.products.update({
        where:
        {
            id:product.id
        },
        data:
        {
           quantity:product.quantity
        }
    })
    const order=await prisma.order.create(
        {
            data:
            {
                userId:user.id,
                productId:product.id,
                createDate:new Date(Date.now())
            }
        }
    )
    return res.json({data:order})
})
module.exports=router