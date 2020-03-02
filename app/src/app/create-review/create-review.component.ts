import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ServicesService } from './../services.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  constructor(private _service: ServicesService) { }

  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('cgiCode', {static: false}) cgiCode: ElementRef;
  @ViewChild('firstName', {static: false}) firstName: ElementRef;
  @ViewChild('lastName', {static: false}) lastName: ElementRef;
  @ViewChild('reviewer', {static: false}) reviewer: ElementRef;
  @ViewChild('qaer', {static: false}) qaer: ElementRef;
  @ViewChild('cycle', {static: false}) cycle: ElementRef;
  @ViewChild('targetDate', {static: false}) targetDate: ElementRef;

  res:any;

  sendReq(cgiCodeValue){
    return this._service.getByCgiCodeReviewValues(cgiCodeValue);
  }

  ngOnInit() {
    const input = document.querySelector('input');
    const log = document.getElementById('cgiCodeField');
    input.addEventListener('input', this.cgiValue.bind(this));    
  }

  cgiValue(e) {
    console.log(e.target.value);
    let cgiCodeValue = e.target.value;
    this.sendReq(cgiCodeValue).subscribe( res => {
      console.log(res);
      if (res.status===200){
        console.log(res);
      }
      else{
        console.log("error occured");
        
      }
    });
    
  
  }

  createReview(){
    let reviewObject = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      email: this.email.nativeElement.value,
      cgiCode: this.cgiCode.nativeElement.value,
      reviewer: this.reviewer.nativeElement.value,
      qaer: this.qaer.nativeElement.value,
      cycle: this.cycle.nativeElement.value,
      targetDate: this.targetDate.nativeElement.value,
    }
 
    this._service.createReview(reviewObject).subscribe(res => this.res = res);
    console.log(this.res);
    if (this.res.status==200){

    }
    else{
      console.log("error occured");
      
    }

  }

}
