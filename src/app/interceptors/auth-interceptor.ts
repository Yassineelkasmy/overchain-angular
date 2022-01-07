import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            if(user) {
              //const currentUser = user as User;
              user.getIdToken().then((token)=>this.accessToken = token);
              
            }
          })
    }
    accessToken? : string;
    
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        
        console.log(this.accessToken);
        if (this.accessToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + this.accessToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }


}
      