import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { OrderPipe } from 'ngx-order-pipe';
import { filter } from 'rxjs/operators';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import {AddProjects} from './projectsupdates'
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormsModule,FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';

interface Details{
  name:string,
  id:string,
  description:string
}
interface ABCD{
  
email:string,
first_name:string,
group:string,
id:number,
is_active:boolean,
is_admin:boolean,
is_owner:boolean,
last_name:string,
rfid:string
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  // count:number;
  // abcd: any=[];
  usersid:any=[];
  selectusers: any;
  modalRef:BsModalRef ;
  _getprojects:any;
  getprojects:any;
  p:number = 1;
  pageSize:number= 15;
  total:number;
  order: string='Tool_Name';
  reverse: boolean = false;
  term:any;
  usersob:any=[];
  user:any={};
  abcd : ABCD[]=[];
  
  
  constructor(private _service:DataService,private router:Router,private _newproject:DataService,private _modalservice:BsModalService) { }
 
  addproject :AddProjects =new AddProjects;
  projectdetails : Details ={} as Details;
  
 
  
  ngOnInit() {
   
      this._service.getAllprojects().subscribe(data =>{
        console.log(data,"this nis wht i want.....");
        this.getprojects=data;
      });

      

        this._service.getAllusers().subscribe(data=>{
          console.log(data,"this are users");
          this.selectusers = data;
          console.log(this.selectusers);
        })

       
      // form: FormGroup;

      // constructor() {
      //   this.form = new FormGroup({
      //     country: new FormControl(null)
      //   })
      // }
    
      // get country(): string {
      //   return this.form ? this.form.get('country').value : '';
      // }
   
    }
 

    clearProjects(){
      this._service.getAllprojects().subscribe(data =>{
        console.log(data,"this nis wht i want.....");
        this.getprojects=data;
      });
    }
  
  
  // addprojects(){
  //   console.log("this is what a add function ");
  //   this.router.navigate(['/addprojects']);
  //   return false;
  // }
  saveNewProjects(tooldata){
    console.log('MYTOOL REFERENCE',tooldata);
    this._newproject.saveNewProjects(tooldata).subscribe(data=>{
      console.log('MY RESPONSE REFERENCE',data);
      this._service.getAllprojects().subscribe(data =>{
        console.log(data,"this nis wht i want.....");
        this.getprojects=data;
      });

      // this.messageresponse = data;
      // this.openModal(this.messageresponse);
      // this.callAllProjects()
    })
  
  }
  assignusers(template: TemplateRef<any>,details){
    console.log(details,"details i want");
    
    this.projectdetails=details;
    this.modalRef = this._modalservice.show(template ,{class: 'modal-lg'});
    // this._service.sendIdGetUsers(details.id).subscribe(data=>{
    //   this.usersob = data;
    //   console.log('USER-RESPONSE',this.usersob);
    
    //   })
    

  }


  
  addusers(names){
    console.log(names);
   this.usersob=names;
   console.log(this.usersob);
   

  }
  // let num = [7, 8, 9];
  // num.forEach(function (value) {
  //   console.log(value);
  // }); 

  // selectChildren(data, $event) {
  //   let parentChecked = data.checked;
  //    this.hierarchicalData.foreach(obj => {
  //       obj.foreach(childObj=> {
  //         value.checked = parentChecked;
  //      })
  //   };
  // }

  assign(assigneduser,id){
    console.log ("UsersASSIGNED",assigneduser);
    console.log("PROJECTID",id);
   for (let i = 0; i < assigneduser.length; i++) {
   this.usersid.push(assigneduser[i].id);
   }
   console.log(this.usersid,"this is users id-2 only");
   console.log(id,"this is project id");
   let users_assigned={user_ids:this.usersid};
   this._service.assignprojects(users_assigned,id).subscribe(data=>{
     console.log(data);
   });
  }

  editproject(projectedit,projects){
    console.log(projects,"projects details name and description");
    this.projectdetails=projects;
    this.modalRef=this._modalservice.show (projectedit,{class:'modal-lg'})
  }

  projectedited(prodet){
    console.log("this is projects tools, or usrd");
    console.log(prodet,'project details changed');
    this._service.projectedited(prodet).subscribe(data=>{
      console.log(data);
    })    
  }

  // titleCaseWord(word) {
  //   console.log(word.name)
  //   return word.name.toUpperCase;
  // }  

  // titleCaseWord(str) {
  //   console.log(str);
  //   return str.toLowerCase().split(' ').map((word)=> {
  //      return (word.charAt(0).toUpperCase() + word.slice(1));
  //   }).join(' ');
  // }

  titleCaseWord(str) {
    console.log(str);
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    console.log('scs',str.join(' '));
    this.addproject.name = str.join(' ');
    // return str.join(' ');
  }
  
  // titleCaseWord1(str) {
  //   console.log(str);
  //   str = str.toLowerCase().split(' ');
  //   for (var i = 0; i < str.length; i++) {
  //     str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  //   }
  //   console.log('scs',str.join(' '));
  //   this.addproject.description = str.join(' ');
  //   // return str.join(' ');
  // }

  titleCaseWord3(str) {
    console.log(str);
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    console.log('scs',str.join(' '));
    this.projectdetails.name = str.join(' ');
    // return str.join(' ');
  }

  // titleCaseWord4(str) {
  //   console.log(str);
  //   str = str.toLowerCase().split(' ');
  //   for (var i = 0; i < str.length; i++) {
  //     str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  //   }
  //   console.log('scs',str.join(' '));
  //   this.projectdetails.description = str.join(' ');
  //   // return str.join(' ');
  // }

  



  }



