import { S3signature as S3Guard, ApiAccessToken } from './classes';

// Our API access token
function ApiAccessTokenHandler(req, res) {
  new ApiAccessToken().getToken(false).then((response) => {;
  	res.send(response); 
  }).catch((error) => {
  	console.log(error);
  	res.status(401);
  	res.send(error);
  });
  
}

// Our API refresh token
function ApiRefreshTokenHandler(req, res) {
	let token = req.body.refresh_token;
  	new ApiAccessToken().getToken(true,token).then((response) => {;
  		res.send(response); 
  	}).catch((error) => {
  		res.status(403);
  		res.send(error);
  	});
  
}



function S3signatureHandler(req, res) {
   res.send(new S3Guard().getSignature());  
}

export { ApiAccessTokenHandler, ApiRefreshTokenHandler,S3signatureHandler };
