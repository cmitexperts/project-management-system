const {Schema, model}  = require ('mongoose');



const ProjectDetailsSchema = new Schema(
  {

    employee_id:[{
      type:Schema.ObjectId,
      ref:"employees",
        }]
        ,
        project_id:[{
          type:Schema.ObjectId,
          ref:"projects",
            }]
            ,
            hours: {
              type: Number, // Storing hours as a number
              required: true, // You can make it required if needed
            },
            description:{
              type:String
            },
   

 

  
  status:{
    type:Boolean,
    default:true
},

   },
  { timestamps: true }
);

const ProjectsDetailsModel = model("projectsdetails", ProjectDetailsSchema );



module.exports = ProjectsDetailsModel; 