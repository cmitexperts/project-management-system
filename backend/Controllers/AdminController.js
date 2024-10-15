const { createToken, encodePassword, decodePassword } = require("../helper");
const AdminModel = require("../Models/AdminModel");

class AdminController {
   
    register(data) {
                return new Promise(
                    async (res, rej) => {
                        try {
                            const { name, email, password, role } = data;
        // console.log(data);
                            if (!name || !email || !password || !role) {
                                return rej({ status: 0, msg: "All fields are required" });
                            }
                            // Check if the user already exists
                            const existingUser = await AdminModel.findOne({ email });
                            if (existingUser) {
                                return rej({ status: 0, msg: 'User already exists' });
                            }
        
                            // Create a new user
                            const newAdmin = new AdminModel({
                                name,
                                email,
                                password: encodePassword(password),
                                role
                            });
        
                            // Save the user to the database
                            await newAdmin.save();
        
                            // Send a success response
                            res({ status: 1, msg: 'User registered successfully' });
        
                        } catch (err) {
                            console.log(err.message);
        
                            rej({
                                msg: 'Internal server error',
                                status: 0
                            })
                        }
                    }
                )
            }
        
            // signin(data) {
            //             return new Promise(
            //                 async (res, rej) => {
            //                     try {
            //                         const admin = await AdminModel.findOne({
            //                             email: data.email
            //                         });
            //                         if (admin && (decodePassword(admin.password) == data.password && role)) {
            //                             const token = createToken(admin)
            //                             res({
            //                                 msg: "Login successful",
            //                                 status: 1,
            //                                 admin,
            //                                 token,
            //                                 role
            //                             })
            //                         }
            //                         else {
            //                             rej({
            //                                 msg: "Invailed credentails",
            //                                 status: 0,
            //                             })
            //                         }
            //                     } catch (err) {
            //                         console.error(err.message);
            //                         rej({
            //                             msg: 'Internal server error',
            //                             status: 0
            //                         })
            //                     }
            //                 }
            //             )
                
            //         }
                         
            signin(data) {

                console.log( "data", data);
                return new Promise(
                  async (res, rej) => {
                    try {
                      const admin = await AdminModel.findOne({
                        email: data.email
                      });
              
                      // Check for role existence and match the role
                      if (admin && decodePassword(admin.password) === data.password && data.role === admin.role) {
                        const token = createToken(admin);
                        res({
                          msg: "Login successful",
                          status: 1,
                          admin,
                          token,
                        //   role: admin.role // Ensure correct role is sent
                        });
                      } else {
                        rej({
                          msg: "Invalid credentials or role mismatch",
                          status: 0
                        });
                      }
                    } catch (err) {
                      console.error(err.message);
                      rej({
                        msg: 'Internal server error',
                        status: 0
                      });
                    }
                  }
                );
              }
              
    

    async read(id) {
        return new Promise(async (res, rej) => {
            try {
                const admin = await AdminModel.findById(id);
                if (admin) {
                    res({
                        msg: "Admin found",
                        status: 1,
                        admin,
                    });
                } else {
                    rej({
                        msg: "Admin not found",
                        status: 0
                    });
                }
            } catch (err) {
                console.error(err);
                rej({
                    msg: 'Internal server error',
                    status: 0
                });
            }
        });
    }

    async updateStatus(id, status) {
        return new Promise(async (res, rej) => {
            try {
                const updatedAdmin = await AdminModel.findByIdAndUpdate(id, { admin_type: status }, { new: true });
                if (updatedAdmin) {
                    res({
                        msg: "Status updated successfully",
                        status: 1,
                        admin: updatedAdmin,
                    });
                } else {
                    rej({
                        msg: "Admin not found",
                        status: 0
                    });
                }
            } catch (err) {
                console.error(err);
                rej({
                    msg: 'Internal server error',
                    status: 0
                });
            }
        });
    }

    async edit(id, data) {
        return new Promise(async (res, rej) => {
            try {
                const updatedAdmin = await AdminModel.findByIdAndUpdate(id, data, { new: true });
                if (updatedAdmin) {
                    res({
                        msg: "Admin updated successfully",
                        status: 1,
                        admin: updatedAdmin,
                    });
                } else {
                    rej({
                        msg: "Admin not found",
                        status: 0
                    });
                }
            } catch (err) {
                console.error(err);
                rej({
                    msg: 'Internal server error',
                    status: 0
                });
            }
        });
    }

    async delete(id) {
        return new Promise(async (res, rej) => {
            try {
                const deletedAdmin = await AdminModel.findByIdAndDelete(id);
                if (deletedAdmin) {
                    res({
                        msg: "Admin deleted successfully",
                        status: 1,
                    });
                } else {
                    rej({
                        msg: "Admin not found",
                        status: 0
                    });
                }
            } catch (err) {
                console.error(err);
                rej({
                    msg: 'Internal server error',
                    status: 0
                });
            }
        });
    }
}

module.exports = AdminController;


