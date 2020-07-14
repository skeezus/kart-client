import axios from 'axios';

import { urlBuilder } from './requests';
import { DATA_RESOURCE } from '../utils/strings/endpoints';
import { GENERIC_ERROR } from '../utils/strings/errorMessages';


export default function dataRequest(file, onResponseHandler) {
    let url = urlBuilder(DATA_RESOURCE);

    let formData = new FormData();
    formData.append("csv_file", file);

    //axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem('user')).token;
    axios.post(url, formData).then(response => { // then gets executed once the promise resolves
        if(response.status === 200){
            onResponseHandler(true, response)
        } else {
            onResponseHandler(false, response)
        }
    }).catch(function(error) {
        /*
         * The request was made and the server responded with a status code
         * that falls out of the range of 2xx
         * src: https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
         */
        onResponseHandler(false, GENERIC_ERROR)
    });
}