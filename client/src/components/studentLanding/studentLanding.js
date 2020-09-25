import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import coloredPencilsBottom from "../images/colored-pencils-bottom.jpg";

function classLanding(props) {
  const [student, setStudent = useState({})

  const {id} = useParams()
  useEffect(() => {
    API.getStudent(id)
      .then(res => setStudent(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <div styles={{ backgroundImage: `url(${coloredPencilsBottom})` }}>
      
        <row>
          <col size="col-md-6 col-12">
         
              <h1>
               Students
            </h1>
              <br></br>
        <ul>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
          <li>Student</li>
        </ul>

      </col>
        
        </row>
        <row>
          <col size="col-md-6 col-12">
            
              <h1>Assignments</h1>
              <br></br>
        <ul>
          <li>Assignment</li>
          <li>Assignment</li>
          <li>Assignment</li>
          <li>Assignment</li>
          <li>Assignment</li>
        </ul>
          </col>
        </row>
       
          
      
      </div>
    );
  }


export default classLanding;
