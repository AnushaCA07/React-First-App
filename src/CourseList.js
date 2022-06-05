import React from 'react';

function CourseList(props) {
    return props.courses1.map(function(course) {
      return (
        <div key={course.id}>
          <span>
            <a href={course.url}><h4>{course.title}</h4></a>
          </span>
          <span>by <strong>{course.author}</strong></span>
          <span>| Video Hours: {course.hours_video}</span>
          <span>| Number of Lectures: {course.number_of_lectures}</span>
          <span>| Rating: {course.rating}</span>
          <br/><br/>
        </div>
      );
    }); 
  }
  
  export default CourseList;