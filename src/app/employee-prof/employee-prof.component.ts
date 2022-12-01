import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../Service/user-service.service';

@Component({
  selector: 'app-employee-prof',
  templateUrl: './employee-prof.component.html',
  styleUrls: ['./employee-prof.component.css']
})
export class EmployeeProfComponent implements OnInit {
   
  emailId! : any;
  emp_Id: any;
  EmpList : any=[];
  sub: any;
  Department:any;
  Designation:any;
  displayMsg: string = '';
  DeviceDetails : any='';

  constructor(private userService: UserServiceService , private router : Router,private route: ActivatedRoute) {
    this.emailId =localStorage.getItem('emailId')
    this.emp_Id =localStorage.getItem('empId')
    console.log('test',this.emailId);
    this.userService.getLoginUser(this.emailId).subscribe((response) => {
      console.log(response);
      this.EmpList = response;
    });

    this.userService.getDeviceDetails().subscribe((r) => {
      this.DeviceDetails=r;
      console.log('date',r);
     })
   }

   profileForm = new FormGroup({
    DesignationId: new FormControl("",[Validators.required]),
    EmpId : new FormControl("",[Validators.required]),
    DepartmentId: new FormControl("",[Validators.required]),
});

  ngOnInit(): void {
    this.userService.getDepartment().subscribe((r) => {
     this.Department=r;
     console.log(r);
    })

    this.userService.getDesignation().subscribe((r) => {
      this.Designation=r;
      console.log(r);
     })

    //  this.userService.getDeviceDetails().subscribe((r) => {
    //   this.DeviceDetails=r;
    //   console.log('date',r);
    //  })

  }

  SubmitEmpProfile()
  {
    debugger;
    this.userService.insertBasicDetails([
      this.emailId =localStorage.getItem('emailId'),
      this.DesignationId.value,
      this.EmpId.value,
      this.DepartmentId.value,
    ]).subscribe((res) => {
      if (res == 'Success') 
      {
        console.log(res);
        this.displayMsg = 'Profile Submit Succesfully';
        alert('Profile Submit Succesfully');
      }  
      else 
      {
        this.displayMsg = 'Something Went wrong!';
      }
      console.log(res);
    });
    this.profileForm.reset();
  }


  get DesignationId(): FormControl {
    return this.profileForm.get('DesignationId') as FormControl;
  }

  get EmpId(): FormControl {
    return this.profileForm.get('EmpId') as FormControl;
  }

  get DepartmentId(): FormControl {
    return this.profileForm.get('DepartmentId') as FormControl;
  }
 
  
}




