const { resolve, promises } = require("dns");
const { generateFileName } = require("../helper");

const EmployeeModel = require("../Models/EmployeeModel");
const { error } = require("console");
const { unlink, unlinkSync } = require("fs");

// const { log } = require("console");

class EmployeeController {
    read(id) {
        return new Promise(
            async (res, rej) => {
                let employee;
                if (id) {
                  employee = await EmployeeModel.findById(id);
                } else {
                    employee = await EmployeeModel.find();
                    // const data = await EmployeeModel.find().sort({ createdAt: -1 })
                
                  
                } 
                return res(
                    {
                        msg: "Employee found",
                        employee,
                        image_base_url: "/images/employee",
                        status: 1
                    })
            }
        )
    }

create(data, image) {
    return new Promise(
        (res, rej) => {
           
            try {
                const fileName = generateFileName(image.name);
                const destination = "./public/images/employee/" + fileName;
               
                image.mv(
                    destination,
                    (err) => {
                        if (err) {
                            rej({
                                msg: 'Unable to upload image',
                                status: 0
                            })
                        } else {
                            const employee = new EmployeeModel(
                                {
                                    name: data.name,
                                    last_name: data.last_name,
                                    email: data.email,
                                    contact_no:data.contact_no,
                                    password:password,
                                    image_name: fileName
                                }
                            )
                            employee.save()
                                .then(
                                    () => {
                                        res(
                                            {
                                                msg: "profile created",
                                                status: 1
                                            }
                                        )
                                    }
                                ).catch(
                                    (error) => {
                                 
                                        rej(
                                            {
                                                msg: "Unable to create profile",
                                                status: 0
                                            }
                                        )
                                    }
                                )
                        }
                    }
                )
            }
            catch (error) {
        console.log(error.message);
                rej(
                    {
                        msg: 'Internal server error',
                        status: 0
                    }
                )
                //Exception handling
            }
        }
    )
}

  update(id, data, employee_image) {
        return new Promise(
            async (res, rej) => {
                try {
                    const employee = await EmployeeModel.findById(id);
                    if (employee) {
                        if (employee_image) {
                            const fileName = generateFileName(employee_image.name);
                            const destination = "./public/images/employee/" + fileName;
                            employee_image.mv(
                                destination,
                                (err) => {
                                    if (err) {

                                        rej({
                                            msg: "Unable to upload new image",
                                            status: 0
                                        })
                                    } else {
                                       EmployeeModel.updateOne(
                                            { _id: id },
                                            {
                                                name: data.name,
                                    last_name: data.last_name,
                                    email: data.email,
                                    contact_no:data.contact_no,
                                    image_name: fileName
                                            }
                                        ).then(
                                            () => {
                                                unlinkSync(
                                                    `./public/images/employee/${employee.image_name}`
                                                );
                                                res({
                                                    msg: "Profile updated",
                                                    status: 1
                                                })
                                            }
                                        ).catch(
                                            () => {
                                                res({
                                                    msg: "Unable to upadate profile ",
                                                    status: 0
                                                })
                                            }
                                        )
                                    }
                                }
                            )
                        } else {
                            EmployeeModel.updateOne(
                                { _id: id },
                                {
                                    name: data.name,
                                    last_name: data.last_name,
                                    email: data.email,
                                    contact_no:data.contact_no,
                                    image_name: fileName
                                }
                            ).then(
                                () => {
                                    res({
                                        msg: "profile Updated",
                                        status: 1
                                    })
                                }
                            ).catch(
                                () => {
                                    res({
                                        msg: "Unable to update profile",
                                        status: 0
                                    })
                                }
                            )
                        }
                    } else {
                        rej({
                            msg: "Invalid profile id",
                            status: 0
                        })
                    }

                } catch (err) {
                    rej({
                        msg: "internal server error",
                        status: 0
                    })
                } 
            }
        )
    }


changeStatus(id, new_status) {
        return new Promise(
            (res, rej) => {
                try {
                    EmployeeModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            status: new_status
                        }
                    ).then(
                        (success) => {
                            res({
                                msg: "Status changed successfully",
                                status: 1
                            })
                        }
                    ).catch(
                        (error) => {
                            
                            res({
                                msg: "Unable to change the status",
                                status: 0
                            })
                        }
                    )
                } catch (err) {
                    
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }


delete(id, employee_image) {
    return new Promise(
        (res, rej) => {
            try {
                EmployeeModel.deleteOne({ _id: id })
                    .then(
                        (success) => {
                            unlink('./public/images/employee/' + employee_image,
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










    
    
  
    


module.exports = EmployeeController; 