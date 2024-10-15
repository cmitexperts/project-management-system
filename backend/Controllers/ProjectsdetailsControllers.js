
// // const { unlink } = require('fs');
// const { generateFileName } = require('../helper');
// const ProjectsDetailsModel = require('../Models/ProjectDetailsModel');



// class ProjectDetailsController {

//     read(id){
//         return new Promise(
//         async    (res, rej) => {
//                 try{
//                     let projectsdetails;
//                     if(id){
//                         projectsdetails = await ProjectsDetailsModel.findById(id);
//                     }else{
//                         projectsdetails = await ProjectsDetailsModel.find()
//                         .populate("employee_id")
//                         .populate("project_id"); // Populate project_id
                
//                     }
//                     res({
//                         msg:"Projects Details found",
//                         projectsdetails ,
//                         // image_base_url:"/image/project",
//                         status: 1
//                     })
//                 }
//                 catch(err) {

//                     console.error('Error in read method:', err);
//                     rej({
//                         msg: 'Internal Server Error',
//                         status:0
//                     })
//                 }
                  

//                 })

//             }
    
//     // create(data) {
//     //     // console.log('data start ');
//     //     // console.log(data);
       
//     //     // console.log('data end ');
       
//     //     return new Promise((res, rej) => {
//     //         try {
//     //             // Create the project details without image handling
//     //             const projectdetails = new ProjectsDetailsModel({
                  
                   
                  
//     //                 employee_id: JSON.parse(data.project_employee),
//     //                 project_id: JSON.parse(data.project_details),
//     //                 hours: data.hours,
//     //                 description: data.description,
                
//     //             });
//     //             console.log(projectdetails);
    
//     //             // Save project details
//     //             projectdetails.save()
//     //                 .then(() => {
//     //                     res({
//     //                         msg: "Project Details added",
//     //                         status: 1,
//     //                     });
//     //                 })
//     //                 .catch((err) => {
//     //                     console.error("Error saving project details:", err.message);
//     //                     rej({
//     //                         msg: "Unable to add Project details",
//     //                         status: 0,
//     //                     });
//     //                 });
//     //         } catch (err) {
//     //             console.error("Internal Server Error:", err.message);
//     //             rej({
//     //                 msg: 'Internal Server Error',
//     //                 status: 0,
//     //             });
//     //         }
//     //     });
//     // }
//     create(data) {
//         return new Promise((res, rej) => {
//             console.log('Input Data:', data); // Log the incoming data
//             try {
//                 if (!data.project_employee || !data.project_details) {
//                     console.error('Invalid data: Missing project_employee or project_details');
//                     rej({
//                         msg: 'Invalid data: Missing required fields',
//                         status: 0,
//                     });
//                     return;
//                 }
    
//                 let employeeIds, projectIds;
//                 try {
//                     employeeIds = JSON.parse(data.project_employee);
//                     projectIds = JSON.parse(data.project_details);
//                 } catch (error) {
//                     console.error('JSON parsing error:', error);
//                     rej({
//                         msg: 'Invalid JSON structure in project_employee or project_details',
//                         status: 0,
//                     });
//                     return;
//                 }
    
//                 const projectdetails = new ProjectsDetailsModel({
//                     employee_id: employeeIds,
//                     project_id: projectIds,
//                     hours: data.hours,
//                     description: data.description,
//                 });
    
//                 console.log('Created project details:', projectdetails); // Log the created object
    
//                 projectdetails.save()
//                     .then((result) => {
//                         console.log('Project details saved:', result);
//                         res({
//                             msg: 'Project Details added',
//                             status: 1,
//                             data: result,
//                         });
//                     })
//                     .catch((error) => {
//                         console.error('Error saving project details:', error);
//                         rej({
//                             msg: 'Unable to add Project details',
//                             status: 0,
//                         });
//                     });
//             } catch (error) {
//                 console.error('Unexpected error in create method:', error);
//                 rej({
//                     msg: 'Internal Server Error',
//                     status: 0,
//                 });
//             }
//         });
//     }
    
    
//     delete(id, image) {
//         return new Promise(
//             (res, rej) => {
//                 try {
//                     ProjectsDetailsModel.deleteOne({ _id: id })
//                         .then(
//                             (success) => {
//                                 unlink('./public/image/project/' + image,
//                                     (err) => {
//                                         if (err) {
                                           
