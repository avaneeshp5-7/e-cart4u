var exp=require("express")
router=exp.Router()
mg=require("mongojs")
con=mg("mongodb://localhost:27017/nalax")
bp=require("body-parser")
//////////////Save Category/////////////////
router.post("/catdata",function(req,res){
   var cdata = req.body
  //console.log(cdata)
    con.category.find({},{_id:1}).sort({_id:-1}).limit(1,function(e,r){
    if(r==0)
    {     
    var val=0 
    }
    else
    {
    val=r[0]._id
    }
    val++
    con.category.save({_id:val,cname:cdata.cname,active:1},function(){
       res.send("Inserted !")
    })
    })
})
 router.get("/getcato",function(rq,rs){
     con.category.find(function(err,resu){
     rs.send(resu)
    })
})
router.post("/delRec",function(r,s){
    var dlrec=r.body
    con.category.remove(dlrec,function(){
        s.send("Removed Successfully !")
    })
})
//==========update===============//
router.post("/catUpdate",function(r,s){
    updata=r.body
    con.category.update(updata[0],{$set:updata[1]} ,function(){
        s.send("Updated !")
    })
})

module.exports=router;