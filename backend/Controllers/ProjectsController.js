// const Notice = require('../Models/Notification.js');
const { unlink } = require('fs');
const { generateFileName } = require('../helper');
const ProjectsModel = require('../Models/ProjectsModel');
// const User = require('../Models/UserModel.js');


class ProjectController {

    read(id){
        return new Promise(
        async    (res, rej) => {
                try{
                    let projects;
                    if(id){
                        projects = await ProjectsModel.findById(id);
                    }else{
                        projects = await ProjectsModel.find().populate("assign_id");
                    }
                    res({
                        msg:"Projects found",
                        projects,
                        image_base_url:"/image/project",
                        status: 1
                    })
                }
                catch(err) {
                    rej({
                        msg: 'Internal Server Error',
                        status:0
                    })
                }
                  

                })

            }
    
    create(data, project_image) {
        console.log('data start ');
      console.log(data);
      console.log(project_image);
      console.log('data end ');

        return new Promise(
            (res, rej) => {
                try{
                    const ImageName = generateFileName(project_image.name);
                    const destination = "./public/image/project/" + ImageName;
                    project_image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                rej({
                                    msg: 'Unable to upload images',
                                    status: 0
                                })
                            } else {
                                const project = new ProjectsModel({
                                    title: data.title,
                                    date:data.date,
                                  
                                    // assign_id: data.project_employee,
                                    stage:data.task_stage,
                                    assign_id:JSON.parse(data.project_employee),
                                    image:ImageName,
                                })
                                project.save()
                                    .then(
                                        () => {
                                            res(
                                                {
                                                    msg: "Project added",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (err) => {
                                            console.log(err.message);
                                            rej(
                                                {
                                                    msg: "Unable to add Project",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                            }
                        }
                    )
                }
                catch(err) {
                    rej({
                        msg: 'Internal Server Error',
                        status:0
                    })
                }
                  

                })

            }
        
    
        
   
    
    delete(id, image) {
        return new Promise(
            (res, rej) => {
                try {
                    ProjectsModel.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                unlink('./public/image/project/' + image,
                                    (err) => {
                                        if (err) {
                                           
                                            rej({
                                                msg: "Data deleted but image not!",
                                                status: 0
                                            })
                                        } else {
                                            res({
                                                msg: "Data deleted",
                                                status: 1
                                            })
                                        }
                                    }
                                )
                              
                            }
                        ).catch(
                            (error) => {
                           
                                res({
                                    msg: "Unable to delete data",
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    }
    






module.exports = ProjectController;



