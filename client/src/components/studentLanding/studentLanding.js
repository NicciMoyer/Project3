import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import coloredPencilsBottom from "../images/colored-pencils-bottom.jpg";

function studentLanding() {

  return (
    <div styles={{ backgroundImage: `url(${coloredPencilsBottom})` }}>
      
    <h1>Welcome, ${teacher.name}!</h1>

    <row>
      <col className="classcol" size="col-md-2 col-12">
        <ClassList></ClassList>

      </col>
      <col className="feedbackCol" size="col-md-5 col-12">
        <Graded></Graded>

      </col>
      <col className="gradedCol" size="col-md-5 col-12">
        <Feedback></Feedback>

      </col>
    </row>
         
             
      </div>
    );
  }
}, [])

export default studentLanding;
