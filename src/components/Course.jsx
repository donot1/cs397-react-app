import React from 'react';
import "./Course.css";

const Course = ({course}) => {
  return(
    <div className="card m-1 p-2">
      <div className="card-body">
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