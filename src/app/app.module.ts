import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CountryDetailPageComponent } from "./pages/country-detail-page/country-detail-page.component";
import { HeaderComponent } from './components/header/header.component';
import { MedalsChartComponent } from './components/medals-chart/medals-chart.component';
import { CountryChartComponent } from './components/country-chart/country-chart.component';
import { ModalBoxComponent } from './components/modal-box/modal-box.component';

@NgModule({
  declarations: [AppComponent, DashboardPageComponent, NotFoundPageComponent, CountryDetailPageComponent],
  imports: [BrowserModule, AppRoutingModule, HeaderComponent, MedalsChartComponent, CountryChartComponent,ModalBoxComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
