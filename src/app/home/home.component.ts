import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { ApiBrowserTravelService } from '../services/api-browser-travel.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  public markers: any[];
  public lat: number;
  public lng: number;
  public zoom: number;

  project: any = [];
  public vehicles:any = [];
  public brands:any = [];
  public users:any = [];
  public humidities:any = [];
  public myForm: FormGroup;
  nameButton: any;
  user:any = this.auth.currentUserObservable.currentUser;


  constructor(
    public auth: AuthenticationService,
    private api:ApiBrowserTravelService,
    private  formBuilder: FormBuilder,
    ) { 
      this.lat = 0;
      this.lng = 0;
      this.zoom = 2;
      this.markers = [];
    }

  ngOnInit() {

    this.markers.push({
      position: {
        lat: 25.77427,
        lng: -80.19366
      },
      label: {
        color: "black",
        text: "Miami"
      }
    });

    this.markers.push({
      position: {
        lat: 40.71427,
        lng: -74.00597
      },
      label: {
        color: "black",
        text: "NewYork"
      }
    });

    this.markers.push({
      position: {
        lat: 28.53834,
        lng: -81.37924
      },
      label: {
        color: "black",
        text: "Orlando"
      }
    });
  }



  placeMarker($event){
    // console.log($event.coords);
    this.api.getHumidityPlace( 'get-humidity-2', $event.coords.lng.toString(), $event.coords.lat.toString()).subscribe(
      (result: any) => {
      // console.log(result);
        if(result){
          Swal.fire({
            title: result.place_name,
            text: 'Humedad: '+result.humidity,
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#008000'
          });
        }
      },
      error => {
        Swal.fire({
          title: 'Error API.'
        });
      });
  }
 
}
