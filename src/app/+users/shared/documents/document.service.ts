import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DocumentService {
 
  constructor(private apiService: ApiService) {
    
  }

  get(id?: any){
    if(id)
      return this.apiService.get('documents/'+id);

  	return this.apiService.get('documents');
  }

  add(data){
  	return this.apiService.post('documents',data);
  }

  delete(id){
    return this.apiService.delete('documents/'+id);
  }

  update(id,data){
    return this.apiService.post('documents/'+id,data);
  }

  private handleError(error){

  }

}
