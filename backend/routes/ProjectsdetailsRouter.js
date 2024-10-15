const express = require('express');

const ProjectsDetailsRouter = express.Router();
const ProjectsdetailsController = require('../Controllers/ProjectsdetailsControllers');
const fileUpload = require('express-fileupload');


ProjectsDetailsRouter.get(
    "/:id?",
    (req, res) => {
         const result = new ProjectsdetailsController().read(req.params.id ?? null);
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


ProjectsDetailsRouter.post(
 "/create",
    // fileUpload({
    //     createParentPath: true
    // }),
    
   
    (req, res) => {
       
        

        const result = new ProjectsdetailsController().create(req.body);
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


ProjectsDetailsRouter.delete("/delete/:id", async (req, res) => {
    try {
        const result = await new ProjectsdetailsController().delete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).send({
            msg: "An error occurred while deleting the project details.",
            error: error.message || "Internal server error",
        });
    }
});







module.exports = ProjectsDetailsRouter;
