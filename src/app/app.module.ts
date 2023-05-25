import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/auth.guard';

import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import { GoogleChartsModule } from 'angular-google-charts';

import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { DemoComponent } from './demo/demo.component';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'demo', component: DemoComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    DemoComponent
 
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    GoogleChartsModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
