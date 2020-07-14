import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import requestManager, { DATA_REQUEST } from '../../services/requests';

import ListDialog, { openListDialog, closeListDialog } from '../../components/dialogs/list_dialog/listDialog';
import FileUploadDialog, { openFileUploadDialog, closeFileUploadDialog } from '../../components/dialogs/file_upload_dialog/fileUploadDialog';
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
            zoom: 13,
            mapData: [],
        };
        
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
            //style: 'mapbox://styles/mapbox/streets-v11',
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
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
                handler: null
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
        console.log(this.state.mapData);
        this.state.mapData.forEach(point => {
            console.log(point)
             new mapboxgl.Marker()
                .setLngLat([point.longitude, point.latitude])
                .addTo(this.map);
        })
    }

    render() { // The mapContainer ref specifies that map should be drawn to the HTML page in a new <div> element.
        // https://material-ui.com/components/dialogs/

        this.createMarkers();
        let dialogList = this.getDialogList();

        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
                <button className="plusBtn"><img src={plusBtn} height="75" width="75" alt="plus button" onClick={this.handleOpenListDialog}/></button>
                <ListDialog dialogName="Add Map Data" lists={dialogList} />
                <FileUploadDialog dialogName="CSV Upload" fileChangeHandler={(event)=>this.onChange(event)} uploadHandler={(event) => this.onClickUploadCSV(event)} />
            </div>
        )
    }

}

export default HomeContainer;
