var app = {
    config: {},
    login: function(){
        var url = this.config.urlAuthorize + '?response_type=' + this.config.responseType;
        url += '&redirect_uri=' + encodeURIComponent(this.config.redirectUri);
        url += '&client_id=' + encodeURIComponent(this.config.clientId);
        url += '&scope=' + encodeURIComponent(this.config.scope);
        
        window.location = url;
    },
    init: function(config){
        var self = this;
        this.config = config;
        
        $('#connectBtn').click(function(){
            self.login();
        });
    },
    getAccessToken: function (code, onReceived){
        var self = this;
        $.ajax({
            // The URL to process the request
            url : this.config.urlAccessToken,
            type : 'POST',
            data : {
                grant_type : 'authorization_code',
                redirect_uri: this.config.redirectUri,
                code : code,
                client_id : this.config.clientId,
                client_secret : this.config.clientSecret
            },
            dataType: "json",
            success: function(response) {
               console.log(response);
               onReceived(response);
            }

        });
    },
    
    parseAccessCode: function(){
        var qp = null;
        if (window.location.hash) {
            qp = location.hash.substring(1);
        }
        else {
            qp = location.search.substring(1);
        }
        
        qp = qp ? JSON.parse('{"' + qp.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                function (key, value) {
                    return key === "" ? value : decodeURIComponent(value);
                }
        ) : {};

        if(qp && qp.code){
            console.log(qp);
            return qp.code;
        }
        
        return false;
    }
};