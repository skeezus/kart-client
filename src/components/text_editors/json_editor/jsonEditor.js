import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-nord_dark";

import './jsonEditor.css';

let jsonMapDataStr;
let openEditorFn;
let closeEditorFn;
let getMapDataFn;

function JsonEditor(props) {
    const [editorStyle, setStyle] = useState({display: 'none'});

    const openEditor = () => {
        setStyle({display: 'block'});
    }

    const closeEditor = () => {
        setStyle({display: 'none'});
    }

    const onChangeEditor = (newValue) => {
        console.log("on change editor")
        jsonMapDataStr = newValue; // update local json variable
        console.log(jsonMapDataStr)
    }

    const getMapData = () => {
        console.log("get map data")
        console.log(jsonMapDataStr)
        return JSON.parse(jsonMapDataStr);
    }

    useEffect(() => {
        openEditorFn = openEditor;
        closeEditorFn = closeEditor;
        getMapDataFn = getMapData;
    });

    return (
        <div className="editorContainer" style={editorStyle}>
            <AceEditor
                    mode="json5"
                    theme="nord_dark"
                    className="jsonEditor"
                    name="ace-editor"
                    height="82%"
                    width="100%"
                    onChange={onChangeEditor}
                    wrapEnabled={true}
                    showGutter={true}
                    value={props.value}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        useWorker: true,
                    }}
                />
            <div className="editButtonContainer">
                <div className="leftEditorButton">
                    <Button variant="contained" color="primary" style={{maxWidth: "100px", minWidth: "100px"}} onClick={props.loadDataFromEditor}>
                        Load
                    </Button>
                </div>
                <div className="rightEditorButton">
                    <Button variant="contained" color="secondary" style={{maxWidth: "100px", minWidth: "100px"}} onClick={props.closeEditor}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default JsonEditor;

export function openEditor() {
    openEditorFn();
}

export function closeEditor() {
    closeEditorFn();
}

export function getMapDataFromEditor() {
    return getMapDataFn();
}

