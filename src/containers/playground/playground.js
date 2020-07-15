import React, { useEffect } from "react";

import './playground.css'


const PlaygroundContainer = (props) => {
  
    useEffect(() => { // Similar to componentDidMount and componentDidUpdate:
        document.addEventListener("keydown", function(e) {
            if(e.keyCode === 8) { // 8 is delete key
                //e.preventDefault() // prevent default if close to deleting number
            } else if(e.keyCode === 9) { // 9 is tab key
                //document.execCommand('insertHTML', false, '&#009'); //add tab
                //document.execCommand('indent', false, null)
                const TAB_SIZE = 3
                document.execCommand('insertText', false, ' '.repeat(TAB_SIZE));

                e.preventDefault() // prevent focusing on next element (the search box in some cases)
            } else if(e.keyCode === 13) {
                // add new p row
      }
    })
  });

    return(
        <>
          <div className="container">
            <div className="editor">
                <pre>
                    <div className="lineNumbers">
                        {
                            Array(20).fill().map((_,i) => (
                            <p className="rowNumber">{i+1}</p>
                            ))
                        }
                    </div>
                    <div className="content" contentEditable="true">
                    </div>
                </pre>
            </div>
          </div>
        </>
    );
}


export default PlaygroundContainer;