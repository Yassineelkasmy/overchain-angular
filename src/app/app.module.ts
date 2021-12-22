import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'submission',
    component: SubmissionComponent,
    children: [
      { path: 'register' , component: RegisterComponent },
      { path: 'accountverify' , component: AccountVerifyComponent },
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
