const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma=new PrismaClient()

prisma.$use(async (params,next)=>
{
    if (params.action=="create" && params.model=="User")
    {
        console.log(params.args.data);
        const user=params.args.data;
        const password=bcrypt.hashSync(user.password,10);
        user.password=password;
        params.args.data=user;   
    }
    return next(params)
})
module.exports=prisma