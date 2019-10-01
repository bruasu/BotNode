import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FibonacciService {

  constructor(
   private http: HttpClient
  ) { }

  calculationFibonacci(hegh: number, low: number): Observable<any>{
    return this.http.get("http://localhost:2500/api/fibonacci/"+hegh+"/"+low);
  }

}
