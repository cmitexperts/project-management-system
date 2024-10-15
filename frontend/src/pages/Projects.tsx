import React, { useState } from "react";

import { useParams } from "react-router-dom";
import Title from "../components/Title";
 import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";

 import Table from "../components/Task/Table";
import AddTask from "../components/Task/AddTask"; 

const Projects = () => {
  const params = useParams();
 
  
  const [open, setOpen] = useState(false);


  const status = params?.status || "";

  return  (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Project` : "Project"} />

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

    
     
 
      <AddTask open={open} setOpen={setOpen} />  
    </div>
    </div>
  );
};

export default Projects;