var exp=require("express");
var expfile=require("express-fileupload")
var app=exp()
mg=require("mongojs")
con=mg("mongodb://localhost:27017/nalax")
app.use(expfile())
app.post("/uploads",function(r,s){

    
  imgtype=r.files.filename.mimetype

  if(imgtype=="image/png" || "image/jpeg"){
     count=r.files.filename
     fname=r.files.filename
     ts=new Date/1000;
     ts=parseInt(ts)
     fname=r.files.filename.name
     fname=ts+"_"+fname
      count.mv("f:/user/src/assets/uploads/"+fname,function(er,reesult){
          if(er)
          {
              s.send(er)
          }
          else
          {
              con.image.save({image:fname},function(err,result){
              })
              s.redirect("http://localhost:4200/prod;iname="+fname)
          }

      })

  }
  else
  {
    s.redirect("Currect File")
  }    
})

app.listen(3000)
console.log("Running.... 3000")