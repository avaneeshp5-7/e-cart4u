var exp = require("express")
router = exp.Router()
mg = require("mongojs")
con = mg("mongodb://localhost:27017/nalax")
bp = require("body-parser")
//////////////Get Category//////////////////////
router.get("/getcato", function (rq, rs) {
    con.category.find(function (er, res) {
        rs.send(res)
        //console.log(res)
    })
})
/////////////Get Sub Category/////////////////
router.post("/getrec", function (rqq, rss) {
    var chrec = rqq.body
    // console.log(chrec)
    con.sub_category.find(chrec, function (er, ress) {
        rss.send(ress)
        // console.log(ress)
    })
})

// =================== SSub ==========================//

router.post("/getssub", function (req, res) {
    brdata = req.body
    con.ssubcategory.find(brdata, function (err, ssresult) {
        res.send(ssresult)
    })
})

////////////////add brands//////////////////////
router.post("/brdrec", function (q, s) {
    brec = q.body
    con.brand.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1, function (er, rs) {
        if (rs == 0) {
            val = 0
        }
        else {
            val = rs[0]._id
        }
        val++
        con.brand.save({ _id: val, catid: brec.catid, scatid: brec.scatid, sscatid: brec.sscatid, Brand: brec.Brand, active: brec.active }, function () {
            s.send("Inserted !")
        })
    })
})
/////////////////get brands/////////////////////
router.get("/brandrec", function (rr, ss) {
    con.brand.find(function (er, brandresult) {
        con.sub_category.find(function (err, scresult) {
            con.ssubcategory.find(function (err, ssubresult) {
                con.category.find(function (errr, catresult) {
                    bdata = []
                    for (k = 0; k < brandresult.length; k++) {
                        for (l = 0; l < scresult.length; l++) {
                            for (m = 0; m < ssubresult.length; m++) {
                                for (p = 0; p < catresult.length; p++) {
                                    if (brandresult[k].scatid == scresult[l]._id && brandresult[k].sscatid == ssubresult[m]._id && brandresult[k].catid == catresult[p]._id) {
                                        bdt = brandresult[k]
                                        bdt.scatname = scresult[l].scatname
                                        bdt.subscatname = ssubresult[m].subscatname
                                        bdt.cname = catresult[p].cname
                                        bdata.push(bdt)
                                    }
                                }
                            }
                        }
                    }
                    ss.send(bdata)
                });
            });
        });
    });
});
///////////////////Delete//////////////////////
router.post("/bdell", function (r, s) {
    var brec = r.body
    con.brand.remove(brec, function () {
        s.send("Remove Successfully !")
    })
})
/////////////Brand  Updates //////////////
router.post("/Updatebrd", function (rq, rs) {
    var upbrd = rq.body
    con.brand.update(upbrd[0], { $set: upbrd[1] }, function () {
        rs.send("Updated !")
    })
})
module.exports = router;
