<?php

class Proxy {
    protected $config;
    
    function __construct($config) {
        $this->config = $config;
    }
    
    public function actionLogin()
    {
        $url = $this->config['urlAuthorize'] . '?response_type=' . $this->config['responseType'];
        $url .= '&redirect_uri=' . urlencode($this->config['redirectUri']);
        $url .= '&client_id=' . urlencode($this->config['clientId']);
        $url .= '&scope=' . urlencode($this->config['scope']);
        
        header("Location: $url");
        die();                
    }
    
    public function actionValidate($request)
    {
        $data = array(
            'grant_type' => 'authorization_code',
            'code' => $request['code'],
            'client_id' => $this->config['clientId'],
            'client_secret' => $this->config['clientSecret'],
            'redirect_uri' => $this->config['redirectUri']
        );        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->config['urlAccessToken']);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        header("Content-Type: application/json");
        echo curl_exec ($ch);
        curl_close ($ch);
        die();
    }

}

if(!isset($_REQUEST['action'])){
    header("HTTP/1.0 404 Not Found"); die();
}

$proxy = new Proxy(require 'config.php');

$actionName = 'action' . ucfirst($_REQUEST['action']);
if(!method_exists($proxy, $actionName)){
    echo $actionName;
    die('here');
    header("HTTP/1.0 404 Not Found"); die();
}

$proxy->$actionName($_REQUEST);

