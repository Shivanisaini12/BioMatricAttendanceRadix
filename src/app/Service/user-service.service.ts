import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  
  constructor(private http : HttpClient) {
    
   }

  registerUser(user : Array<ArrayType>)
  {
    return this.http.post(environment.baseurl + "Employee/CreateUser", 
    {
      FirstName: user[0],
      LastName: user[1],
      Gender: user[2],
      EmailId: user[3],
      Password: user[4],
      Contact: user[5],
   },
   {
      responseType : 'text',
   });
  }

  loginUser(loginInfo : Array<string>)
  {
      return this.http.post(environment.baseurl + 'Employee/LoginUser', 
      {
        EmailId: loginInfo[0],
         Password : loginInfo[1]
      },
      {
        responseType: 'text',
      },);
  }

  getLoginUser(emailId : string) //, Emp_Id : number)
  {
    debugger
    var link=environment.baseurl + 'Employee/GetUser?EmailId=' + emailId; // + Emp_Id;
    return this.http.get(link);
  }

  getDepartment()
  {
    return this.http.get(environment.baseurl + 'Employee/GetDepartMent')
  }

  getDesignation()
  {
    return this.http.get(environment.baseurl + 'Employee/GetDesignation')
  }

  insertBasicDetails(Emp : Array<ArrayType>)
  {
    return this.http.post(environment.baseurl + 'Employee/InsertBasicDetails', 
    {
      Emp_Email: Emp[0],
      DesignationId: Emp[1],
      EmpId: Emp[2],
      DepartmentId: Emp[3],
   },
   {
      responseType : 'text',
   });
  }

  getDeviceDetails(){
    return this.http.get(environment.baseurl + 'Employee/GetDeviceDetails')
  }

  getAttendanceReport(){
    return this.http.get(environment.baseurl + 'Employee/AttendenceDetails')
  }
}

