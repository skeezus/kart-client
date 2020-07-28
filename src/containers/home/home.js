import React, { Component } from 'react';

import FileUploadDialog, { openFileUploadDialog, closeFileUploadDialog } from '../../components/dialogs/file_upload_dialog/fileUploadDialog';
import JsonEditor, { openEditor, closeEditor, getMapDataFromEditor } from '../../components/text_editors/json_editor/jsonEditor';
import ListDialog, { openListDialog, closeListDialog } from '../../components/dialogs/list_dialog/listDialog';
import MapContainer, { removeMap } from '../../components/map/map';
import plusBtn from '../../assets/icons/add_circle_oj_48dp.png';
import MenuIcon from '../../components/icons/menuIcon'
import './home.css';

import requestManager, { DATA_REQUEST } from '../../services/requests';


class HomeContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lng: -105.0294309,
            lat: 39.7438466,
            zoom: 13,
            mapData: [],
            mapStyle: { width: "100%" },
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
        this.setState({mapStyle: { width: "70%" }});

        openEditor()
        closeListDialog()
    }

    onClickUploadCSV = (event) => {
        requestManager.execute(DATA_REQUEST, this.file, this.onResponseHandler);
    }

    onClickMenu = (event) => {
        console.log("menu clicked")
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

    onClickCloseEditor() {
        this.setState({mapStyle: { width: "100%" }});

        closeEditor();
    }

    onClickLoadDataFromEditor = () => {
        this.setState({mapData: getMapDataFromEditor()});
        // restore editor code
        this.onClickCloseEditor()
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
            // marginTop: "15px", marginLeft: "15px", 
            <div>
                <MenuIcon fontSize="large" onClick={this.onClickMenu} style={{ color: "#fca311", position: "absolute", top: 10, left: 15, zIndex: 3}} />
                <JsonEditor value={this.editorCode} closeEditor={(event) => this.onClickCloseEditor(event)} loadDataFromEditor={(event) => this.onClickLoadDataFromEditor(event)} />
                <MapContainer points={this.state.mapData} lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} mapStyle={this.state.mapStyle} />
                <button className="plusBtn"><img src={plusBtn} height="75" width="75" alt="plus button" onClick={this.handleOpenListDialog}/></button>
                <ListDialog dialogName="Add Map Data" lists={dialogList} />
                <FileUploadDialog dialogName="CSV Upload" fileChangeHandler={(event) => this.onChange(event)} uploadHandler={(event) => this.onClickUploadCSV(event)} />
            </div>
        )
    }

}

export default HomeContainer;
