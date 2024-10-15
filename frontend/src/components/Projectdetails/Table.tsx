import { useContext, useEffect } from "react";
import TableRow from "./TableRow";
import { Context } from "../../Context/Main";

const Table: React.FC = () => {
    const { projectsdetails, fetchprojectsdetails } = useContext(Context);
  
    useEffect(() => {
      fetchprojectsdetails();
    }, []);
    
  console.log(
    "projectdetails", projectsdetails
  );
    // const deletedata = (pro_id: string, image: string) => {
    //   // Your delete logic
    // };
  
    const TableHeader = () => (
      <thead className='w-full border-b border-gray-300'>
        <tr className='w-full text-black text-left'>
          <th className='py-2'>Employees</th>
          <th className='py-2 line-clamp-1'>Projects</th>
          <th className='py-2'>Hours</th>
          <th className='py-2'>Description</th>
       
          <th className='py-2'>Actions</th>
        </tr>
      </thead>
    );
  
  function deletedata(pro_id: string): void {
    throw new Error("Function not implemented.");
  }

    return (
      <div className='bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <TableHeader />
            <tbody>
              {Array.isArray(projectsdetails) && projectsdetails.map((p) => (
                <TableRow key={p._id} projectdetails={p} deletedata={deletedata} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Table;
  