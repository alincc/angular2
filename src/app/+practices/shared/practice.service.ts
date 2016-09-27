import { Injectable } from '@angular/core';
import {ApiService } from '../../shared';

@Injectable()
export class PracticeService {

  constructor(private apiService: ApiService) {

  }

  getPractices(params?:any,asObservable?:boolean){
    if(!params){
      params = {};
    }
    
    if(!params.limit){
      params.limit = 200;
    }
    
    let endpoint = 'practices';
    if(asObservable === true){
      return this.apiService.getAsObservable(endpoint,params);
    }
  	return this.apiService.get(endpoint,params);
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


