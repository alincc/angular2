import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EducationService {
 
  constructor(private apiService: ApiService) {
    
  }

  get(id?: any){
    if(id)
      return this.apiService.get('education/'+id);

  	return this.apiService.get('education');
  }

  add(data){
  	return this.apiService.post('education',data);
  }

  delete(id){
    return this.apiService.delete('education/'+id);
  }

  update(id,data){
    return this.apiService.post('education/'+id,data);
  }

  private handleError(error){

  }

}
