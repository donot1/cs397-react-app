import { useState } from 'react';
import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import TermPage from './components/TermPage'
import AddCourseForm from './components/AddCourseForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useJsonQuery } from "./utilities/fetch";


const queryClient = new QueryClient(); 

const Schedule = () => {
  const [schedule, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  if (error) {
    return <p> Error loading schedule.</p>;
  }
  else if (isLoading) {
    return <p>Loading schedule...</p>;
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TermPage courses={schedule.courses}/>} />
      <Route path="/courses/:id" element={<AddCourseForm data={schedule}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <Schedule />
        </div>
      </QueryClientProvider>
  );
}

export default App;
