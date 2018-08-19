import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { OrderPipe } from 'ngx-order-pipe';
import { filter } from 'rxjs/operators';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import {AddProjects} from './projectsupdates'
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  usersid:any;
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

        this._service.getAllusers().subscribe(data=>{
          console.log(data,"this are users");
          this.selectusers = data;
          console.log(this.selectusers);
        })

       
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
 


  
  
  // addprojects(){
  //   console.log("this is what a add function ");
  //   this.router.navigate(['/addprojects']);
  //   return false;
  // }
  saveNewProjects(tooldata){
    console.log(tooldata);
    this._newproject.saveNewProjects(tooldata).subscribe(data=>{
      console.log(data);
      this.getprojects=data;
      // this.messageresponse = data;
      // this.openModal(this.messageresponse);
      // this.callAllProjects()
    })
  
  }
  assignusers(template: TemplateRef<any>,details){
    console.log(details,"details i want");
    
    this.projectdetails=details;
    this.modalRef = this._modalservice.show(template ,{class: 'modal-lg'});

    

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
    console.log (assigneduser,id);
      this.abcd=assigneduser;
     let count ;
    console.log(Object.keys(assigneduser).length,"this is the fhgskgsssssssssssssssd");
   console.log(count=Object.keys(this.abcd).length,"it is the lenght stored in variable");
   console.log(this.abcd[0].id,"this is id of users  aaaaaaaaaaaaaaaa");
  //  let array = [1,2,3];
   for (let i = 0; i < count; i++,this.usersid++) {
    //  console.log(abcd[i].id,"this this this this this ");
    //  console.log(abcd,"this is ");
   this.usersid= this.abcd[i];
   
   console.log(this.usersid.id,"this is users id only");
   }
   console.log(id,"this is project id");
   console.log(this.abcd,"this out of for loop");

   this._service.assignprojects(this.abcd,id).subscribe(data=>{
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



  }



