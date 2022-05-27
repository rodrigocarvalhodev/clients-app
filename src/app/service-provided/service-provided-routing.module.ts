import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ServiceProvidedFormComponent } from './service-provided-form/service-provided-form.component';
import { ServiceProvidedListComponent } from './service-provided-list/service-provided-list.component';

const routes: Routes = [
  {
    path: 'service-provided',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: ServiceProvidedListComponent
      },
      {
        path: 'form',
        component: ServiceProvidedFormComponent
      },
      {
        path: '',
        redirectTo: '/service-provided/list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProvidedRoutingModule { }
