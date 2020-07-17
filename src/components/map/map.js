import React, { useEffect } from "react";
import mapboxgl from 'mapbox-gl';

import './map.css';


/*
 * https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
 * https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a
 * https://github.com/mapbox/mapbox-react-examples/
 * 
 * https://www.newline.co/fullstack-react/articles/how-to-write-a-google-maps-react-component/
 * https://nordicapis.com/porting-a-js-library-to-a-react-component/
 * https://www.digitalocean.com/community/tutorials/wrap-a-vanilla-javascript-package-for-use-in-react
 */


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

let mapInstance;
let mapContainer;
let removeMapFn;

const MapContainer = (props) => {

    useEffect(() => {
        console.log("[map_container.js] use effect", props);

        removeMapFn = removeMap;

        setMap();
        createMarkers();
    }); // // passing an empty array tells react to only do the effect on screen load

    function setMap() {
        mapInstance = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11', // 'mapbox://styles/mapbox/satellite-streets-v11'
            center: [props.lng, props.lat],
            zoom: props.zoom
        });
    }

    function removeMap() {
        mapInstance.remove();
    }

    function createMarkers() {
        props.points.forEach(point => {
             new mapboxgl.Marker()
                .setLngLat([point.longitude, point.latitude])
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + point.name + '</h3>'))
                .addTo(mapInstance);
        })
    }

    return (
        <div ref={el => mapContainer = el} className="mapContainer" style={props.mapStyle} />
    );

}

export default MapContainer;

export function removeMap() {
    removeMapFn();
}