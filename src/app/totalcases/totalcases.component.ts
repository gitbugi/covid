import { Component, Input, OnInit } from '@angular/core';
import { countrydata } from '../countrys.interface'

@Component({
  selector: 'app-totalcases',
  templateUrl: './totalcases.component.html',
  styleUrls: ['./totalcases.component.scss']
})
export class TotalcasesComponent implements OnInit {

  constructor() { }

  @Input() global!: countrydata;

  ngOnInit(): void {
    
  }
}