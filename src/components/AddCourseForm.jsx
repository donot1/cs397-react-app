import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDbUpdate } from "../utilities/firebase";


const validateCourseData = (key, val) => {
    switch (key) {
      case 'title':
        return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
      case 'meets':
        return /^\w+@\w+[.]\w+/.test(val)
          ? ''
          : 'must contain name@domain.top-level-domain';
      default:
        return '';
    }
  };

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name}
            defaultValue={state.values?.[name]} onChange={change} />
    </div>
);


export const useFormData = (values = {}) => {
    const [state, setState] = useState(() => ({ values }));

    const change = (evt) => {
        const { id, value } = evt.target;
        const values = { ...state.values, [id]: value };
        setState({ values });
    };

    return [state, change];
};



const AddCourseForm = ({ data }) => {
    console.log("ACF DATA");
    console.log(data); 
    const { id } = useParams();
    const [state, change] = useFormData(Object.keys(data.courses)[id]);
    const [updateData, result] = useDbUpdate(`/courses/${Object.keys(data.courses)[id]}`)
    const navigate = useNavigate();
    const submitEvent = ({ event }) => { updateData(event) };
    return (
        <div className="container pt-3">
            <h2>Edit Course Information</h2>
            <form>
                <InputField name="title" text="Number" state={state} change={change} />
                <InputField name="meets" text="Meeting Times" state={state} change={change} />
                <div className="d-flex">
                  <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
                  <button type="submit" className="btn btn-primary me-2" onClick={() => {
                    submitEvent({ event: state.values });
                    if (result) {
                        return;
                    }
                    navigate(-1);
                  }}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddCourseForm;
