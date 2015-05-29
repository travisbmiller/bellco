var User = require('../models/userModel');

module.exports = {

    newUser: function (req, res) {
        
        console.log("hit Save API")
        console.log(req.body);        
        
        var data = req.body,
            newUser = new User(data);

        newUser.save(function(err, user) {

            console.log("saving")
            if (err) {
                 console.log("err", err)
                 return res.status(500).json(err);

            } else {
                console.log("success")
                 return res.status(200).json(user);

            }

         });
    }
};
