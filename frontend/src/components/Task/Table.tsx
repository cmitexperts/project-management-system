import { useContext, useEffect } from "react";
import TableRow from "./TableRow";
import { Context } from "../../Context/Main";

const Table: React.FC = () => {
    const { projects, fetchprojects } = useContext(Context);
    console.log("projects", projects);
  
    useEffect(() => {
      fetchprojects();
    }, []);
  
    const deletedata = (pro_id: string, image: string) => {
      // Your delete logic
    };
  
    const TableHeader = () => (
      <thead className='w-full border-b border-gray-300'>
        <tr className='w-full text-black text-left'>
          <th className='py-2'>Project Title</th>
          <th className='py-2 line-clamp-1'>Created At</th>
          <th className='py-2'>Images</th>
          <th className='py-2'>Team</th>
          <th scope="col" className="px-6 py-3">Task Stage</th>
          <th className='py-2'>Actions</th>
        </tr>
      </thead>
    );
  
    return (
      <div className='bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <TableHeader />
            <tbody>
              {Array.isArray(projects) && projects.map((pro) => (
                <TableRow key={pro._id} project={pro} deletedata={deletedata} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Table;
  