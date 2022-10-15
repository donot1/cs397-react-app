const timeToMin = (time) => {
    const hour = time.split(":")[0]; 
    const min = time.split(":")[1]; 
    return 60 * hour + min; 
}

const intervalOverlap = (a, b) => {
    return (a[0] <= b[0] && a[1] >= b[0] ||
            b[0] <= a[0] && b[1] >= a[0] );   
}

const stringOverlap = (a, b) => {
    return a.some((chr) => b.includes(chr));
}

const parseCourse = (course) => {
    const sep = course.meets.split(" ");
    const days = sep[0].match(/[A-Z][a-z]*/g); 
    const time = sep[1].split("-")
    return {days: days, time: time}; 
}

const courseOverlap = (a, b) => {
    console.log("A");
    console.log(a);
    console.log("B");  
    console.log(b); 
    const clean_a = parseCourse(a); 
    const clean_b = parseCourse(b); 
    return stringOverlap(clean_a.days, clean_b.days) &&
            intervalOverlap(clean_a.time, clean_b.time); 
}

const scheduleOverlap = (course, courseArr) => {
    if (undefined === courseArr) return true;
    return courseArr.some((elem) => courseOverlap(elem, course)); 
}

export default scheduleOverlap;