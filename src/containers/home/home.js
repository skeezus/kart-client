import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import ListDialog, { openListDialog, closeListDialog } from '../../components/dialogs/list_dialog/listDialog';
import FileUploadDialog, { openFileUploadDialog } from '../../components/dialogs/file_upload_dialog/fileUploadDialog';
import plusBtn from '../../assets/icons/add_circle_oj_48dp.png';
import './home.css';


//console.log(process.env);
//console.log(process.env.NODE_ENV);


class HomeContainer extends Component {

    constructor(props) {
        super(props);

        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

        this.state = {
            lng: -105.0294309,
            lat: 39.7438466,
            zoom: 15,
        };

        //this.fileRef = React.createRef();

        console.log("[home.js] constructor", props);
    }

    /*
     * invoked right after the app is inserted into the DOM tree of your HTML page
     * initializing your map here ensures that Mapbox GL JS will not try to render a map before React creates the element that contains the map
     */
    componentDidMount() {
        /*const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });*/
    }

    onChange = (e,props) => {
        const files = e.target.files;
        //const selectedFile = files[0];
        // if files > 0
        console.log(files);
        //ProcessFileUpload(selectedFile,props.ProgressCallBack,props.ErrorCallBack,props.CompleatedCallBack,props.BaseURL,props.Location,props.FilesAllowed);
      }

    handleOpenListDialog = () => {
        openListDialog();
    }

    handleOpenUploadDialog = () => {
        openFileUploadDialog()
        closeListDialog()
        //this.fileRef.current.click();
    }

    onClickUploadCSV = (event) => {
        const files = event.target.files;
        console.log(files);
    }

    render() { // The mapContainer ref specifies that map should be drawn to the HTML page in a new <div> element.
        // https://material-ui.com/components/dialogs/
        // <div ref={el => this.mapContainer = el} className="mapContainer" />
        let lists = [
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
                handler: null
            },
            {
                id: 3,
                primaryText: 'Google Sheets',
                secondaryText: 'Click to connect Google Account',
                handler: null
            }
        ]

        return (
            <div>
                <button className="plusBtn"><img src={plusBtn} height="75" width="75" alt="plus button" onClick={this.handleOpenListDialog}/></button>
                <ListDialog dialogName="Add Map Data" lists={lists} />
                <FileUploadDialog dialogName="CSV Upload" uploadHandler={(event) => this.onClickUploadCSV(event)} />
            </div>
        )
    }

}

export default HomeContainer;
