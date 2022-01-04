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
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';
<<<<<<< HEAD
<<<<<<< HEAD

import { HttpClientModule } from '@angular/common/http';

import { CreateContractComponent } from './views/submission/create-contract/create-contract.component';
=======
>>>>>>> parent of e9894ef... Add create contract page

=======
>>>>>>> parent of 8a925a0... cryptoTracker

const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'submission',
    component: SubmissionComponent,
    children: [
      { path: 'register' , component: RegisterComponent, canActivate:[UnAuthGuard] },
      { path: 'accountverify' , component: AccountVerifyComponent, canActivate:[AuthGuard] },
      { path: 'registerproperty', component: RegisterPropertyComponent, canActivate: [AuthGuard],   }
    ]
  },
];

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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 8a925a0... cryptoTracker
=======
>>>>>>> parent of e9894ef... Add create contract page
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
