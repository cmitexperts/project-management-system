const {Schema, model}  = require ('mongoose');


const EmployeeSchema = new Schema(
    {
        name:{
            type:"String",
            maxLength:100,
            unique:true,
            required:true
        },
        last_name:{
            type:"String",
            maxLength:100,
            unique:true,
            required:true
        },
        email: {
            type: String,
            maxLength: 255,
            unique: true,  // Ensures that all emails in the collection are unique
            required: true, // Makes sure this field is mandatory
            match: /.+\@.+\..+/ // Regex to validate the email format
        },
        contact_no: {
            type: String,
            maxLength: 15, // Adjust based on your expected phone number format
            unique: true,  // Ensures that all contact numbers in the collection are unique
            required: true, // Makes sure this field is mandatory
            match: [/^\d{3}-\d{3}-\d{4}$/, 'Please enter a valid phone number in the format 123-456-7890']
        },

      
        image_name:{
            type:"String",
          
        },
        status:{
            type:Boolean,
            default:1
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Minimum password length
        },

    },
    {
        timestamps:true
    }
)


const EmployeeModel = model("employees", EmployeeSchema);

module.exports = EmployeeModel; 