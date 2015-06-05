var Application = require('../models/applicationsModel.js');

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
                 return res.status(200).json(application);

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
    }

};

// Get application (partials) with in submit date && stores


