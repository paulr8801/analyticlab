import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { ErrorComponent } from './components/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/materialModule'
import { CommercesService } from './services/commerces.service';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
    NgApexchartsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
