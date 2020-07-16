import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import requestManager, { DATA_REQUEST } from '../../services/requests';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-nord_dark";

import ListDialog, { openListDialog, closeListDialog } from '../../components/dialogs/list_dialog/listDialog';
import FileUploadDialog, { openFileUploadDialog, closeFileUploadDialog } from '../../components/dialogs/file_upload_dialog/fileUploadDialog';
import plusBtn from '../../assets/icons/add_circle_oj_48dp.png';
import './home.css';


/*
 * https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
 * https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a
 * https://github.com/mapbox/mapbox-react-examples/
 * 
 * https://nordicapis.com/porting-a-js-library-to-a-react-component/
 * https://www.digitalocean.com/community/tutorials/wrap-a-vanilla-javascript-package-for-use-in-react
 */

class HomeContainer extends Component {

    constructor(props) {
        super(props);

        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

        this.state = {
            lng: -105.0294309,
            lat: 39.7438466,
            zoom: 13,
            mapData: [],
            mapStyle: { width: "100%" },
            editorStyle: { display: "none" }
        };
        
        this.editor = null;
        this.file = null;
        this.map = null;

        console.log("[home.js] constructor", props);
    }

    /*
     * invoked right after the app is inserted into the DOM tree of your HTML page
     * initializing your map here ensures that Mapbox GL JS will not try to render a map before React creates the element that contains the map
     */
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            //style: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
    }

    /*
     * Many jQuery plugins attach event listeners to the DOM so it’s important to detach them in 
     * componentWillUnmount. If the plugin does not provide a method for cleanup, you will probably 
     * have to provide your own, remembering to remove any event listeners the plugin registered to prevent memory leaks
     * src: https://reactjs.org/docs/integrating-with-other-libraries.html
     */
    componentWillUnmount() {
        //this.map.remove();
      }

    onResponseHandler = (success, response) => {
        if(success) {
            this.setState({mapData: response.data});
            closeFileUploadDialog();
            //props.history.push("/logs");
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

    createMarkers = () => {
        this.state.mapData.forEach(point => {
             new mapboxgl.Marker()
                .setLngLat([point.longitude, point.latitude])
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + point.name + '</h3>'))
                .addTo(this.map);
        })
    }

    onChangeEditor(newValue) {
        console.log("change", newValue);
    }

    editorCode = (
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

    render() { // The mapContainer ref specifies that map should be drawn to the HTML page in a new <div> element.
        // https://material-ui.com/components/dialogs/

        this.createMarkers();
        let dialogList = this.getDialogList();

        return (
            <div>
                <AceEditor
                    mode="json5"
                    theme="nord_dark"
                    className="json-editor"
                    onChange={(event)=>this.onChangeEditor(event)}
                    name="ace-editor"
                    height="100vh"
                    showGutter={true}
                    style={this.state.editorStyle}
                    value={this.editorCode}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        useWorker: true,
                    }}
                />
                <div ref={el => this.mapContainer = el} className="mapContainer" style={this.state.mapStyle} />
                <button className="plusBtn"><img src={plusBtn} height="75" width="75" alt="plus button" onClick={this.handleOpenListDialog}/></button>
                <ListDialog dialogName="Add Map Data" lists={dialogList} />
                <FileUploadDialog dialogName="CSV Upload" fileChangeHandler={(event)=>this.onChange(event)} uploadHandler={(event) => this.onClickUploadCSV(event)} />
            </div>
        )
    }

}

export default HomeContainer;
