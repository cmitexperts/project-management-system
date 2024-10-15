import axios from 'axios';
import React, { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const Context = createContext();

  import 'react-toastify/dist/ReactToastify.css';




export default function Main(props) {
    const[employee, setEmployee] = useState([]);
    const [employeeImageBaseUrl, setEmpImgUrl] = useState("");
    const[projects, setProjects] = useState([]);
    const [projectsImageBaseUrl, setProImgUrl] = useState("");
    const[projectsdetails, setProjectsdetails] = useState([]);
    // const [projectsImageBaseUrl, setProImgUrl] = useState("");
    
//    const[admin, setAdmin] = useState(null);
    const notify = (msg, status) => toast(msg, { type: status ? 'success' : 'warning' });
    const API_BASE_URL= "http://localhost:5000";
    const EMPLOYEE_URL = "/employee";
    const PROJECT_URL = "/projects";
    const PROJECT_DETAILS_URL = "/projectsdetails";

    const fetchprojectsdetails = ( id = null)=>{
        let API= API_BASE_URL + PROJECT_DETAILS_URL;
        if(id){
           API += `/${id}`;
   
        }else{
   axios.get(API)
   .then(
       (success) => {
           if (success.data.status == 1) {
            setProjectsdetails(success.data.projectsdetails);
            //    setProImgUrl(success.data.image_base_url)
           } else {
            setProjectsdetails([]);
          
           }
   
       }
   ).catch(
       (error) => {
      
        setProjectsdetails([]);
       }
   ) 
   
        }
   }
   
const fetchprojects = ( id = null)=>{
     let API= API_BASE_URL + PROJECT_URL;
     if(id){
        API += `/${id}`;

     }else{
axios.get(API)
.then(
    (success) => {
        if (success.data.status == 1) {
            setProjects(success.data.projects);
            setProImgUrl(success.data.image_base_url)
        } else {
            setProjects([]);
        }

    }
).catch(
    (error) => {
   
        setProjects([]);
    }
) 

     }
}


    const fetchEmployee = (id = null) => {
        let API = API_BASE_URL + EMPLOYEE_URL;
        if (id) {
            API += `/${id}`;
        }
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setEmployee(success.data.employee);
                        setEmpImgUrl(success.data.image_base_url)
                    } else {
                        setEmployee([]);
                    }

                }
            ).catch(
                (error) => {
               
                    setEmployee([]);
                }
            ) 
    }

    return (
        <Context.Provider value = {{ PROJECT_DETAILS_URL, fetchprojectsdetails, projectsdetails,  projects, fetchprojects, projectsImageBaseUrl, PROJECT_URL, employee, fetchEmployee, API_BASE_URL, EMPLOYEE_URL, notify, employeeImageBaseUrl }}>
            <ToastContainer />
            {props.children}

        </Context.Provider>
    )
}

export { Context };