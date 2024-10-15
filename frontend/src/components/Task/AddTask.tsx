
import React, { useContext, useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import SelectList from "../SelectList";
import Button from "../Button";
import { Context } from "../../Context/Main";
import Select from 'react-select';
import axios from "axios";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"] as const;

interface AddTaskProps {
  open: boolean; 
  setOpen: (open: boolean) => void;
}

interface TaskFormInputs {
  title: string;
  date: string;
}

const AddTask: React.FC<AddTaskProps> = ({ open, setOpen }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskFormInputs>();
  const { API_BASE_URL, notify, fetchEmployee, employee, PROJECT_URL } = useContext(Context);


  const [project_employee, setProjectEmployee] = useState<string[]>([]);
  const [stage, setStage] = useState(LISTS[0]); // Initialize with the first stage

  useEffect(() => {
    fetchEmployee();
  }, []);


 
  
  const submitHandler = async (data: { title: string | Blob; date: string | Blob; }) => {
    console.log("Submitted Data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("project_employee", JSON.stringify(project_employee));  // Use selectedEmployees from context
   
   
    
    formData.append("task_stage", stage);
    formData.append("date", data.date);


    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files.length > 0) {
      formData.append("project_image", fileInput.files[0]);
    }


    await  axios.post(`${API_BASE_URL}${PROJECT_URL}/create`, formData)
      .then((success) => {
        if (success.data.status === 1) {
          reset();
          setProjectEmployee(null); // Reset selected employees
          setStage(LISTS[0]); // Reset stage
          notify(success.data.msg, success.data.status);
        } else {
          notify(success.data.msg, success.data.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>

      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          Add Task
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Task Title'
            type='text'
            name='title'
            label='Task Title'
            className='w-full rounded'
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <div className="text-black">Assign to</div>
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

          <div className='flex gap-4'>
            <SelectList
              label='Task Stage'
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
              name="task_stage"
            />

            <div className='w-full'>
              <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register("date", { required: "Date is required!" })}
                error={errors.date ? errors.date.message : ""}
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='w-full flex items-center justify-center mt-4'>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <input
                name='project_image'
                type="file"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
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
        </div>
      </form>
    </ModalWrapper>
  );
};


export default AddTask;
