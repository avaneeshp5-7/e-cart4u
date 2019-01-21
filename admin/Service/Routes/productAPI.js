        var exp=require("express")
        router=exp.Router()
        mg=require("mongojs")
        con=mg("mongodb://localhost:27017/nalax")
        bp=require("body-parser")
        //////////////Get Category//////////////////////
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

        ///////////////////////// ssub category //////////
 
    router.post("/sscat",function(req,res){
         ssdata=req.body
         console.log(ssdata)
         con.ssubcategory.find(ssdata,function(err,result){
             res.send(result)
         })
    })

        /////////////////get brands/////////////////////
        router.post("/brec",function(rr,ss){
            var brrrec=rr.body
            con.brand.find(brrrec, function(errr,ressss){
            ss.send(ressss)
            //console.log(ressss)
        });
        });
        ////////////////Addd Product////////////////////
        router.post("/proRec",function(r,s){
        var prec=r.body
        con.product.find({},{_id:1}).sort({_id:-1}).limit(1,function(er,resutl){
            if(resutl==0)
            {
                val=0
            }
            else
            {
                val=resutl[0]._id
            }
            val++
            con.product.save({_id:val,catid:prec.catid,scatid:prec.scatid,sscatid:prec.sscatid,bdid:prec.bdid,pname:prec.pname,pprice:prec.pprice,pcolor:prec.pcolor,upcoming:prec.upcoming,pdesc:prec.pdesc,quantity:prec.quant,rating:prec.rating,active:1},function(){
                s.send("Inserted !")
            });
        });
        });

        //===============get Product==========================

        router.get("/getPro",function(rrqq,rrss){
            con.product.find(function(er,proresult){
                con.ssubcategory.find(function(err,ssubresult){
                   con.brand.find(function(err,brdresult){
                    con.sub_category.find(function(errr,subresult){
                        con.category.find(function(errrr,catresult){
                            prdata=[]
                            for(i=0;i<proresult.length;i++)
                            {
                                for(j=0;j<brdresult.length;j++)
                                {
                                    for(k=0;k<subresult.length;k++)
                                    {
                                        for(n=0;n<ssubresult.length;n++){
                                        for(l=0;l<catresult.length;l++)
                                        {
                                            if(proresult[i].bdid==brdresult[j]._id && proresult[i].scatid==subresult[k]._id && proresult[i].sscatid==ssubresult[n]._id && proresult[i].catid==catresult[l]._id)
                                            {
                                                pdata=proresult[i]
                                                pdata.Brand=brdresult[j].Brand
                                                pdata.scatname=subresult[k].scatname
                                                pdata.subscatname=ssubresult[n].subscatname
                                                pdata.cname=catresult[l].cname
                                                prdata.push(pdata)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                            rrss.send(prdata)
                            
                        });
                    });
                });
            });
        });
    });

router.post("/iobj",function(reqq,ress){
   imgdata=reqq.body
   console.log(imgdata)
   //ress.send(imgdata)
   con.product.find().sort({_id:-1}).limit(1,function(err,result){
      // console.log(result[0]._id)
       var resid=result[0]._id
       con.product.update({_id:resid},{$set:{images:imgdata.images}})
   })
})

//--------------------------Delete--------------------------

        router.post("/pdell",function(r,s){
        var prec1=r.body
        con.product.remove(prec1,function(){
        s.send("Removed Successfully !")
        });
        });
        router.post("/UpdatePro",function(rrq,rrs){
            var pupdata=rrq.body
            con.product.update(pupdata[0],{$set:pupdata[1]},function(){
                rrs.send("Updated !")
            })
        })
        router.post("/addoffer",function(req,res){
            ofdata=req.body
            con.product.update(ofdata[0],{$set:ofdata[1]})
            res.send("offer added")
            
     })
    //  Actuve and inactive
       router.post("/acivestatus",function (req,res) {
          ardata=req.body
          con.product.update(ardata[0],{$set:ardata[1]},function(){
              res.send("updated !")
          })
      })

// get purchage histry
   
  router.get("/getPuarchage",function(req,res){
     con.purchase.find(function(err,result){
         //console.log(result)
         res.send(result)
     })
  })

        module.exports=router;
