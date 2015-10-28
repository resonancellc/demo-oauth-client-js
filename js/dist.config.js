var config = {
    clientId:  '',
    clientSecret: '',
    redirectUri: 'http://localhost/work/demo-oauth-client-js',
    urlAuthorize: 'https://accounts.google.com/o/oauth2/auth',
    urlAccessToken: 'https://www.googleapis.com/oauth2/v3/token',
    //urlUserDetails: 'http://127.0.0.1:9090/user/{userId}',
    responseType: 'code',
    grantType : 'authorization_code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile'
};