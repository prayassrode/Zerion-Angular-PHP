<?php

header("Access-Control-Allow-Origin: *");

class Token {
	var $header;
	var $payload;
	
	function __construct($header, $payload){
		$this->header = $header;
		$this->payload = $payload;
	}
	
	function getJWT() {
		$base64UrlHeader = $this->base64UrlEncode($this->header);

		$base64UrlPayload = $this->base64UrlEncode($this->payload);

		$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, '15aeb7fed55922b7fe98ee18f4abe716f3e0fc05', true);
		
		$base64UrlSignature = $this->base64UrlEncode($signature);
		
		$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
		
		return $jwt;
	}
	
	function base64UrlEncode($string){
		return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($string));
	}
	
	function httpPost($url, $data){
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($curl);
		curl_close($curl);
		return $response;
	}
	
	function getAccessToken($url, $data){
		$res = $this->httpPost($url, $data);
		$res = json_decode($res, true);
		return json_encode(['accessToken' => $res['access_token']]);
		//return $res;
		//return $res['access_token'];
	}
}


$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
$payload = json_encode(['iss'=>'198820433f6805fbf53961f56e876807443b5682', 'aud'=> 'https://app.iformbuilder.com/exzact/api/oauth/token', 'iat'=> time(), 'exp'=> time()+300]);

$object = new Token($header, $payload);
$jwt = $object->getJWT();

$url = "https://app.iformbuilder.com/exzact/api/oauth/token";
$url = str_replace( '\/', '/', $url );
$data = array('grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer', 'assertion' => $jwt);

echo $object->getAccessToken($url, $data);

?>