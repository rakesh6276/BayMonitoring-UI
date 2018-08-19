import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { OrderPipe } from 'ngx-order-pipe';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-categorytable',
  templateUrl: './categorytable.component.html',
  styleUrls: ['./categorytable.component.css']
})
export class CategorytableComponent implements OnInit {
  toolCat:any;
  _toolCatDat:any;
  p:number = 1;
  pageSize:number= 15;
  total:number;
  order: string='Tool_Name';
  reverse: boolean = false;
  term:any;
  
  constructor(private _service:DataService,private _orderPipe: OrderPipe) { }
  
  ngOnInit() {

    this._toolCatDat = this._service.toolCategoryList().subscribe(data =>{
      this.toolCat = data;
    })

  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  ngOnDestroy(){
    this._toolCatDat.unsubscribe();
  }

}
