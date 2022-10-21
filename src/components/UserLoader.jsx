import { useDbData } from "../utilities/firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import TermPage from './TermPage'
import AddCourseForm from './AddCourseForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppData = () => {
  const [data, error] = useDbData('/');

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  console.log(data.courses);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TermPage courses={data.courses}/>} />
      <Route path="/courses/:id" element={<AddCourseForm data={data}/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default AppData;
