import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarItemComponent } from './components/navbar-item/navbar-item.component';
import { UploadFieldComponent } from './components/upload-field/upload-field.component';

import { HomeComponent } from './views/home/home.component';
import { TopComponent } from './views/home/components/top/top.component';
import { FeatureComponent } from './views/home/components/feature/feature.component';
import { AboutusComponent } from './views/home/components/aboutus/aboutus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmissionComponent } from './views/submission/submission.component';
import { StepsComponent } from './views/submission/steps/steps.component';
import { RegisterComponent } from './views/submission/register/register.component';
import { AccountVerifyComponent } from './views/submission/account-verify/account-verify.component';
import { RegisterPropertyComponent } from './views/submission/register-property/register-property.component';
import { FooterComponent } from './views/home/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CreateContractComponent } from './views/submission/create-contract/create-contract.component';
import { CryptoPricesComponent } from './views/home/components/crypto-prices/crypto-prices.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { FileUploadService } from './services/file-upload.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegistredUserGuard } from './guards/registred-user.guard';
import { PropertyComponent } from './components/property/property.component';
import { LoginComponent } from './components/login/login.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadFieldComponent,
    NavbarItemComponent,
    HomeComponent,
    TopComponent,
    FeatureComponent,
    AboutusComponent,
    SubmissionComponent,
    StepsComponent,
    RegisterComponent,
    AccountVerifyComponent,
    RegisterPropertyComponent,
    FooterComponent,
    CreateContractComponent,
    CryptoPricesComponent,
    UserProfileComponent,
    PropertyComponent,
    LoginComponent,
    AdminloginComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    FileUploadService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
