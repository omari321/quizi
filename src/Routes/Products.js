const router=require("express").Router()
const prisma=require("../Client/prisma")
const {productValidator}=require("../Validator/product")
const {validationResult}=require("express-validator")

router.get("/",async (req,res)=>
{
    const  products=await prisma.Products.findMany({})
    return res.json({data:products})
})
router.post("/",productValidator,async(req,res)=>
{
    const errors=validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: errors.array() });
    }
    const body=req.body
    const product=await prisma.Products.create({
        data:
        {
            name:body.name,
            price:body.price,
            quantity:body.quantity,
        }
    })
    return res.json({data:product})
})
router.get("/:id",async(req,res)=>
{
    let {id}=req.params
    id=parseInt(id)
    const product=await prisma.products.findUnique({
        where:
    {
        id
    }})
    if (!product)
    {
        return res.status(404).json({status:"product with this id does not exist"})
    }
    return res.json({data:product})
})

module.exports=router