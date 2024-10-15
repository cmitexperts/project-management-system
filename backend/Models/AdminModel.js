const { Schema, model } = require('mongoose');


const AdminSchema = new Schema(
    {
        
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/, // Simple email validation
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Minimum password length
        },
        // admin_type: {
        //     type:Boolean,
        //     default:false,
        //     // true:super-admin
        //     // false:admin
        // }, 
        role: { type: String, enum: ['admin', 'employee'], required: true },
       
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const AdminModel = model('Admin', AdminSchema);

module.exports = AdminModel;











































// const {Schema, model}  = require ('mongoose');

// const AdminSchema = new Schema(
//     {
       
//         email:String,
//         password:String,
//        admin_type:Boolean,
//     }
// )


// const AdminModel = model("admin", AdminSchema);

// module.exports = AdminModel; 