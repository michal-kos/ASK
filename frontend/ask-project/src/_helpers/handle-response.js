import { authenticationService } from '../_services';

export function handleResponse(response) {
    var data;

    if(response.status != 204) {
        data = response.json();
    } 

    if (response.status >= 200 && response.status < 300) {
        return data;
    } else {
        if ([400, 403].indexOf(response.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            authenticationService.logout();
            //window.location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error)
    }
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}