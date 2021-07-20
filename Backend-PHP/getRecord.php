<?php

header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

class Record {

	var $url, $fields, $token;
	function __construct($url, $recordId, $token) {
		$this->url = $url;
		$this->token = $token;
		$this->recordId = $recordId;
	}

	function httpGet() {
		$curl = curl_init();
		curl_setopt_array($curl, array(
    	CURLOPT_RETURNTRANSFER => 1,
    	CURLOPT_URL => $this->url,
    	CURLOPT_HTTPHEADER => array(
				'Authorization: Bearer '.$this->token
			)
    	));

		$response = curl_exec($curl);
		$responseData = json_decode($response, TRUE);
		return $response;

	}

}

$token = htmlspecialchars($_GET["token"]);

$fields = htmlspecialchars($_GET["fields"]);

$url = "https://app.iformbuilder.com/exzact/api/v60/profiles/502753/pages/3837166/records?fields=".$fields;

$url = str_replace( '\/', '/', $url );

$object = new Record($url, $fields, $token);

$responseData = $object->httpGet();

echo $responseData;

?>