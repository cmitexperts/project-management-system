
import React, { useContext, useEffect } from 'react';
import Button from '../Button';
import { Context } from '../../Context/Main';
import { formatDate } from '../../utils';

import axios from 'axios';

interface Employee {
  _id: string;
  name: string;
}

interface Project {
  assign_id: any;

  image: string;
  _id: string;
  title: string;
  date: string;
  stage: string;
  project_employee?: Employee[]; // Make this optional to avoid errors
}

const TableRow: React.FC<{ project: Project; deletedata: (pro_id: string, image: string) => void; }> = React.memo(({ project, deletedata }) => {
  const { API_BASE_URL, PROJECT_URL, fetchprojects, notify, projectsImageBaseUrl, fetchEmployee,  employee: employees } = useContext(Context);
  
  
  useEffect(() => {
    fetchprojects();
  }, []);
  useEffect(() => {
    fetchEmployee();
  }, []);


  console.log("Project data:", project);
 

  const assignedEmployeeIds = project.assign_id?.map((emp: { _id: any; }) => emp._id) || [];
  console.log("Assigned Employee IDs:", assignedEmployeeIds); 

  useEffect(() => {
    if (project.image) {
      console.log("project url", `${API_BASE_URL}${projectsImageBaseUrl}/${project.image}`);
    }
  }, [project.image, API_BASE_URL, projectsImageBaseUrl]);



  const deleteData = (project_id: string, image: string) => {
    axios.delete(API_BASE_URL + PROJECT_URL + `/delete/${project_id}/${image}`)
        .then(
            (success) => {
                if (success.data.status == 1) {
                  fetchprojects();
                }
                notify(success.data.msg, success.data.status)
            }
        ).catch(
            () => {
  
            }
        )
  
  }
  return (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <p className='w-full line-clamp-2 text-base text-black'>{project.title}</p>
        </div>
      </td>
      <td className='py-2'>
        <span className='text-sm text-gray-600'>{formatDate(new Date(project.date))}</span>
      </td>
      <td className='py-2'>
        {project.image ? (
          <img width={100} src={`${API_BASE_URL}${projectsImageBaseUrl}/${project.image}`} alt={project.title} />
        ) : (
          <span>No Image</span>
        )}
      </td>
      <td className='py-2'>
      <td className='py-2'>
      <td className='py-2'>
      <div className='flex'>
          {project.assign_id && project.assign_id.length > 0 && employees ? (
            project.assign_id.map((assignedEmp: { _id: any; }) => {
              const assignedEmployee = employees.find((emp: { _id: any; }) => emp._id === assignedEmp._id); // Find the employee with the matching ID
              if (assignedEmployee) {
                return (
                  <div key={assignedEmployee._id}>
                    {assignedEmployee.name}
                  </div>
                );
              }
              return null; // Return null if the employee is not found
            })
          ) : (
            <span>No Employees Assigned</span>
          )}
        </div>
</td>

</td>


      
        
</td>
      <td className="px-2 py-2">
        <p className='w-full line-clamp-2 text-base text-black'>{project.stage}</p>
      </td>
      <td className='py-2 flex gap-4 md:gap-4 '>
      {/* <Button
          className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
          label='Delete'
          type='button'
          onClick={() => deletedata(project._id, project.image)}
        /> */}
        <Button
          className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
          label='Delete'
          type='button'
          onClick={() => deleteData(project._id, project.image)}
        />
      </td>
    </tr>
  );
});

export default TableRow;



