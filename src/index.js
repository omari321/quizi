const express=require("express")
const User=require("./Routes/Users")
const Product=require("./Routes/Products")
const order=require("./Routes/Orders")

const app=express()
app.use(express.json())
app.use("/user",User)
app.use("/product",Product)
app.use("/order",order)
const PORT=8000

app.listen(PORT,()=>
{
    console.log(`app has been started on port ${PORT} 🚀`);
})