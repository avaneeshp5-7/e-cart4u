var exp=require("express")
router=exp.Router()
mg=require("mongojs")
con=mg("mongodb://localhost:27017/nalax")
bp=require("body-parser")
// router.post("/catdata",function(req,res){
//    var cdata = req.body
//     con.category.save(cdata,function(){
//         res.send("Category Inserted ! ")
//     })
// })
router.get("/getcato",function(rq,rs){
    con.category.find(function(err,resu){
    rs.send(resu)
   })
})
///==========Insert SubCategpry/===================//
router.post("/scatrec",function(req,res){
    scat=req.body
    con.sub_category.find({},{_id:1}).sort({_id:-1}).limit(1,function(err,resu){
         if(resu==0)
         {
         val=0
         }
         else
         {
         var val=resu[0]._id
         }
         val++
         con.sub_category.save({_id:val,catid:scat.catid,scatname:scat.scatname,active:scat.active},function(){
             res.send("Inserted !")
         })
    })
})
//==================Get Sub Category======================//
router.get("/getrec",function(reqq,rss){
  con.sub_category.find(function(err,subcatresult){
      con.category.find(function(err,catresult){
          ardata=[]
          for(i=0;i<subcatresult.length;i++)
          {
              for(j=0;j<catresult.length;j++)
              {
                if(subcatresult[i].catid==catresult[j]._id )
                {
                dtt=subcatresult[i]
                dtt.cname=catresult[j].cname
                ardata.push(dtt)
                }
              }
          }
          rss.send(ardata)
      });
  });
});
//=============================Delete====================//
router.post("/DelScatrec",function(r,s){
    screc=r.body
    con.sub_category.remove(screc,function(){
        s.send("Removed Successfully !")
    })
})
//////////////////Upadate///////////////////////
router.post("/updSub",function(qq,ss){
    subarr=qq.body
    con.sub_category.update(subarr[0],{$set:subarr[1]},function(){
      ss.send("Update Success !")
  })
})
module.exports=router;