import dataRequest from './data';

const DATA_REQUEST = 'dataRequest';

var invoker = {
    'dataRequest': dataRequest,
}

var requestManager = {
    execute: function(name, ...args) {
        if(name in invoker) {
            return invoker[name](...args)
        }
        return false;
    }
}

export function urlBuilder(resource) {
    let baseURL = process.env.REACT_APP_BASE_API_URL;

    return `${baseURL}/${resource}`
}

export default requestManager;

export { DATA_REQUEST }