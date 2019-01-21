var exp=require("express")
router=exp.Router()
mg=require("mongojs")
con=mg("mongodb://localhost:27017/nalax")
bp=require("body-parser")
router.post("/logData",function(req,res){
    logdt=req.body
    console.log(logdt)
    con.adminReg.find(logdt,function(err,result){   
        res.send(result)
    })
})
module.exports=router;