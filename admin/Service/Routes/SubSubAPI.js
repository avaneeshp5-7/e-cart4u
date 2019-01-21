var exp=require("express")
router=exp.Router()
mg=require("mongojs")
con=mg("mongodb://localhost:27017/nalax")
bp=require("body-parser")
module.exports=router;

/////Category///////////////////
router.get("/catRec",function(rq,rs){
    con.category.find(function(er,res){
        rs.send(res)
        //console.log(res)
    })
})
/////////////Get Sub Category/////////////////
router.post("/scatRec",function(rqq,rss){
    var sbrec=rqq.body
    con.sub_category.find(sbrec,function(er,ress){
        rss.send(ress)
    // console.log(ress)
    })
})

router.post("/subrec",function(req,rs){
    ssubres=req.body
      con.ssubcategory.find({},{_id:1}).sort({_id:-1}).limit(1,function(err,result){
          if(result==0)
          {
               val=0
          }
          else
          {
              val=result[0]._id
          }
          val++
         con.ssubcategory.save({_id:val,catid:ssubres.catid,scatid:ssubres.scatid,subscatname:ssubres.subscatname,active:1},function(){
             rs.send("Inserted !!")
         })
      })  
})

router.get("/getsubrec",function(req,res){
    con.ssubcategory.find(function(err,ssubresult){
        con.sub_category.find(function(err,scatresult){
            con.category.find(function(err,catresult){
                ssarr=[]
                for(i=0;i<ssubresult.length;i++)
                {
                    for(j=0;j<scatresult.length;j++)
                    {
                        for(k=0;k<catresult.length;k++)
                        {
                            if(ssubresult[i].scatid==scatresult[j]._id && ssubresult[i].catid==catresult[k]._id)
                            {
                                dtt=ssubresult[i]
                                dtt.scatname=scatresult[j].scatname
                                dtt.cname=catresult[k].cname
                                ssarr.push(dtt)
                            }
                        }
                    }
                }
               res.send(ssarr) 
            })
        })
    })
})

router.post("/delsubrec",function(req,res){
   deldata=req.body
   con.ssubcategory.remove(deldata,function(){
       res.send("Deleted ! !")
   })
})

//  =================Updet================//

router.post("/Updet",function(req,res){
      updata = req.body
      console.log(updata)
      con.ssubcategory.update(updata[0],{$set:updata[1]},function(){
          res.send("Updated")
      })
})