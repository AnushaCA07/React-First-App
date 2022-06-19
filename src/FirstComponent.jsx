import React from "react";

function FirstComponent(props) {
    function CallMe(){
      alert("Hello");
    }
     return(
       <div>
           <p>{props.name}</p>
           <p>{props.id}</p>
           
         <button onClick={CallMe}>
        Functions call
         </button>
          <h1>  </h1>
         </div>
       );
   }

export default FirstComponent;
