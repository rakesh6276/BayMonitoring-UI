import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Addusers} from '../users/usersupdate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  getusers:any;
  p:number = 1;
  pageSize:number= 15;
  total:number;
  order: string='Tool_Name';
  reverse: boolean = false;
  term:any;
  groups:any;
  constructor(private _service:DataService,private router:Router) { }
  users : Addusers = new Addusers;
  ngOnInit() {

    this._service.getAllusers().subscribe(data=>{
      console.log(data,"this are users");
      this.getusers = data;
      console.log(this.getusers);
    })
    this._service.getgroups().subscribe(data=>{
      console.log(data);
      this.groups = data;
      console.log(data,"this is user group");
    })
  }
  saveNewUser(users){
    console.log('USER FOR REFERENCE',users);
    this._service.saveNewuser(users).subscribe(data=>{
      // this.getusers=data;
      // this.router.navigate(['/users']);
      console.log(data);
      this._service.getAllusers().subscribe(data=>{
        console.log(data,"ALL users");
        this.getusers = data;
        console.log(this.getusers);
      })

    })
  }

  titleCaseWord1(str) {
    console.log(str);
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    console.log('scs',str.join(' '));
    this.users.first_name = str.join(' ');
    // return str.join(' ');
  }

  titleCaseWord2(str) {
    console.log(str);
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    console.log('scs',str.join(' '));
    this.users.last_name = str.join(' ');
    // return str.join(' ');
  }


}


