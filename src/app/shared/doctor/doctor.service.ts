import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DoctorService {
 
  constructor(private apiService: ApiService) {
    
  }

  getDoctors(){
  	this.apiService.get('doctors').then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

  add(data){
  	return this.apiService.post('doctors',data);
  }

  update(id,data){
    return this.apiService.post('doctors/'+id,data);
  }

  get(id: any){
    if(!id){
      let id = 'me';
    }
  	return this.apiService.get('doctors/'+id);
  }

  private handleError(error){

  }

}
