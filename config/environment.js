var environments = {
    staging: {
        FIREBASE_API_KEY: 'AIzaSyCWAkG9YrRkhvs2NVDynuQ1ihE1HUva5EI',
        FIREBASE_AUTH_DOMAIN: 'swen-732.firebaseapp.com',
        FIREBASE_DATABASE_URL: 'https://swen-732.firebaseio.com',
        FIREBASE_PROJECT_ID: 'swen-732',
        FIREBASE_STORAGE_BUCKET: 'gs://swen-732.appspot.com',
        FIREBASE_MESSAGING_SENDER_ID: '223221850941',
        GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyAwWozspeXw19x8fNXQlRat0s3xCJJXMeU'
    },
    production: {
        // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
};

function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
        return 'staging';
    } else if (releaseChannel === 'staging') {
        return 'staging';
    } else {
        return 'staging';
    }
}
function getEnvironment(env) {
    console.log('Release Channel: ', getReleaseChannel());
    return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;