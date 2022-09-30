const CourseList = ({courses}) => (
    <div>
        { Object.entries(courses).map(([_, course]) => 
            <p>{course.term} CS {course.number}: {course.title}</p>)}
    </div>
);

export default CourseList;