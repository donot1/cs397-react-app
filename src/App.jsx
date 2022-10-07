import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import TermPage from './components/TermPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useJsonQuery } from "./utilities/fetch";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
    <div>
      <h1>{schedule.title} </h1>
      <TermPage courses={schedule.courses}></TermPage>
    </div>
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
