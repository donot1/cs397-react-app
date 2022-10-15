import React from 'react';
import "./Course.css";

const Course = ({id, course, selected, conflicts, toggleSelected}) => {
  return(
    <div className="card m-1 p-2" onClick={() => toggleSelected(id)}>
      <div className={`card-body ${selected.includes(id) ? 'selected' : ''} 
                                 ${conflicts.includes(id)? 'conflict' : ''}`}>
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <div className="card-text">{course.title}</div>
        </div>
        <div className="card-footer bg-white">
          <p className="card-text">{course.meets}</p>
        </div>
    </div>
  );
}

export default Course;