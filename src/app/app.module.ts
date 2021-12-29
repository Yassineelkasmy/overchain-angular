import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarItemComponent } from './components/navbar-item/navbar-item.component';
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
import { CreateContractComponent } from './views/submission/create-contract/create-contract.component';
import { FooterComponent } from './views/home/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'submission',
    component: SubmissionComponent,
    children: [
      { path: 'register' , component: RegisterComponent, canActivate:[UnAuthGuard] },
      { path: 'accountverify' , component: AccountVerifyComponent, canActivate:[AuthGuard] },
      { path: 'createcontract', component: CreateContractComponent, canActivate: [AuthGuard],   }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarItemComponent,
    HomeComponent,
    TopComponent,
    FeatureComponent,
    AboutusComponent,
    SubmissionComponent,
    StepsComponent,
    RegisterComponent,
    AccountVerifyComponent,
    CreateContractComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
