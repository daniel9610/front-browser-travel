import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { ApiGradiwebService } from '../services/api-gradiweb.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  project: any = [];
  public vehicles:any = [];
  public brands:any = [];
  public users:any = [];
  public myForm: FormGroup;
  nameButton: any;
  user:any = this.auth.currentUserObservable.currentUser;


  constructor(
    public auth: AuthenticationService,
    private api:ApiGradiwebService,
    private  formBuilder: FormBuilder,
    ) { }

  ngOnInit() {

   this.api.getBrands('brands').subscribe(
    (result:any) => {
      if(result){
        this.brands = [];
        for(let i=0;i<result.length;i++){
          this.brands.push(result[i]);
          for(let j=0;j<this.vehicles.length;j++){
            this.brands.push(this.vehicles[j]);
          }
        }
      }
    },
 );

  this.api.getUsers('users').subscribe(
    (result:any) => {
      if(result){
        this.users = [];
        for(let i=0;i<result.length;i++){
          this.users.push(result[i]);
        }
      }
    },
  );


    this.myForm = this.formBuilder.group({
      type: ['', [Validators.required, Validators.minLength(1)]],
      license_plate: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(8)]],
      brand_id: ['', [Validators.required, Validators.minLength(1)]],
      user_id: ['',[Validators.required, Validators.minLength(1)]],
     });
  }
  get f() { return this.myForm.controls; }


  onSubmit(){

    const form = this.myForm.value;
    // if(form.parent_id==""){
    //   this.myForm.controls.parent_id.setValue("Na");
    // }
    // console.log(this.myForm.controls.parent_id)

    if(this.myForm.valid){
      this.nameButton = 'Enviando';
      this.api.postInsertVehicle( 'vehicles', form.type, form.license_plate, form.brand_id, form.user_id).subscribe(
          result => {
        console.log(result);

            if(result){
              Swal.fire({
                title: 'Vehículo registrado exitosamente',
                showConfirmButton: true,
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#008000'
              });
              this.myForm.reset();
            }
          },
          error => {
            Swal.fire({
              title: 'Error API.'
            });
          });
      this.nameButton = 'Enviar';
    }else if(this.myForm.invalid){
      console.log(this.myForm);
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Diligencie todos los campos del formulario',
        cancelButtonText: 'Ok'
      });
    }
  }

  getVehicles(brand_id){
    console.log(brand_id);
    this.api.getVehiclesForBrand('vehicles-for-brand', brand_id).subscribe(
      (result:any) => {
        if(result){
          this.vehicles = [];
          for(let i=0;i<result.length;i++){
            this.vehicles.push(result[i]);
          }
        }
      },
    );
  }
}
