import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bankProduct } from '../interfaces/bankProduct';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankProductService {

  private bankServiceUrl = "http://localhost:3002";

  constructor(private http:HttpClient) { }


  private handleError(error: HttpErrorResponse): any {
    let codigo;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      codigo = {
        codigo: error.status,
        message: error.message,
      };
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(codigo);
  }

  getBankProducts():Observable<any>{
    return this.http.get<bankProduct[]>(`${this.bankServiceUrl}/bp/products`).pipe(catchError(this.handleError));
  }

  getBankProduct(id:string):Observable<any>{
    return this.http.get<bankProduct>(`${this.bankServiceUrl}/bp/products/${id}`).pipe(catchError(this.handleError));
  }

  
  createBankProduct(product:bankProduct):Observable<any>{
    return this.http.post<bankProduct>(`${this.bankServiceUrl}/bp/products`,product).pipe(catchError(this.handleError));
  }


  verificationProduct(id:string): Observable<any> {
    return this.http.get<any>(`${this.bankServiceUrl}/bp/products/verification/${id}`).pipe(catchError(this.handleError));
  }


  updateBankProduct(id:string, product:bankProduct):Observable<any>{
    return this.http.put<bankProduct>(`${this.bankServiceUrl}/bp/products/${id}`, product).pipe(catchError(this.handleError));
  }

  deleteBankProduct(id:string):Observable<any>{
    return this.http.delete<any>(`${this.bankServiceUrl}/bp/products/${id}`).pipe(catchError(this.handleError));
  }
}
