import { Injectable } from '@angular/core';
import {ApiService } from '../../shared';

@Injectable()
export class PracticeService {

  constructor(private apiService: ApiService) {

  }

  getPractices(){
  	return this.apiService.get('practices?limit=200');
  }
  
  update(id:number,data){
    console.log(data);
    return this.apiService.post('practices/'+id,data);
  }

  destroy(id:number){
    return this.apiService.delete('practices/'+id);
  }

  add(data){
  	return this.apiService.post('practices',data);
  }

}


