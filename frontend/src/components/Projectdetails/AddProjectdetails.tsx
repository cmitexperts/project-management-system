
import React, { useContext, useEffect, useRef, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
// import SelectList from "../SelectList";
import Button from "../Button";
import { Context } from "../../Context/Main";
import Select from 'react-select';
import axios from "axios";


interface AddTaskProps {
  open: boolean; 
  setOpen: (open: boolean) => void;
}

interface TaskFormInputs {
  project_details: string | Blob;
  project_employee: string | Blob;
  description: string | Blob;
  title: string;
  // date: string;
  hours: string;
}

const AddProjectDetails: React.FC<AddTaskProps> = ({ open, setOpen }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskFormInputs>();
  const { API_BASE_URL, notify, fetchEmployee, employee, projects, fetchprojects, PROJECT_DETAILS_URL, } = useContext(Context);


  const [project_employee, setProjectEmployee] = useState<string[]>([]);
  const [project_details, setProjectdetails] = useState<string[]>([]);
 
  useEffect(() => {
    fetchEmployee();
   
  }, []);

useEffect(() => {
    fetchprojects();
  }, []);

 

const submitHandler = async (data: TaskFormInputs) => {
  console.log('Submitted Data:', data);
  const formData = {
      project_employee: JSON.stringify(project_employee),
      project_details: JSON.stringify(project_details),
      hours: data.hours,
      description: data.description,
  };

  console.log('Form Data:', formData);

  try {
      const response = await axios.post(
          `${API_BASE_URL}${PROJECT_DETAILS_URL}/create`,
          formData,
     
      );

      if (response.data.status === 1) {
          reset();
          setProjectEmployee([]);
          setProjectdetails([]);
          notify(response.data.msg, response.data.status);
      } else {
          notify(response.data.msg, response.data.status);
      }
  } catch (error) {
      console.error('Error:', error);
  }
};

  return (
    <ModalWrapper open={open} setOpen={setOpen}>

      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          Add Task
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
        <div className="text-black">Employees</div>
          <div className='flex gap-2'>
          <Select
  className="w-full"
  name="project_employee"
  onChange={(opt: Array<{ value: string; label: string }>) => {
    return setProjectEmployee(
      opt.map((o) => o.value)
    );
  }}
  closeMenuOnSelect={false}
  isMulti={true}
  options={employee.map((e: { _id: string; name: string }) => {
    return {
      value: e._id,
      label: e.name,
    };
  })}
  />

          </div>
          <div className="text-black">Projects</div>
          <div className='flex gap-2'>
          <Select
  className="w-full"
  name="project_details"
  onChange={(opt: Array<{ value: string; label: string }>) => {
    return setProjectdetails(
      opt.map((o) => o.value)
    );
  }}
  closeMenuOnSelect={false}
  isMulti={true}
  options={projects.map((p: {
    title: any; _id: string; name: string 
}) => {
    return {
      value: p._id,
      label: p.title,
    };
  })}
  />

          </div>

        
        

       

            <div className='w-full'>
            <Textbox
  placeholder='Hours'
  type='number' // or 'time' if you want a time picker
  name='hours'
  label='Hours'
  className='w-full rounded'
  register={register("hours", { required: true })}
  error={errors.hours ? errors.hours.message : ""}
/>
            </div>
          </div>
          <div>
         
           <div className="text-black mt-4">Description</div>
            <textarea
              className="w-full h-24 p-2 border rounded"
              placeholder="Enter task description..."
              {...register("description", { required: "Description is required!" })} // Registering the textarea
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>} {/* Display error if exists */}
          </div>

          <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              label='Submit'
              type='submit'
              className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
            />
            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        
      </form>
    </ModalWrapper>
  );
};


export default AddProjectDetails;
