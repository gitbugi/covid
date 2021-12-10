import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { countrydata } from '../countrys.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-selectcountry',
  templateUrl: './selectcountry.component.html',
  styleUrls: ['./selectcountry.component.scss']
})
export class SelectcountryComponent implements OnInit {

  constructor(private getflags: HttpClient) { }

  @Input() countrydata!: string[];
  @Input() Selectedcountry!: countrydata;
  @Output() selected = new EventEmitter();

  countryshort = "de";
  flaglist!: Object;     //Liste aller Flaggen 

  ngOnInit(): void {
    this.getflags.get("https://flagcdn.com/en/codes.json").subscribe(
      (data) => {this.flaglist = data},
      (error) => {alert(error)},
      () => {} 
    )
  }

  onChange(x: string){
    //Change Flag
    for(let [key, value] of Object.entries(this.flaglist)){
      if(value === x){
        this.countryshort = key
      }
    }
    //Change confirmed,deaths and latest update
    this.selected.emit(x);
  }
}
