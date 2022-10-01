import "./Course.css";

const Course = ({course}) => {
  return(
        <div className="card m-1 p-2">
            <div className="card-body">
                <h5 className="card-title text-center">{course.term} CS {course.number}</h5>
                <div className="card-text text-center">{course.title}</div>
                <div className="card-footer bg-white">{course.meets}</div>
            </div>
        </div>
  );
}

export default Course;