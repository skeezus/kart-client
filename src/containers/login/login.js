import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-nord_dark";

import './login.css';


const LoginContainer = (props) => {

    useEffect(() => {
        // create the editor
    });

    function onChange(newValue) {
        console.log("change", newValue);
    }

    const editorCode = (
`[
    {
        "name": "my house",
        "longitude": "-105.0562099",
        "latitude": "39.7453018"
    },
    {
        "name": "your house",
        "longitude": "-106.0562099",
        "latitude": "40.7453018"
    },
]`
    )

    return (
        // <div name="ace-editor">test</div>
        <>
            <div className="editorContainer">
                <AceEditor
                    mode="json5"
                    theme="nord_dark"
                    onChange={onChange}
                    name="ace-editor"
                    height="90%"
                    value={editorCode}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        useWorker: true,
                    }}
                />
                <div>
                    <div className="leftEditorButton">
                        <Button variant="contained" color="primary" style={{maxWidth: "100px", minWidth: "100px"}}>
                            Load
                        </Button>
                    </div>
                    <div className="rightEditorButton">
                        <Button variant="contained" color="primary" style={{maxWidth: "100px", minWidth: "100px"}}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );

}


export default LoginContainer;


