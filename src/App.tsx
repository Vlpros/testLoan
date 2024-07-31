import Form2 from './forms/Address';
import {Test} from './forms/PersonalData/index'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form3 from './forms/FInal';
function App() {
  return (
  <BrowserRouter>
     <Routes>
       <Route path="/" element={<Test/>} />
       <Route path="/address" element={<Form2/>} />
       <Route path="/final" element={<Form3/>} />
      </Routes>
     </BrowserRouter> 
    
  );
}

export default App;
