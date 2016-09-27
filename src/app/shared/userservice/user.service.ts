import {Injectable} from '@angular/core';
import {UserInterface} from '../../+users';
import {BehaviorSubject} from 'rxjs';
import {AccessTokenInterface} from '../api';
//import localStorage from 'localStorage';
declare var _: any;

@Injectable()
export class UserService {

  private _currentUser$: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>({
    isLoggedIn: false,
    profile: {}
  });
  private _accessTokenTracker: any = false;

  constructor() {
  }


  private _trackAccessTokenExpiry(accessToken: AccessTokenInterface) {
    let d = new Date().getTime();
    let timeToExpiry = accessToken.expires_at - d;
    if (timeToExpiry > 0 && this._accessTokenTracker === false) {
      this._accessTokenTracker = setInterval(() => {
        this._expireAccessToken()
      }, timeToExpiry);

    } else {
      this._expireAccessToken();
    }

  }

  //Expire access token
  private _expireAccessToken() {

    let currentUser = this._currentUser$.getValue();
    let accessToken = currentUser.accessToken;
    if (this._validateAccessTokenExpired() === true) {
      console.info("Access token has expired");
      if (accessToken) {
        accessToken.expired = true;
        this.setUserAccessToken(accessToken);
        //Stop the tracker
        clearInterval(this._accessTokenTracker);
        this._accessTokenTracker = false;
      }
    }
  }

  private _computeAccessTokenExpiryTime(noSecondsValid: number): number {
    let d = new Date().getTime();
    return d + (noSecondsValid * 1000);
  }

  private _validateAccessTokenExpired(): boolean {
    let currentUser = this._currentUser$.getValue();
    let accessToken = currentUser.accessToken;

    if (accessToken && accessToken.expires_at) {
      let n = new Date().getTime();
      let timeToExpiry = Math.floor((accessToken.expires_at - n) / 1000);
      if (timeToExpiry > 0)
        return false;
    }
    return true;
  }

  currentUser() {
    return this._currentUser$.asObservable();
  }


  hasUser() {
    return this._currentUser$.getValue().isLoggedIn;
  }

  getCurrentUserValue() {
    return this._currentUser$.getValue();
  }

  setCurrentUser(user: UserInterface) {
    //Set time to access token expiry
    if (user.accessToken && !user.accessToken.expires_at)
      user.accessToken.expires_at = this._computeAccessTokenExpiryTime(user.accessToken.expires_in);

    this._currentUser$.next(user);

    if (user.accessToken && !user.accessToken.expired)
      this._trackAccessTokenExpiry(user.accessToken);

  }

  setPersonalRecord(personal) {
    //Pull in the current users record manipulate it and push it in
    let currentUser = this._currentUser$.getValue();
    //The doctors specific fields is part of the document. Pull it out and add it as part of the personal record
    console.log(personal);
    if (personal.doctor) {
      let doctorRec = personal.doctor.data;

      if (doctorRec) {
        personal.bio = doctorRec.bio;
        personal.speciality = doctorRec.speciality;
      }
    }
    delete personal['doctor'];

    currentUser.profile.personal = personal;
    this.setCurrentUser(currentUser);
  }

  setUserEducation(education) {
    let currentUser = this._currentUser$.getValue();
    currentUser.profile.education = education;
    this.setCurrentUser(currentUser);
  }

  setUserAccessToken(accessToken: AccessTokenInterface) {
    let currentUser = this._currentUser$.getValue();
    currentUser.accessToken = accessToken;
    this.setCurrentUser(currentUser);
  }

  setUsersPractices(practices) {
    let currentUser = this._currentUser$.getValue();
    let convertedPractices = _.map(practices, (practice)=> {
      return {
        id: practice.id,
        name: practice.name,
        logo: practice.logo,
        physical_address: practice.physical_address,
        phone: practice.phone,
        mobile_phone: practice.mobile_phone,
        email: practice.email,
        services: practice.services,
        photos: practice.photos,
        overview: practice.overview,
        geo_location: {
          lat: practice.latitude,
          lng: practice.longitude,
          physical_address: {
            country: practice.country,
            county: practice.county,
            name: practice.physical_address
          }
        },
        ch_url: practice.ch_url,
        facebook_page: practice.facebook_page,
        website: practice.website
      }
    });
    currentUser.profile.practices = convertedPractices;
    this.setCurrentUser(currentUser);
  }

  setUsersVerificationDocs(docs) {
    console.log(docs);
    let currentUser = this._currentUser$.getValue();
    currentUser.profile.verificationDocs = docs;
    this.setCurrentUser(currentUser);
  }

}
