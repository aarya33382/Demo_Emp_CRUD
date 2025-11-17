// import { useEffect, useState } from 'react';
import './App.css';
import Employee from './Components/Employee'
import Contextprovider from './Components/contextProvider';
function App() {
    

    return (
        <div className='h-screen w-screen border border-blue-700 flex'>

           <Contextprovider>
            <Employee />
           </Contextprovider>
        </div>
    );
    
   
}

export default App;