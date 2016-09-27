import * as Http from 'https';
import {environment } from '../environment';


class ApiAccessToken{
	private clientId:  string;
	private clientSecret: string;

	constructor(){

	}

	getToken(isRefresh?:boolean,refreshToken?:string){
		var path = '';
		var requestParams: {
			client_id:string,
			client_secret:string,
			refresh_token?:string
		} = { 
			"client_id": environment.clientId,
			"client_secret": environment.clientSecret
		};

		if(isRefresh === false){
			path = '/v1/oauth/client/access-token';
		}else{
			path = '/v1/oauth/refresh-token';
			requestParams.refresh_token = refreshToken;

		}
		
		return new Promise((resolve,reject) => {
			let options = {
			  host: environment.apiBaseUrl,
			  path: path,
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json'
			  }
			};

			let req = Http.request(options, function(res) {
			  res.setEncoding('utf8');
			  
			  res.on('data', function (chunk) {
			  	if(res.statusCode !== 200){
			  		reject(chunk);
			  	}
			  	resolve(chunk);
			  });
			});
			req.on('error', function(e) {
			  reject(e.message);
			});
			// write data to request body
			req.write(
				JSON.stringify(requestParams)
			);
			req.end();
		});
	}
}

export { ApiAccessToken }
