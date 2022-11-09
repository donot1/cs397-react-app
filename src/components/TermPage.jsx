import { useState } from 'react'; 
import CourseList from './CourseList';
import Modal from './Modal';
import CourseCart from './CourseCart';
import scheduleOverlap from '../utilities/conflict.js';

const terms = {
    Fall: "Fall",
    Winter: "Winter",
    Spring: "Spring"
};

const TermButton = ({term, selection, setSelection}) => (
    <div data-cy={term}>
        <input 
            type="radio" 
            id={term} 
            className="btn-check" 
            checked={term === selection}
            autoComplete="off" 
            onChange={() => setSelection(term)}
        />
        <label className="btn btn-success mb-1 p-2" htmlFor={term}>
            { term }
        </label>
    </div>
);

const TermSelector = ({selection, setSelection}) => (
    <div className="btn-group">
        {
            Object.keys(terms).map(term => 
                <TermButton key={term} 
                            term={term} 
                            selection={selection} 
                            setSelection={setSelection}/>)
        }
    </div>
);

const i2c = (courses, id) => {
    return courses[Object.keys(courses)[id]];
}

const TermPage = ({courses}) => {
    console.log("COURSES", courses);
    const [selectedTerm, setSelectedTerm] = useState(Object.keys(terms)[0]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [conflictCourses, setConflictCourses] = useState([]);
    const [open, setOpen] = useState(false);

    const termCourses = Object.values(courses).filter((course) => course.term === selectedTerm);
    console.log("TERM COURSES", termCourses);
    
    const toggleSelectedCourse = (item) => {
        setSelectedCourses(
        selectedCourses.includes(item) 
        ? selectedCourses.filter(x => x !== item)
        : [...selectedCourses, item]
        );

        setConflictCourses(
            !conflictCourses.includes(item) && scheduleOverlap(i2c(courses, item), selectedCourses.map((elem) => i2c(courses, elem)))
            ? [...conflictCourses, item]
            : conflictCourses.filter(x => x !== item)
        );
    }

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false);
    
    return (
        <div>
            <div>
            <TermSelector selectedTerm={selectedTerm} setSelection={setSelectedTerm} />
            <button className="btn btn-outline-dark" onClick={openModal}>See Courses</button>
            </div>
            <Modal open={open} close={closeModal}>
                <CourseCart courses={termCourses} selected={selectedCourses} />
            </Modal>
            <CourseList courses={termCourses} selected={selectedCourses} conflicts={conflictCourses} toggleSelected={toggleSelectedCourse} />
        </div>
    );
}


export default TermPage;