const express = require('express');

const EmployeeRouter = express.Router();
const EmployeeController = require('../Controllers/EmployeeController');
const fileUpload = require('express-fileupload');
const adminAuth = require('../middlewares/AdminAuth');

EmployeeRouter.get(
    "/:id?",
    (req, res) => {
        const result = new EmployeeController().read(req.params.id ?? null);
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


EmployeeRouter.post(
    "/create",
   [ fileUpload({
        createParentPath: true
    }),
    adminAuth
   ],
    (req, res) => {
        console.log(req.files);

        const result = new EmployeeController().create(req.body, req.files.employee_image);
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

EmployeeRouter.delete(
    "/delete/:id/:image_name",
    (req, res) => {
        const result = new EmployeeController().delete(req.params.id, req.params.image_name);
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
EmployeeRouter.put(
"/update/:id",
fileUpload(
{
    createParentPath: true
}
), 
(req,res) => {
    const result = new EmployeeController()
             .update(req.params.id, req.body, req.files?.employee_image ?? null);
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

EmployeeRouter.put(
    "/change-status/:id/:new_status",
    (req,res) => {
        const result = new EmployeeController().changeStatus(req.params.id, req.params.new_status);
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

module.exports = EmployeeRouter;




