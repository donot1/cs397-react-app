import { useState } from 'react'; 
import CourseList from './CourseList';

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
    const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
    const termCourses = Object.values(courses).filter((course) => course.term === selection);
    console.log(courses);
    console.log(selection); 
    console.log(terms);  
    return (
        <div>
            <TermSelector selection={selection} setSelection={setSelection} />
            <CourseList courses={termCourses} />
        </div>
    );
}


export default TermPage;