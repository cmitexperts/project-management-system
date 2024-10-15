import React, { useState } from "react";

import { useParams } from "react-router-dom";

 import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";

 import Table from "../components/Projectdetails/Table";
import AddProjectdetails from "../components/Projectdetails/AddProjectdetails"; 

const Projectsdetails = () => {
  const params = useParams();
 
  
  const [open, setOpen] = useState(false);


  const status = params?.status || "";

  return  (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
      <h2>Project Details</h2>

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>
<div>

<Table/>

    
     
 
      <AddProjectdetails  open={open} setOpen={setOpen} />  
    </div>
    </div>
  );
};

export default Projectsdetails;