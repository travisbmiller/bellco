var Application = require('../models/applicationsModel.js');
var email   = require("emailjs");
var server  = email.server.connect({
   user:     process.env.EMAIL_USR, 
   password: process.env.EMAIL_PASS, 
   host:    "smtp-mail.outlook.com", 
   tls: {ciphers: "SSLv3"}
});

module.exports = {

    save: function (req, res) {
        
        console.log("hit Save API")
        console.log(req.body);

        var data = req.body,
            newApplication = new Application(data);

        newApplication.save(function(err, application) {

            console.log("saving")
            if (err) {
                 console.log("err", err)
                 return res.status(500).json(err);

            } else {
                console.log("success")
                res.status(200).json(application);

                var fullName = application.firstName + " " + application.lastName;
                var stores = application.preferredLocation.join(" ");
                var positions = [];
                for (prop in application.positions) {
                  if (application.positions[prop]) {
                    positions.push(" " + prop)
                  }
                }

                positions.join(" ");

                server.send({
                   from:    "<jobs@applyattacobell.com>", 
                   to:      "<robinm@bell-co.net>, <daniellem@bell-co.net>, <travisbmiller@outlook.com>",
                   subject: "New Application",
                   attachment: [ 
                    { data: "<table align='center' border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' id='bodyTable' style='border-collapse:collapse; margin:0; padding:0; background-color:#F2F2F2; height:100%!important; width:100%!important'><tbody><tr><td align='center' valign='top' id='bodyCell' style='margin:0; padding:20px; border-top:0; height:100%!important; width:100%!important'><table border='0' cellpadding='0' cellspacing='0' width='600' id='templateContainer' style='border-collapse:collapse; border:0'><tbody><tr><td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='600' id='templatePreheader' style='border-collapse:collapse; background-color:#FFFFFF; border-top:0; border-bottom:0'><tbody><tr><td valign='top' class='preheaderContainer' style='padding-top:9px'><table border='0' cellpadding='0' cellspacing='0' width='100%' class='mcnTextBlock' style='border-collapse:collapse'><tbody class='mcnTextBlockOuter'><tr><td valign='top' class='mcnTextBlockInner'><table align='left' border='0' cellpadding='0' cellspacing='0' width='600' class='mcnTextContentContainer' style='border-collapse:collapse'><tbody><tr><td valign='top' class='mcnTextContent' style='padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:18px; color:#606060; font-family:Helvetica; font-size:11px; line-height:125%; text-align:left'><div style='text-align:center'>A New Application was Submitted.</div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='600' id='templateHeader' style='border-collapse:collapse; background-color:#FFFFFF; border-top:0; border-bottom:0'><tbody><tr><td valign='top' class='headerContainer'></td></tr></tbody></table></td></tr><tr><td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='600' id='templateBody' style='border-collapse:collapse; background-color:#FFFFFF; border-top:0; border-bottom:0'><tbody><tr><td valign='top' class='bodyContainer'><table border='0' cellpadding='0' cellspacing='0' width='100%' class='mcnTextBlock' style='border-collapse:collapse'><tbody class='mcnTextBlockOuter'><tr><td valign='top' class='mcnTextBlockInner'><table align='left' border='0'cellpadding='0' cellspacing='0' width='600' class='mcnTextContentContainer' style='border-collapse:collapse'><tbody><tr><td valign='top' class='mcnTextContent' style='padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:18px; color:#606060; font-family:Helvetica; font-size:15px; line-height:150%; text-align:left'><span style='font-size:16px'><span style='font-family:arial,helvetica neue,helvetica,sans-serif'><strong>Overview of Applicant</strong></span></span><br><strong><span style='font-family:arial,helvetica neue,helvetica,sans-serif'>Name:</span></strong><span style='font-family:arial,helvetica neue,helvetica,sans-serif'>" 
                    + fullName + 
                    "<br><strong>Stores: </strong>"
                    + stores + 
                    "<br><strong>Positions: </strong>" 
                    + positions + 
                    "</span><br>&nbsp; </td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='600' id='templateFooter' style='border-collapse:collapse; background-color:#FFFFFF; border-top:0; border-bottom:0'><tbody><tr><td valign='top' class='footerContainer' style='padding-bottom:9px'></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>", alternative: true}
                   ]
                }, function(err, message) { if (err) console.log(err) });

             }

         });
    },
    deleteApp: function (req, res) {
      console.log("api delete")
      var id = req.params.id;
      Application.remove({ _id: id }, function(err, application) {

            if (err) return res.status(500).json(err);
            return res.status(200).json(application);

        }); 
    },
    getByID: function (req, res) {
        console.log("hitting get By ID Api")

        // by ApplicationID (Params ID)
        var id = req.params.id;

        Application.findOne({ _id: id }, function(err, application) {

            if (err) return res.status(500).json(err);
            return res.status(200).json(application);

        }); 

    },
    get: function (req, res) {
        Application.find()
        .exec(function(err, applications) {

            if (err) return res.status(500).json(err);
            return res.status(200).json(applications);

        }); 
    },
    getBy: function (req, res) {
        // console.log("hitting get By Store Api")
        // console.log(req.body)
        // console.log(req.body.stores)
        // console.log(req.body.dateGTE)
        // console.log(req.body.dateLT)
        // console.log(req.body.positions)

      Application.find({
         "preferredLocation":  
            { $in: req.body.stores }, 
         $or: req.body.positions,
         "submittedAt": {
            $gte: req.body.dateGTE,
            $lt: req.body.dateLT
         }
      })
      .exec(function(err, applications) {

            if (err) return res.status(500).json(err);
            return res.status(200).json(applications);

        }); 
    },

    seen: function (req, res) {
        console.log("hit seen api")
        var id = req.params.id;
        console.log(id)
        Application.update({ _id: id }, {
          seen: true
        },function(err, application) {
            if (err) return res.status(500).json(err);
            return res.status(200).json(application);
        });      
    }

};

// Get application (partials) with in submit date && stores