//                                             rej({
//                                                 msg: "Data deleted but image not!",
//                                                 status: 0
//                                             })
//                                         } else {
//                                             res({
//                                                 msg: "Data deleted",
//                                                 status: 1
//                                             })
//                                         }
//                                     }
//                                 )
                              
//                             }
//                         ).catch(
//                             (error) => {
                           
//                                 res({
//                                     msg: "Unable to delete data",
//                                     status: 0
//                                 })
//                             }
//                         )
//                 } catch (err) {
                    
//                     rej({
//                         msg: 'Internal server error',
//                         status: 0
//                     })
//                 }
//             }
//         )
//     }
//     }
    






// module.exports = ProjectDetailsController;

// const Notice = require('../Models/Notification.js');
// const { unlink } = require('fs');
// const { generateFileName } = require('../helper');
const ProjectsDetailModel = require('../Models/ProjectDetailsModel');



class ProjectDetailController {

    read(id){
        return new Promise(
        async    (res, rej) => {
                try{
                    let projectsdetails;
                    if(id){
                        projectsdetails = await ProjectsDetailModel.findById(id);
                    }else{
                        projectsdetails = await ProjectsDetailModel.find().populate("employee_id");
                    }
                    res({
                        msg:"Projects details found",
                        projectsdetails,
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
    
    // create(data) {
    //     console.log('data start ');
    //   console.log(data);
     
    //   console.log('data end ');

    //     return new Promise(
    //         (res, rej) => {
    //             try{
                     
                          
    //                             const projectdetails = new ProjectsDetailModel({
    //                              description:data.description,
    //                              hours:data.hours,
                                    
    //                                 employee_id:JSON.parse(data.project_employee),
    //                               project_id:JSON.parse(data.project_details),
    //                             })
    //                             projectdetails.save()
    //                                 .then(
    //                                     () => {
    //                                         res(
    //                                             {
    //                                                 msg: "Project details added",
    //                                                 status: 1
    //                                             }
    //                                         )
    //                                     }
    //                                 ).catch(
    //                                     (err) => {
    //                                         console.log(err.message);
    //                                         rej(
    //                                             {
    //                                                 msg: "Unable to add Project",
    //                                                 status: 0
    //                                             }
    //                                         )
    //                                     }
    //                                 )
    //                         }
                       
    create(data) {
        console.log('Received Data:', data);  // Check if data is undefined
      
        try {
          if (!data) {
            console.error('Data is undefined or null');
            throw new Error('No data provided');
          }
      
          const employeeIds = JSON.parse(data.project_employee);
          const projectIds = JSON.parse(data.project_details);
      
          console.log('Employee IDs:', employeeIds);
          console.log('Project IDs:', projectIds);
      
          const projectdetails = new ProjectsDetailModel({
            description: data.description,
            hours: data.hours,
            employee_id: employeeIds,
            project_id: projectIds,
          });
      
          console.log('Project Details Object:', projectdetails);
      
          return projectdetails.save()
            .then(() => ({
              msg: 'Project details added',
              status: 1,
            }))
            .catch(err => {
              console.error('Error saving project:', err.message);
              throw new Error('Unable to add Project');
            });
        } catch (err) {
          console.error('Unexpected error:', err);
          return Promise.reject({
            msg: 'Internal Server Error',
            status: 0,
          });
        }
      }
            
                
   
        
   
    
      delete(id) {
        return new Promise((res, rej) => {
            try {
                ProjectsDetailModel.deleteOne({ _id: id })
                    .then(success => {
                        // Assuming delete was successful
                        res({
                            msg: "Data deleted successfully",
                            status: 1
                        });
                    })
                    .catch(error => {
                        // Handle error if deleteOne fails
                        res({
                            msg: "Unable to delete data",
                            status: 0
                        });
                    });
            } catch (err) {
                // Handle unexpected errors
                rej({
                    msg: 'Internal server error',
                    status: 0
                });
            }
        });
    }
    
    }
    






module.exports = ProjectDetailController;





