import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private afAuth: AngularFireAuth, private authService:AuthService) {
        this.accessToken = this.authService.getImmediateAccessToken();
        this.afAuth.authState.subscribe((user) => {
            if(user) {
                user.getIdToken().then((token)=> this.accessToken = token); 
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
      