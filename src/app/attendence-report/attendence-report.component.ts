import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Service/user-service.service';

@Component({
  selector: 'app-attendence-report',
  templateUrl: './attendence-report.component.html',
  styleUrls: ['./attendence-report.component.css']
})
export class AttendenceReportComponent implements OnInit {

  Attendance : any;
  difference: any;
  constructor(public userService : UserServiceService) {
    this.userService.getAttendanceReport().subscribe((r) => {
      debugger
      this.Attendance=r;
      console.log(r);
     //this.difference = Number(r.inTime.value) + Number(r.outTime)
     })
   }
   

  ngOnInit(): void {
  }
  addition(start:string,end:string){
      var a = start.split(":");
      var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
      var b = end.split(":");
      var seconds2 = (+b[0]) * 60 * 60 + (+b[1]) * 60;
    
      var date = new Date(1970, 0, 1);
      date.setSeconds(seconds - seconds2);
      var c = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
      return c.replace(":00","");
    }
}
