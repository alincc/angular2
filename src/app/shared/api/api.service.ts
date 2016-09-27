import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { environment } from './../../environment';
import { AccessTokenInterface } from './accesstoken.interface';
import {UserService} from "../userservice/user.service";

@Injectable()
export class ApiService {

  private apiBaseUrl: string;
  private tokenBaseUrl: string;
  private httpHeaders: Headers = new Headers();
  private appAccessToken: AccessTokenInterface;
  private userAccessToken: AccessTokenInterface;


  constructor(private http: Http,private userService:UserService) {
      this.apiBaseUrl = environment.apiBaseUrl;
      this.tokenBaseUrl = environment.tokenBaseUrl;

      this.getAccessToken().then(data => {
        this.appAccessToken = data;
      }).catch(error => {
        console.log(error);
      });

      //Subscribe to users access token
      this.userService.currentUser().subscribe(user => {
        if(user.isLoggedIn === true){
          this.userAccessToken = user.accessToken;
          //Check if users access token has expired and refresh it
          if(this.userAccessToken.expired === true){
            this._getRefreshToken(this.userAccessToken);
          }
        }else{
          this.userAccessToken = null;
        }
      });
  }

  /*
  |
  | Set the accesstoken header to be used by subsequent requests
  | @return Headers
  */
  setAccessToken(){
    let accessToken:AccessTokenInterface = null;
    this.httpHeaders = new Headers();
    if(this.userAccessToken !== null){
      console.info("Using user Access token");
      accessToken = this.userAccessToken;
    }else{
      console.info("Using app Access token");
      accessToken = this.appAccessToken;
    }

    this.httpHeaders.append('Authorization',accessToken.token_type+' ' + accessToken.access_token);
  }

  /*
  |
  | Get application wide access token
  |
  */
  private getAccessToken(){
    //This should never fail.
    //Should always retry access
  	return this.http.get(this.tokenBaseUrl+'access-token')
  	   	.map(this.extractData)
  	   	.toPromise();
  }

  private _getRefreshToken(accessToken: AccessTokenInterface){
    console.info("Getting refresh access token");
    //This should never fail.
    //Should always retry access
      let options = new RequestOptions({ headers: new Headers({'Content-Type':'application/json'}) });
      this.http.post(
        this.tokenBaseUrl+'refresh-token',
        JSON.stringify({
          refresh_token: accessToken.refresh_token
        }),
        options
      ).map(this.extractData).toPromise().then((res) => {
        console.info("Got a new token after refresh");
        console.log(res);
        this.userService.setUserAccessToken(res);
      },error => {
        //Redirect user to login page and give an error message
        console.error("Refresh token failed")
      })

  }

  /*
  |
  | Extract data from a successful request
  |
  */
  private extractData(res: any) {
    let body = res.json();
    return body.data || body;
  }

  /*
  |
  | Track accesstoken expiration
  |
  */
  private trackAccessTokenExpiry(token : any){
  	//TODO
  }

  getApiBaseUrl(){
    return this.apiBaseUrl;
  }

  getTokenBaseUrl(){
    return this.tokenBaseUrl;
  }

  /*
  |
  | Send a get request to the server
  | @returns Observable
  */
  get(endpoint: string, params?: any) : any{
    this.setAccessToken();
    let url = this.apiBaseUrl+endpoint;
    let qParams = new URLSearchParams();

  	return this.http.get(url,
  		{
  			headers: this.httpHeaders
  		})
  		.map(this.extractData)
      .toPromise();

  }

  /*
  |
  | Send a post request to the server
  | @returns Observable
  */
  post(endpoint : string , params : any) : any{
    this.setAccessToken();
    this.httpHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: this.httpHeaders });
    let url = this.apiBaseUrl+endpoint;
  	return this.http.post(
    		  url,
         	JSON.stringify(params),
          options
        )
       	.map(this.extractData)
        .toPromise();
  }

  /*
  |
  | Send a delete request to the server
  | @returns Promise
  */
  delete(endpoint : string) : any{
    this.setAccessToken();
    this.httpHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: this.httpHeaders });
    let url = this.apiBaseUrl+endpoint;
    return this.http.delete(
      url,
      options
    ).map(this.extractData).toPromise();
  }


}

