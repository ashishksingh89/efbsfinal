// import { HttpEvent, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { TokenStorageService } from '../services/token-storage.service';
// import { ApplicationConstants } from '../services/ApplicationConstants';
// import { Observable } from 'rxjs';


// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private tokenService: TokenStorageService) { }
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return Observable.apply(this.handleAccess(request, next));
//       }
//       private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
//       Promise<HttpEvent<any>> {
//     const token = await this.tokenService.getToken();
//     let changedRequest = request;
//     // HttpHeader object immutable - copy values
//     const headerSettings: {[name: string]: string | string[]; } = {};
 
//     for (const key of request.headers.keys()) {
//       headerSettings[key] = request.headers.getAll(key);
//     }
//     if (token) {
//       headerSettings['Authorization'] = 'Bearer ' + token;
//     }
//     headerSettings['Content-Type'] = 'application/json';
//     const newHeader = new HttpHeaders(headerSettings);
 
//     changedRequest = request.clone({
//       headers: newHeader});
//     return next.handle(changedRequest).toPromise();
//   }
 
// }
    

//     // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     //     const token = this.tokenService.getToken();

//     //     req = req.clone({
//     //       setHeaders: {
//     //         'Content-Type' : 'application/json; charset=utf-8',
//     //         'Accept'       : 'application/json',
//     //         'Authorization': `Bearer ${token}`,
//     //       },
//     //     });
//     //     return next.handle(req);
//     //   }
//     // }    



// // export class AuthInterceptor implements HttpInterceptor {

// //     constructor(private token: TokenStorageService) { }

// //     intercept(req: HttpRequest<any>, next: HttpHandler) {
// //         let authReq = req;
// //         const token = this.token.getToken();
// //         if (token != null) {
// //             console.log(token+"token")
// //             authReq = req.clone({ headers: req.headers.set(ApplicationConstants.TOKEN_HEADER_KEY,  ApplicationConstants.TOKEN_TYPE + token) });
// //         }
// //         return next.handle(authReq);
// //     }
// // }

// // export const httpInterceptorProviders = [
// //     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// // ];
