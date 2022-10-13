import { useState } from 'react'; 
import CourseList from './CourseList';
import Modal from './Modal';
import CourseCart from './CourseCart';

const terms = {
    Fall: "Fall Classes",
    Winter: "Winter Classes",
    Spring: "Spring Classes"
};

const TermButton = ({term, selection, setSelection}) => (
    <div>
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

const TermPage = ({courses}) => {
    const [selectedTerm, setSelectedTerm] = useState(Object.keys(terms)[0]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [open, setOpen] = useState(false);

    const termCourses = Object.values(courses).filter((course) => course.term === selectedTerm);
    
    const toggleSelectedCourse = (item) => {
        setSelectedCourses(
        selectedCourses.includes(item) 
        ? selectedCourses.filter(x => x !== item)
        : [...selectedCourses, item]
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
            <CourseList courses={termCourses} selected={selectedCourses} toggleSelected={toggleSelectedCourse} />
        </div>
    );
}


export default TermPage;