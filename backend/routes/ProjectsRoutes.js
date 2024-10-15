const express = require('express');

const ProjectRouter = express.Router();
const ProjectController = require('../Controllers/ProjectsController');
const fileUpload = require('express-fileupload');
// const adminAuth = require('../middlewares/AdminAuth');


ProjectRouter.get(
    "/:id?",
    (req, res) => {
         const result = new ProjectController().read(req.params.id ?? null);
        result
            .then(
                (success) => {
                    res.send(success);
                }
            )
            .catch(
                (error) => {
                

                    res.send(error);
                }
            )

    }
)


ProjectRouter.post(
 "/create",
    fileUpload({
        createParentPath: true
    }),
    
   
    (req, res) => {
        console.log(req.files);
        

        const result = new ProjectController().create(req.body, req.files.project_image);
        result.then(
            (success) => {
                res.send(success);
            }
        )
            .catch(
                (error) => {
                    res.send(error);
                }
            )

    }
) 


ProjectRouter.delete(
    "/delete/:id/:image",
    (req, res) => {
        const result = new ProjectController().delete(req.params.id, req.params.image);
        result.then(
            (success) => {
                res.send(success);
            }
        )
            .catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)
// ProjectRouter.put(
// "/update/:id",
// // fileUpload(
// // {
// //     createParentPath: true
// // }
// // ), 
// (req,res) => {
//     const result = new EmployeeController()
//              .update(req.params.id, req.body, req.files?.employee_image ?? null);
//     result.then(
//         (success) => {
//             res.send(success);
//         }
//     )
//         .catch(
//             (error) => {
//                 res.send(error);
//             }
//         )
// }


// )

// ProjectRouter.put(
//     "/change-status/:id/:new_status",
//     (req,res) => {
//         const result = new EmployeeController().changeStatus(req.params.id, req.params.new_status);
// result.then(
//    (success) => {
//        res.send(success);
//    }
// )
//    .catch(
//        (error) => {
//            res.send(error);
//        }
//    )
//     }
// )














// TaskRouter.post("/create", protectRoute, isAdminRoute, createTask);
// TaskRouter.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
// TaskRouter.post("/activity/:id", protectRoute, postTaskActivity);

// TaskRouter.get("/dashboard", protectRoute, dashboardStatistics);
// TaskRouter.get("/", protectRoute, getTasks);
// TaskRouter.get("/:id", protectRoute, getTask);

// TaskRouter.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
// TaskRouter.put("/update/:id", protectRoute, isAdminRoute, updateTask);
// TaskRouter.put("/:id", protectRoute, isAdminRoute, trashTask);

// TaskRouter.delete(
//   "/delete-restore/:id?",
//   protectRoute,
//   isAdminRoute,
//   deleteRestoreTask
// );








module.exports = ProjectRouter;


























// import express from "express";
// import {
//   createSubTask,
//   createTask,
//   dashboardStatistics,
//   deleteRestoreTask,
//   duplicateTask,
//   getTask,
//   getTasks,
//   postTaskActivity,
//   trashTask,
//   updateTask,
// } from "../Controllers/taskController.js";
// import { isAdminRoute, protectRoute } from "../middlewares/authmiddleware.js";

// const router = express.Router();

// router.post("/create", protectRoute, isAdminRoute, createTask);
// router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
// router.post("/activity/:id", protectRoute, postTaskActivity);

// router.get("/dashboard", protectRoute, dashboardStatistics);
// router.get("/", protectRoute, getTasks);
// router.get("/:id", protectRoute, getTask);

// router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
// router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
// router.put("/:id", protectRoute, isAdminRoute, trashTask);

// router.delete(
//   "/delete-restore/:id?",
//   protectRoute,
//   isAdminRoute,
//   deleteRestoreTask
// );

// export default router;
