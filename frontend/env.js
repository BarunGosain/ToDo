const ENV = {
    DEV:'development',
    PROD:'production'
}

//Detect environment
const CURRENT_ENV = window.location.hostname = 'localhost' ? ENV.DEV : ENV.PROD;

//API URLs
const CONFIG = {
    [ENV.DEV] : {
        API_BASE_URL: 'http://localhost:5000/api'
    },
    [ENV.PROD]: {
        API_BASE_URL: 'https://to-do-api-gamma.vercel.app/api'
    }
}

const APP_CONFIG = CONFIG[CURRENT_ENV]