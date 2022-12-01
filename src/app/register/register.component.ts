import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../Service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService : UserServiceService) { }
  repeatPass: string = 'none';
  displayMsg: string = '';
  IsAccountCreated: boolean = false;

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),

    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),

    Gender: new FormControl('', [Validators.required]),

    EmailId: new FormControl('', [Validators.required, Validators.email]),

    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),

    RPassword: new FormControl(''),

    Contact: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
  });

  registeredSubmit(){
    if (this.Password.value == this.RPassword.value) {
      console.log(this.registerForm.valid);
      this.repeatPass = 'none';

      this.userService
        .registerUser([
          this.FirstName.value,
          this.LastName.value,
          this.Gender.value,
          this.EmailId.value,
          this.Password.value,
          this.Contact.value,
        ])
        .subscribe((res) => {
          if (res == 'Success') {
            console.log(res);
            this.displayMsg = 'Account Created Succesfully';
            this.IsAccountCreated = true;
          } else if (res == 'AlreadyExisted') {
            this.displayMsg = 'Account already Exist. Try another email!';
            this.IsAccountCreated = false;
          } else {
            this.displayMsg = 'Something Went wrong!';
            this.IsAccountCreated = false;
          }
          console.log(res);
        });
    } else {
      this.repeatPass = 'inline';
    }
    this.registerForm.reset();

  }

  get FirstName(): FormControl {
    return this.registerForm.get('FirstName') as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get('LastName') as FormControl;
  }

  get Gender(): FormControl {
    return this.registerForm.get('Gender') as FormControl;
  }

  get EmailId(): FormControl {
    return this.registerForm.get('EmailId') as FormControl;
  }
 
  get Password(): FormControl {
    return this.registerForm.get('Password') as FormControl;
  }

  get RPassword(): FormControl {
    return this.registerForm.get('RPassword') as FormControl;
  }

  get Contact(): FormControl {
    return this.registerForm.get('Contact') as FormControl;
  }
}
