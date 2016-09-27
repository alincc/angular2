import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {
 
  constructor(private apiService: ApiService) {
    
  }

  getUsers(){
  	this.apiService.get('users').then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

  addUser(data){
  	return this.apiService.post('users',data);
  }

  updateUser(id: any,data: any){
    if(!id){
      let id = 'me';
    }
    return this.apiService.post('users/'+id,data);
  }

  verifyPhone(data: any){
    let id = 'me';
    return this.apiService.post('users/'+id+'/verify-phone',data);
  }

  sendPhoneVerifyCode(data: any){
    let id = 'me';
    return this.apiService.post('users/'+id+'/send-phone-verification',data);
  }

  getUser(id: any){
    if(!id){
      let id = 'me';
    }
  	return this.apiService.get('users/'+id);
  }

  private handleError(error){

  }

}
