var exp=require("express")
router=exp.Router()
mg=require("mongojs")
con=mg("mongodb://localhost:27017/nalax")
bp=require("body-parser")
// ======================= Search Product ===================//
router.post("/searchproduct",function(req,res){
    data=req.body
    data=data.pname
   // console.log(data)
    con.product.find({"pname":{$regex:data}},function(err,result){
    res.send(result)
    })
})

router.get("/getOTP",function(req,res){
    otp=Math.random()
    otp=10000*otp
    otp=parseInt(otp)
    res.send("Your OTP Number Is : " +otp)

})
router.post("/genOTP",function(req,res){
    odata=req.body
    console.log(odata)
    
})
module.exports=router;