var exp = require("express")
router = exp.Router()
mg = require("mongojs")
con = mg("mongodb://localhost:27017/nalax")
bp = require("body-parser")

router.get("/busDetails",function(req,res){
    con.Business.find(function(err,result){
        res.send(result)
    })
}) 
router.post("/datawise",function(req,res){
    bdata=req.body
    con.Business.find({date_order:{$gte:bdata[0].date_order,$lte:bdata[1].date_order}},function(err,dateresult){
    res.send(dateresult)
   })
})

module.exports=router;
