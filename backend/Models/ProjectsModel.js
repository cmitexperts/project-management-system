const {Schema, model}  = require ('mongoose');



const ProjectSchema = new Schema(
  {
    title: 
    { type: String, 
      required: true },
    date: 
    { type: Date,
       default: new Date() },

    image:{
      type:"String",
   
    },
  assign_id:[{
type:Schema.ObjectId,
ref:"employees",
  }
  ],

  stage:{
    type:String,
  },
  status:{
    type:Boolean,
    default:true
},



   },
  { timestamps: true }
);

const ProjectsModel = model("Projects", ProjectSchema);



module.exports = ProjectsModel; 