import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { Route, RouterModule } from '@angular/router';
import { CatalogService } from './catalog.service';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from '../shared/card/card.module';

const routes: Route[] = [
  {
    path: '',
    component: CatalogComponent
  }
]


@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    CardModule
  ],
  providers: [
    CatalogService
  ]
})
export class CatalogModule { }
