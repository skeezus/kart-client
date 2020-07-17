import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-nord_dark";

import ListDialog, { openListDialog, closeListDialog } from '../../components/dialogs/list_dialog/listDialog';
import FileUploadDialog, { openFileUploadDialog, closeFileUploadDialog } from '../../components/dialogs/file_upload_dialog/fileUploadDialog';
import MapContainer, { removeMap } from '../../components/map/map';
import requestManager, { DATA_REQUEST } from '../../services/requests';
import plusBtn from '../../assets/icons/add_circle_oj_48dp.png';
import './home.css';

let jsonMapDataStr;

class HomeContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lng: -105.0294309,
            lat: 39.7438466,
            zoom: 13,
            mapData: [],
            mapStyle: { width: "100%" },
            editorStyle: { display: "none" }
        };

        console.log("[home.js] constructor", props);
    }

    /*
     * invoked right after the app is inserted into the DOM tree of your HTML page
     * initializing your map here ensures that Mapbox GL JS will not try to render a map before React creates the element that contains the map
     */
    componentDidMount() {
        console.log("[home.js] component did mount");
    }

    /*
     * Many jQuery plugins attach event listeners to the DOM so it’s important to detach them in 
     * componentWillUnmount. If the plugin does not provide a method for cleanup, you will probably 
     * have to provide your own, remembering to remove any event listeners the plugin registered to prevent memory leaks
     * src: https://reactjs.org/docs/integrating-with-other-libraries.html
     */
    componentWillUnmount() {
        console.log("[home.js] component will unmount");
        removeMap();
      }

    onResponseHandler = (success, response) => {
        console.log(response.data)
        this.setState({mapData: response.data});

        if(success) {
            closeFileUploadDialog();
        } else {
            alert(response);
        }
    }

    onChange = (event) => {
        const files = event.target.files;
        this.file = files[0];
      }

    handleOpenListDialog = () => {
        openListDialog();
    }

    handleOpenUploadDialog = () => {
        openFileUploadDialog()
        closeListDialog()
        //this.fileRef.current.click();
    }

    handleOpenEditorDialog = () => {
        this.setState({mapStyle: { width: "70%" }, editorStyle: {display: "block"}});

        closeListDialog()
    }

    onClickUploadCSV = (event) => {
        requestManager.execute(DATA_REQUEST, this.file, this.onResponseHandler);
    }

    getDialogList = () => {
        return [
            {
                id: 1,
                primaryText: 'CSV Upload',
                secondaryText: 'Click to upload CSV file',
                handler: this.handleOpenUploadDialog
            },
            {
                id: 2,
                primaryText: 'JSON Data',
                secondaryText: 'Use local JSON data',
                handler: this.handleOpenEditorDialog
            },
            {
                id: 3,
                primaryText: 'Google Sheets',
                secondaryText: 'Click to connect Google Account',
                handler: null
            }
        ]
    }

    onChangeEditor(newValue) {
        // update local json variable
        jsonMapDataStr = newValue;
    }

    loadDataFromEditor() {
        this.setState({mapData: JSON.parse(jsonMapDataStr)});
        // restore editor code
        // close editor
        this.closeEditor()
    }

    closeEditor() {
        this.setState({mapStyle: { width: "100%" }, editorStyle: {display: "none"}});
    }

    editorCode = (`[
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
]`)

    render() { // The mapContainer ref specifies that map should be drawn to the HTML page in a new <div> element.
        // https://material-ui.com/components/dialogs/
        let dialogList = this.getDialogList();

        return (
            <div>
                <div className="editorContainer" style={this.state.editorStyle}>
                    <AceEditor
                        mode="json5"
                        theme="nord_dark"
                        className="jsonEditor"
                        name="ace-editor"
                        height="82%"
                        width="100%"
                        onChange={(event)=>this.onChangeEditor(event)}
                        wrapEnabled={true}
                        showGutter={true}
                        value={this.editorCode}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            useWorker: true,
                        }}
                    />
                    <div className="editButtonContainer">
                        <div className="leftEditorButton">
                            <Button variant="contained" color="primary" style={{maxWidth: "100px", minWidth: "100px"}} onClick={() => this.loadDataFromEditor()}>
                                Load
                            </Button>
                        </div>
                        <div className="rightEditorButton">
                            <Button variant="contained" color="secondary" style={{maxWidth: "100px", minWidth: "100px"}} onClick={() => this.closeEditor()}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
                <MapContainer points={this.state.mapData} lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} mapStyle={this.state.mapStyle} />
                <button className="plusBtn"><img src={plusBtn} height="75" width="75" alt="plus button" onClick={this.handleOpenListDialog}/></button>
                <ListDialog dialogName="Add Map Data" lists={dialogList} />
                <FileUploadDialog dialogName="CSV Upload" fileChangeHandler={(event) => this.onChange(event)} uploadHandler={(event) => this.onClickUploadCSV(event)} />
            </div>
        )
    }

}

export default HomeContainer;
