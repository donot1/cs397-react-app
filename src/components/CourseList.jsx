import Course from './Course';
import './CourseList.css';

const CourseList = ({courses, selected, conflicts, toggleSelected}) => (
    <div className="course-list">
        {
            Object.entries(courses).map(([id, course]) => {
                return <Course key={id} id={id} course={course} selected={selected} conflicts={conflicts} toggleSelected={toggleSelected} />
            })
        }
    </div>
);

export default CourseList;