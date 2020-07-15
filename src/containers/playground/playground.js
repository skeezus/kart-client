import React, { useEffect } from "react";

import './playground.css'


const PlaygroundContainer = (props) => {
  
  useEffect(() => { // Similar to componentDidMount and componentDidUpdate:
    document.addEventListener("keydown", function(e) {
      if(e.keyCode === 9) { // 9 is tab key
        //document.execCommand('insertHTML', false, '&#009'); //add tab
        //document.execCommand('indent', false, null)
        const TAB_SIZE = 3
        document.execCommand('insertText', false, ' '.repeat(TAB_SIZE));

        e.preventDefault() // prevent focusing on next element (the search box in some cases)
      }
    })
  });

    return(
        <>
          <div className="container">
            <pre>
              <div className="editor" contentEditable="true">
                  {
                    Array(20).fill().map((_,i) => (
                      <p className="rowNumber">{i+1}</p>
                    ))
                  }
              </div>
            </pre>
          </div>
        </>
    );
}


export default PlaygroundContainer;