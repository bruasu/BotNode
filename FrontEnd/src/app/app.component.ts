import { Component } from '@angular/core';
import { FibonacciService } from './service/fibonacci.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  high: number;
  low: number;

  fibonacci: object;
  
  constructor( private fibo: FibonacciService){}

  requestValueFibonacci(){
    if(this.high && this.low){
      this.fibo.calculationFibonacci(this.high, this.low).subscribe((response) => {
        this.fibonacci = response;
      }, (err) => console.log(err));
    }
  }
}
