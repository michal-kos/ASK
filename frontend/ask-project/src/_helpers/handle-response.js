import { authenticationService } from '../_services';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = isJson(text) && JSON.parse(text);
        if (response.status !== 200) {
            if ([400, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                //window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}