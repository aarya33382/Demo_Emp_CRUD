import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { context } from './contextProvider';

export default function Employee() {
  const { allEmp, employee, setallEmp, setEmployee ,setIsEdit,isEdit} = useContext(context);

  useEffect(() => {
    axios.get("https://localhost:7271/api/Employe/GetAllEmployeeDetails")
      .then(res => {
        console.log(res);
        setallEmp(res.data);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEmployee((prevEmp) => ({
      ...prevEmp,
      [name]: e.target.type === 'checkbox' ? e.target.checked : value
    }));
  };
//Submit
  const handleSubmit = (e) => {
  
    e.preventDefault();
    if(!isEdit)
    {

      axios.post("https://localhost:7271/api/Employe/SaveEmployeeDetail", employee)
      .then((res) => {
        console.log("Saved successfully", res.data);
        
        setallEmp((prev) => [...prev,res.data])
        setEmployee({
          id:0,
          name:"",
          age:0,
          gender:1,
          phoneNumber:"",
          isVacinated:false,
          adress:"",
          designation:1
        });
      })
      .catch((error) => console.error(error))
    }
    else{
      axios.put(`https://localhost:7271/api/Employe/UpdateEmployee/${employee.id}`,employee)
      .then((res)=>
      {
        console.log("Successfully updated",res.data);
        setallEmp((prev) => 
          prev.map((emp) => (emp.id === employee.id ? res.data : emp))
        );

        setEmployee({
          id: 0,
          name: "",
          age: 0,
          gender: 1,
          phoneNumber: "",
          isVacinated: false,
          adress: "",
          designation: 0
        });

        setIsEdit(false);
        

      })
      .catch((error)=>
      {
        console.error(error);
      })
    }

    
    
  }

  // Delete
  const handleDelete = async (id)=>
  {
    try{
          let resp=await axios.delete(`https://localhost:7271/api/Employe/DeleteEmployee/${id}`)
          console.log("Deleted",resp.data);
          setallEmp((prev)=>
          {
            return(
              prev.filter((emp)=>emp.id!==id)
            )
          })          
        
      }
      catch(error)
      {
        console.error(error);
      }
  }
  //update
  const handleEdit = (emp) => {
    // setEmployee({
    //   id: emp.id || 0,
    //   name: emp.name || "",
    //   phoneNumber: emp.phoneNumber || "",
    //   age: emp.age || 0,
    //   gender: emp.gender || 1,
    //   isVacinated: emp.isVacinated || false,
    //   adress: emp.adress || "",
    //   designation: emp.designation || 1
    // });
    setEmployee(emp);
    setIsEdit((prev)=>!prev);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 w-full">
      {/* Form Section */}
      <div className='form w-full md:w-2/5 p-6 border border-red-500 rounded-lg shadow-md bg-white'>
        <h2 className="text-xl font-semibold mb-4">Employee Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <input type="text" id='name' name='name' value={employee.name} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium">Phone Number</label>
            <input type="text" name='phoneNumber' id='phone' value={employee.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="age" className="block font-medium">Age</label>
            <input type="text" id='age' name='age' value={employee.age} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="font-medium">Gender:</label>
            <div>
              <input type="radio" name='gender' id='male' value={1} checked={employee.gender == 1} onChange={handleChange} className="mr-2" />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input type="radio" name='gender' id='female' value={2} checked={employee.gender == 2} onChange={handleChange} className="mr-2" />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block font-medium">Address</label>
            <input type="text" id='address' name='adress' value={employee.adress} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="designation" className="block font-medium">Designation</label>
            <select name="designation" value={employee.designation} id="designation" onChange={handleChange} className="w-full p-2 border rounded">
              <option value={1}>Employee</option>
              <option value={2}>Manager</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id='isVaccinated' name='isVacinated' checked={employee.isVacinated} onChange={handleChange} />
            <label htmlFor="isVaccinated" className="font-medium">Is Vaccinated</label>
          </div>
          
          <button className='border border-amber-300 bg-blue-400 rounded text-white p-1 ' >{!isEdit?'Add Employee':'UpdateEmploye'}</button>
        </form>
      </div>

      {/* Employee List */}
      <div className='output w-full md:w-3/5 p-6 border border-green-500 rounded-lg shadow-md bg-white overflow-auto'>
        <h1 className='text-center font-bold text-2xl mb-4'>Employee List</h1>
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='p-2 border'>Id</th>
              <th className='p-2 border'>Name</th>
              <th className='p-2 border'>Phone Number</th>
              <th className='p-2 border'>Is Vaccinated</th>
              <th className='p-2 border'>Age</th>
              <th className='p-2 border'>Gender</th>
              <th className='p-2 border'>Address</th>
              <th className='p-2 border'>Designation</th>
              <th className='p-2 border'>Operate</th>
            </tr>
          </thead>
          <tbody>
            {allEmp.map((emp) => (
              <tr key={crypto.randomUUID()} className="even:bg-gray-100 hover:bg-gray-200">
                <td className='p-2 border'>{emp.id}</td>
                <td className='p-2 border'>{emp.name}</td>
                <td className='p-2 border'>{emp.phoneNumber}</td>
                <td className='p-2 border'>{emp.isVacinated ? 'True' : 'False'}</td>
                <td className='p-2 border'>{emp.age}</td>
                <td className='p-2 border'>{emp.gender == 1 ? 'Male' : 'Female'}</td>
                <td className='p-2 border'>{emp.adress}</td>
                <td className='p-2 border'>{emp.designation == 1 ? 'Employee' : 'Manager'}</td>
                <td className='p-2  flex gap-2'>
                  <button className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition' onClick={()=>handleEdit(emp)}>Edit</button>
                  <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition' onClick={()=>{handleDelete(emp.id)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
