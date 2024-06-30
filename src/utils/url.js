const port = 5000; 

export default class ApiConfig {
    static API_BASE_URL = 'http://localhost:' + port;
    static API_LOGIN_URL = this.API_BASE_URL + '/login';
    static API_CREATE_PROJECT_URL = this.API_BASE_URL + '/create-project';
    static API_PROJECT_LIST_URL = this.API_BASE_URL + '/project-list';
    static API_UPDATE_PROJECT_STATUS_URL = this.API_BASE_URL + '/update-status';
    static API_DASHBOARD_URL = this.API_BASE_URL + '/dashboard';
    static API_CHART_URL = this.API_BASE_URL + '/chart';
}
