import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RegistredUserGuard } from './guards/registred-user.guard';
import { UnAuthGuard } from './guards/un-auth.guard';
import { HomeComponent } from './views/home/home.component';
import { AccountVerifyComponent } from './views/submission/account-verify/account-verify.component';
import { CreateContractComponent } from './views/submission/create-contract/create-contract.component';
import { RegisterPropertyComponent } from './views/submission/register-property/register-property.component';
import { RegisterComponent } from './views/submission/register/register.component';
import { SubmissionComponent } from './views/submission/submission.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'submission',
    component: SubmissionComponent,
    children: [
      { path: 'register' , component: RegisterComponent, canActivate:[UnAuthGuard] },
      { path: 'accountverify' , component: AccountVerifyComponent, canActivate:[AuthGuard] },
      { path: 'registerproperty', component: RegisterPropertyComponent, canActivate: [AuthGuard, RegistredUserGuard],   },
      { path: 'createcontract', component: CreateContractComponent, canActivate: [AuthGuard, RegistredUserGuard],   }
    ]
  },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
