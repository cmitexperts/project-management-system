


import React, { useContext, useEffect } from 'react';
import Button from '../Button';
import { Context } from '../../Context/Main';
import axios from 'axios';

interface Employee {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
}

interface ProjectDetails {
  _id: string;
  title?: React.ReactNode;
  hours?: number;
  description?: string;
  employee_id: Employee[];
  project_id: Project[];
}

const TableRow: React.FC<{ projectdetails: ProjectDetails; deletedata: (pro_id: string) => void }> = React.memo(({ projectdetails, deletedata }) => {
  const { API_BASE_URL, PROJECT_URL, fetchprojects, notify, fetchEmployee, employee: employees, fetchprojectsdetails, projects, PROJECT_DETAILS_URL } = useContext(Context);

  useEffect(() => {
    fetchprojects();
    fetchEmployee();
    fetchprojectsdetails();
  }, []);

  console.log("Project Details:", projectdetails);
console.log("Projects:", projects);
 
if (projectdetails.project_id) {
  console.log("Project IDs:", projectdetails.project_id);
} else {
  console.log("Project IDs is undefined or not an array");
}
  const deleteData = (project_id: string) => {
    axios
      .delete(`${API_BASE_URL}${PROJECT_DETAILS_URL}/delete/${project_id}`)
      .then((success) => {
        if (success.data.status === 1) {
          fetchprojectsdetails();
        }
        notify(success.data.msg, success.data.status);
      })
      .catch(() => {
        notify('Failed to delete project', 0);
      });
  };

  return (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex">
          {projectdetails.employee_id && projectdetails.employee_id.length > 0 && employees ? (
            projectdetails.employee_id.map((assignedEmp) => {
              const assignedEmployee = employees.find((emp) => emp._id === assignedEmp._id);
              return assignedEmployee ? <div key={assignedEmployee._id}>{assignedEmployee.name}</div> : null;
            })
          ) : (
            <span>No Employees Assigned</span>
          )}
        </div>
      </td>

      <td className="py-2">
      <div className='flex'>
  {projectdetails.project_id && projectdetails.project_id.length > 0 && Array.isArray(projects) ? (
    projectdetails.project_id.map((_projectPro) => {
      console.log("Mapping project ID:", _projectPro); // Log the current project ID

      // If _projectPro is an object, you can log its properties. If it's a string, log it directly.
      console.log("Current Project ID Object:", _projectPro); // Log the project ID object if it's an object

      // Ensure _projectPro has an _id property
      const projectId = typeof _projectPro === 'object' ? _projectPro._id : _projectPro; 
      console.log("Using Project ID:", projectId); // Log the project ID used for finding

      // Check if projects is an array and log its contents
      console.log("All Projects:", projects); 

      const projectPro = projects.find(pro => pro._id === projectId);
      console.log("Found Project:", projectPro); // Log the found project

      return projectPro ? <div key={projectPro._id}>{projectPro.title}</div> : null;
    })
  ) : (
    <span>No Projects Assigned</span>
  )}
</div>

      </td>

      <td className="py-2">
        <span className="text-sm text-gray-600">{projectdetails.hours}</span>
      </td>

      <td className="px-2 py-2">
        <p className="w-full line-clamp-2 text-base text-black">{projectdetails.description}</p>
      </td>

      <td className="py-2 flex gap-4 md:gap-4">
        <Button
          className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
          label="Delete"
          type="button"
          onClick={() => deleteData(projectdetails._id)}
        />
      </td>
    </tr>
  );
});

export default TableRow;
