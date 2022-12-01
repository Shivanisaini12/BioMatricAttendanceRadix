import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserServiceService } from '../Service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  uEmail:string="";
  usersp:any=""

  currentuser : BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private userservice : UserServiceService, private router : Router,private route: ActivatedRoute)
   { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
   
    email: new FormControl("",[Validators.required, Validators.email]),
    password : new FormControl("",[Validators.required,Validators.minLength(5), Validators.maxLength(15)])
});

userValid : boolean= false;

loginSubmitted()
{
  this.userservice.loginUser([ this.email.value, this.password.value]).subscribe(res =>
    {
      if(res == 'failure') {
        this.userValid=false;
        alert('Login Unsuccessful!');
      }
      else
      {
        if(this.email.value=='Admin@gmail.com' && this.password.value == '123456')
        {
          this.router.navigate(['/AttendanceReport']);
        }
        else{
        this.userValid=true;
        var emailId=res;
        var emp_Id = res;
        console.log(emailId);
        localStorage.setItem('emailId',emailId)
        localStorage.setItem('empId',emp_Id)
        this.router.navigate(['/EmpProfile']);
      }

      // this.router.navigate(['/EmpProfile'], { state: { email: emailId } })
      //  this.router.navigate(['/EmpProfile'],{ queryParams: { uEmail:emailId}})
      //  this.router.navigateByUrl('EmpProfile/emailId?=' + emailId)
      }
    });
}



get email() : FormControl
{
  return this.loginForm.get("email") as FormControl;
}

get password() : FormControl
{
  return this.loginForm.get("password") as FormControl;
}

}
