import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DecisionsListComponent } from './components/decisions-list/decisions-list.component';
import { DecisionDetailComponent } from './components/decision-detail/decision-detail.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'list',
  component: DecisionsListComponent
}, {
  path: 'detail/:id',
  component: DecisionDetailComponent
},
{
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
