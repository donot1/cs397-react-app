import CourseList from "./CourseList";

const CourseCart = ({courses, selected}) => {
  return(
  <div className="courseCart">
    {
      selected.length === 0
      ? <h2>Your schedule is empty</h2>
      : Object.entries(courses).filter(([id, course]) => selected.includes(id)).map(([id, course]) => {
        return <div key={id}> {course.name}--{course.title} </div>
    })
    }
  </div>
    );
};

export default CourseCart;
