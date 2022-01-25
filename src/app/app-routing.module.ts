import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './views/admin/admin.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistredUserGuard } from './guards/registred-user.guard';
import { UnAuthGuard } from './guards/un-auth.guard';
import { HomeComponent } from './views/home/home.component';
import { AccountVerifyComponent } from './views/submission/account-verify/account-verify.component';
import { CreateContractComponent } from './views/submission/create-contract/create-contract.component';
import { RegisterPropertyComponent } from './views/submission/register-property/register-property.component';
import { RegisterComponent } from './views/submission/register/register.component';
import { SubmissionComponent } from './views/submission/submission.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { UsersComponent } from './views/admin/dashboard/users/users.component';
import { PropertiesComponent } from './views/admin/dashboard/properties/properties.component';
import { ContractsComponent } from './views/admin/dashboard/contracts/contracts.component';
import { ContractDeployComponent } from './views/admin/dashboard/contract-deploy/contract-deploy.component';

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
  {
    path:'admin', component:AdminComponent,
    children: [
      { path:'login' , component: AdminloginComponent },
      {
        path:'dashboard',
        component:DashboardComponent ,
        canActivate: [AuthGuard],
        children: [
          {path: "users", component: UsersComponent},
          {path: "properties", component: PropertiesComponent},
          {path: "contracts", component: ContractsComponent},
          {path: "contract-deploy/:id", component: ContractDeployComponent},
        ]
      }
    ]

  },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
