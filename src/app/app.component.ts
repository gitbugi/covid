import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Chart, registerables } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { countrydata } from './countrys.interface'

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpService, private translate: TranslateService) {
    this.translate.setDefaultLang('de')
  }
  //Werte für einzelne Länder
  country: countrydata = {
    Confirmed: 0,
    Deaths: 0,
    Incident_Rate: 0,
    Last_Update: "",
    Province_State: "",
    Country_Region: ""
  }
  //Werte für Alle Länder zusammen
  global: countrydata = {
    Confirmed: 0,
    Deaths: 0,
    Incident_Rate: 0,
    Last_Update: "",
    Province_State: "",
    Country_Region: ""
  }

  confirmed: string[] = []          //zum zusammenrechnen der Werte von verschiedenen Bundesländer
  deaths: string[] = []             //zum zusammenrechnen der Werte von verschiedenen Bundesländer
  incident = 0;
  howmanyincident = 0;
  myChart!: Chart;
  selectedCountry = "Germany";
  countryzwischenwert!: string;

  countrys!: Array<countrydata>       //Komplette Liste der Länder und den dazugehörigen Daten
  countryswithoutrepition: string[] = [];

  ngOnInit(): void {
    this.http.getglobal().subscribe(
      (data) => {
        this.global.Confirmed = data.summaryStats.global.confirmed,
          this.global.Deaths = data.summaryStats.global.deaths,
          this.countrys = data.rawData,
          this.searchCountry(data.rawData)
      },
      (error) => {
        alert("es ist ein Fehler aufgetreten: " + error)
      },
      () => {
        this.filtercountrys();
        this.updateGraphic();
      }
    )
  }

  filtercountrys() {
    for (let x = 0; x < this.countrys.length; x++) {
      if (this.countryzwischenwert !== this.countrys[x].Country_Region) {
        this.countryswithoutrepition.push(this.countrys[x].Country_Region)
      }
      this.countryzwischenwert = this.countrys[x].Country_Region;
    }
  }

  searchCountry(data: Array<countrydata>) {
    this.confirmed = [];
    this.deaths = [];
    this.incident = 0;

    for (let x = 0; x < this.countrys.length; x++) {
      if (data[x].Country_Region === this.selectedCountry && data[x].Province_State !== "Unknown") {
        this.howmanyincident++;
        this.confirmed.push(data[x].Confirmed.toString());
        this.deaths.push(data[x].Deaths.toString());
        this.incident = data[x].Incident_Rate;
        this.country.Last_Update = data[x].Last_Update;
      }
    }
    if (this.howmanyincident === 1) {
      this.country.Incident_Rate = this.incident;
    }
    else {
      this.country.Incident_Rate = 0;
    }
    this.howmanyincident = 0;

    //Alle confirmed und death values zusammenrechnen und als INT speichern
    let confirm = this.confirmed.map((item: string) => { return parseInt(item) })
    this.country.Confirmed = confirm.reduce((a: number, b: number) => a + b, 0)
    let death = this.deaths.map((item: string) => { return parseInt(item) })
    this.country.Deaths = death.reduce((a: number, b: number) => a + b, 0)
  }

  updateGraphic() {
    this.myChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: [
          'Confirmed',
          'Deaths'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.country.Confirmed, this.country.Deaths],
          backgroundColor: [
            'yellow',
            'red'
          ],
          hoverOffset: 4
        }],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        maintainAspectRatio: false,
      }
    })
  }

  changeCountry(value: string) {
    this.selectedCountry = value;
    this.searchCountry(this.countrys);
    this.myChart.destroy();
    this.updateGraphic();
  }
}
