import React from 'react';
import "./Course.css";
import { Link } from 'react-router-dom';
import { useAuthState } from "../utilities/firebase";

const Course = ({id, course, selected, conflicts, toggleSelected}) => {
  const [user] = useAuthState();
	const isUserAuthenticated = (user !== null);
  return(
    <div className="card m-1 p-2" 
         data-cy="course"
         onClick={() => toggleSelected(id)}>
      <div className={`card-body ${selected.includes(id) ? 'selected' : ''} 
                                 ${conflicts.includes(id)? 'conflict' : ''}`}>
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <div className="card-text">{course.title}</div>
        </div>
        <div className="card-footer bg-white">
          <p className="card-text">{course.meets}</p>
        </div>
        { isUserAuthenticated
            ? <Link to={`/courses/${id}`}><i className="bi bi-pencil-square"></i></Link>
            : null }
    </div>
  );
}

export default Course;