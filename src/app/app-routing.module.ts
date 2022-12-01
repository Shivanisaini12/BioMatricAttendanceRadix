import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendenceReportComponent } from './attendence-report/attendence-report.component';
import { EmployeeProfComponent } from './employee-prof/employee-prof.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
  path : '',
  pathMatch:'full',
  redirectTo:'Register'
},
{
  path : 'Register',
  component : RegisterComponent
},
{
  path : 'login',
  component : LoginComponent
  
},

{
  path : 'AttendanceReport',
  component : AttendenceReportComponent
  
},
{
  path : 'EmpProfile',
  component : EmployeeProfComponent
  , data: {some_data: 'some value'}
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
