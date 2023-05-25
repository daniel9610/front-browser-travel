import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public array:any = [];
  public object:any=  { };
  constructor() { }

  ngOnInit() {
    this.array = [
      ["2018-12-01","AM","ID123", 5000],
      ["2018-12-01","AM","ID545", 7000],
      ["2018-12-01","PM","ID545", 3000],
      ["2018-12-02","AM","ID545", 7000]
    ];
   
  }

}
