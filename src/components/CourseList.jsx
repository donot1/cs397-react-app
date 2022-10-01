import Course from './Course';
import './CourseList.css';

const CourseList = ({courses}) => (
    <div className="course-list">
        {
            Object.entries(courses).map(([id, course]) => {
                return <Course key={id} course={course} />
            })
        }
    </div>
);

export default CourseList;