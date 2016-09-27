import {Directive,HostBinding,ElementRef,Input,OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[type=submit]'
})
export class SubmitButton implements OnInit{

    @HostBinding('disabled') disabled:boolean;
    @Input() message:string;
    @Input() inprogress: Subject<boolean>;// = false;
    private initialHtmlContent:string = '';
    private el: ElementRef;

	constructor(el: ElementRef) {
	  	this.el = el;
	  	//this.disabled = true;
	}

  	ngOnInit(){

  		this.initialHtmlContent = this.el.nativeElement.innerHTML;
	  	setTimeout(() => {
	  		this.inprogress.subscribe(res => {
		  		if(res == true){
		  			let loader = '<div class="btn-loading"></div>'+this.message;
		  			this.el.nativeElement.innerHTML = loader;
		  			this.el.nativeElement.disabled = true;
		  			this.disabled = true;
		  		}

		  		if(res == false){
		  			this.el.nativeElement.innerHTML = this.initialHtmlContent;
		  			this.el.nativeElement.disabled = false;
		  		}

		  	});
	  	})
  	}

}
