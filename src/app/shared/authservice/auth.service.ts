import {Injectable} from '@angular/core';
import {ApiService} from '../api';
import {UserService} from '../userservice/user.service';
import {FbService} from '../fb-login/shared/fb.service';
import {GoogleService} from '../google-login/shared/google.service';
import {UserInterface} from '../../+users';
import {Router}  from '@angular/router';

@Injectable()
export class AuthService {
  redirectUrl: string;
  private _loginInprogress: boolean = false;
  private _currentUser: UserInterface = null;

  constructor(private apiService: ApiService,
              private userService: UserService,
              private googleService: GoogleService,
              private fbService: FbService,
              private router: Router) {

    let loggedinUser = this._getLocallyStoredUser();
    this.userService.setCurrentUser(loggedinUser);

    //Handle facebook login
    this.fbService.currentFbUser().subscribe(res => {
      if (res && this.isLoggedIn() == false && this._loginInprogress === false) {
        this._authViaFacebook(res);
      }
    });

    //handle Google Login
    this.googleService.currentGoUser().subscribe(res => {
      if (res && this.isLoggedIn() == false && this._loginInprogress === false) {
        this._authViaGoogle(res);
      }
    })

    //Subscribe to user
    this.userService.currentUser().subscribe(user => {
      if (user) {
        this._currentUser = user;
        this._storeUserLocally(user);
      }
    });

  }

  private _authViaGoogle(res) {
    //Check if another user exists;
    //if he does stop else continue
    //First verify id_token on the server side
    //Then get users info from google server and merge with response from server
    //Navigate to dashboard
    let googleAuthResponse = res.getAuthResponse();

    let data = {
      access_token: googleAuthResponse.id_token,
      login_option: 'googleplus'
    }
    this._loginInprogress = true;
    this.login('login/social', 'google', data).then(res => {
      this._loginInprogress = false;
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this._loginInprogress = false;
    });
  }

  private _authViaFacebook(res) {
    //Check if another user exists;
    //if he does stop else continue
    //First verify id_token on the server side
    //Then get users info from google server and merge with response from server
    //Navigate to dashboard
    let facebookAuthResponse = res;
    let data = {
      access_token: facebookAuthResponse.accessToken,
      login_option: 'facebook'
    }
    this._loginInprogress = true;
    this.login('login/social', 'facebook', data).then(res => {
      this._loginInprogress = false;
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this._loginInprogress = false;
      console.log(error);
    });
  }

  private _getLocallyStoredUser() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      user = {isLoggedIn: false};
      this._storeUserLocally(user);
    }
    //Check if access token has already expired. If so do fetch a new accesstoken

    return user;
  }

  private _storeUserLocally(user: UserInterface): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private _setCurrentUser(user: UserInterface) {
    this.userService.setCurrentUser(user);
  }

  login(endpoint: string, authProvider: string, data) {
    return this.apiService.post(endpoint, data).then((response) => {
      //update current user
      this._setCurrentUser({
        isLoggedIn: true,
        authProvider: authProvider,
        accessToken: response,
        profile: {}
      });
      //Get user profile first before continuing
      //TODO pull in education,practices and verification Docs along
      return this.apiService.get('users/me').then((authenticatedUser) => {
        //Update logged in user object
        //Set personal Record
        this.userService.setPersonalRecord(authenticatedUser);

        //Set Verification Docs if available
        if (authenticatedUser.document.data) {
          this.userService.setUsersVerificationDocs(authenticatedUser.document.data);
        }

        //Set Practices if available
        if (authenticatedUser.practice.data) {
          this.userService.setUsersPractices(authenticatedUser.practice.data);
        }
        //Set Educations if available
        if (authenticatedUser.education.data) {
          this.userService.setUserEducation(authenticatedUser.education.data);
        }

        //Return the original login response
        return response;
      }, error => {
        //Incase an error occurs. Log it to keen
        return response;
      });
    });
  }

  logout(): Promise<boolean> {
    if (this._currentUser && this._currentUser.isLoggedIn == true && this._currentUser.authProvider === 'facebook') {
      this.fbService.logout();
    }
    if (this._currentUser && this._currentUser.isLoggedIn == true && this._currentUser.authProvider === 'google') {
      this.googleService.signOut();
    }

    //Clear user
    this.userService.setCurrentUser({isLoggedIn: false, profile: {}});
    localStorage.removeItem('currentUser');
    let promise = new Promise((resolve, reject) => {
      resolve(true);
    });
    return promise;
  }

  signup(endpoint: string, data) {
    return this.apiService.post(endpoint, data).then((response) => {
      //update current user
      //Unset password with the submitted data
      delete data['password'];

      let user = {
        isLoggedIn: true,
        authProvider: 'custom',
        accessToken: response,
        //User doesnot exist here yet
        profile: {
          personal: data
        }
      };
      this._setCurrentUser(user);
      return response;
    });
  }

  sendReminder(data: {email: string}) {
    return this.apiService.post('password/send-reminder', data);
  }

  isLoggedIn(): boolean {
    return this.userService.hasUser();
  }


}
