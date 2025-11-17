import { createContext,useState } from "react";

const context = createContext();

export default function Contextprovider({children})
{
  const [isEdit,setIsEdit]=useState(false);
  const [allEmp,setallEmp]=useState([]);
  const[employee,setEmployee]= useState({ 
    id:0,
    name:"",
    age:0,
    gender:1,
    phoneNumber:"",
    isVacinated:false,
    adress:"",
    designation:1

  });


  return (
    <context.Provider value={{allEmp,employee,setallEmp,setEmployee,isEdit,setIsEdit}}>
      {children}
    </context.Provider>
  );
}

export{context};