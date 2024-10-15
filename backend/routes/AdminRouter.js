const express = require('express');
const AdminRouter = express.Router();
const AdminController = require("../Controllers/AdminController.js");
const AdminModel = require("../Models/AdminModel");


// AdminRouter.post("/signin", (req, res) => {
//     const {email, password} = req.body;
//     AdminModel.findOne({email : email})
//     .then(user => {
//         if(user) {
//             console.log(user);
//             if(user.password === password){
//                 res.json("Success")
//             }else{
//                 res.json("The password is incorrect")
//             }
//         }else{
//             res.json("No record existed")
//         }
//     })
// })

AdminRouter.post(
    "/signin",
    (req, res) => {
        const result = new AdminController().signin(req.body);
      
        result
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    console.log(error, '---error');
                    res.send(error)
                }
            )
    }
)

AdminRouter.post(
    "/register",
    (req, res) => {
        const result = new AdminController().register(req.body);
        result
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)

module.exports = AdminRouter;