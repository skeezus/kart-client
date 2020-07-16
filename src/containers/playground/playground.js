import React, { useEffect } from "react";

import "./playground.css";


/*
 * https://en.wikipedia.org/wiki/Text_editor
 * https://quilljs.com/
 * http://wysihtml.com/
 * https://github.com/josdejong/jsoneditor
 * https://levelup.gitconnected.com/simplest-way-to-add-json-editor-to-nextjs-application-6baa71b5b4dd
 * 
 * https://codeburst.io/how-to-build-your-own-wysiwyg-editor-6002fa3f5ea8
 * https://usefulangle.com/post/88/javascript-creating-simple-html-text-editor
 * https://enlight.nyc/projects/text-editor
 * https://tomassetti.me/writing-simple-js-editor/
 * https://www.thatsoftwaredude.com/content/8912/create-a-basic-text-editor-in-javascript
 * https://stackoverflow.com/questions/43778468/create-simple-text-editor-javascript
 * https://stackoverflow.com/questions/6007242/how-to-create-a-rich-text-editor
 */
const PlaygroundContainer = (props) => {
  
    useEffect(() => { // Similar to componentDidMount and componentDidUpdate:
        document.addEventListener("keydown", function(e) {
            if(e.keyCode === 8) { // 8 is delete key
                //e.preventDefault() // prevent default if close to deleting number
            } else if(e.keyCode === 9) { // 9 is tab key
                //https://www.w3schools.com/tags/att_tabindex.asp
                //document.execCommand('insertHTML', false, '&#009'); //add tab
                //document.execCommand('indent', false, null)
                const TAB_SIZE = 3
                document.execCommand('insertText', false, ' '.repeat(TAB_SIZE));

                e.preventDefault() // prevent focusing on next element (the search box in some cases)
            } else if(e.keyCode === 13) {
                /*
                 * https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable/27255103#27255103
                 * https://stackoverflow.com/questions/45306325/react-contenteditable-and-cursor-position
                 * https://stackoverflow.com/questions/34091730/get-and-set-cursor-position-with-contenteditable-div/34214130
                 * https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
                 * https://stackoverflow.com/questions/3972014/get-contenteditable-caret-index-position
                 */

                // if position of cursor is > num rows add row
                //let ele = document.getElementById("content-test");
                //let pos = getCaretCharacterOffsetWithin(ele);

                //console.log(pos);
            }
        })
    });

    /*function getCaretCharacterOffsetWithin(editableDiv) {
        var caretPos = 0,
            sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode === editableDiv) {
                caretPos = range.endOffset;
            }
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            if (range.parentElement() === editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
            }
        }
        return caretPos;
    }*/

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