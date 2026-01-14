import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CountryDetailPageComponent } from "./pages/country-detail-page/country-detail-page.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
  {
    path : 'country/:id',
    component : CountryDetailPageComponent
  },

  {
    path : 'not-found',
    component : NotFoundPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
