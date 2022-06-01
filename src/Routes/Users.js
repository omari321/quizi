const router=require("express").Router()
const prisma=require("../Client/prisma")
const {userValidator}=require("../Validator/users")
const {validationResult}=require("express-validator")

router.get("/",async (req,res)=>
{
    const users=await prisma.user.findMany(
        {
            include:
            {
                Orders:true
            }
        }
    )
    return res.json({data:users})
})
router.get("/:id/orders",async (req,res)=>
{
    const users=await prisma.user.findMany(
        {
            where:
            {
                id:parseInt(req.params.id)
            },
            include:
            {
                Orders:true
            }
        }
    )
    if (users.length==0)
    {
        return res.status(404).json({status:"user with this id does not exist"})
    }
    return res.json({data:users})
})
router.post("/",userValidator,async(req,res)=>
{
    const errors=validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: errors.array() });
    }
    const body=req.body
    const user=await prisma.User.create(
        {
            data:
            {
                username: body.username,
                firstName:body.firstName,
                lastName:body.lastName,
                password:body.password,
            }
        }
    )
    return res.json({data:user})
})
module.exports=router