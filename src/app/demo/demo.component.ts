import { Component, OnInit } from '@angular/core';
import { ApiBrowserTravelService } from '../services/api-browser-travel.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public array:any = [];
  public object:any=  { };
  public humidities:any = [];

  constructor(
    private api:ApiBrowserTravelService,
  ) { }

  ngOnInit() {
    this.api.getHumidities('get-all').subscribe(
      (result:any) => {
        if(result){
          this.humidities = [];
          for(let i=0;i<result.data.length;i++){
            this.humidities.push(result.data[i]);

          }
          console.log(this.humidities)
        }
      },
    );
  }
}
