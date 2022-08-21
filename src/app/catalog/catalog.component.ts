import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products$ = this.catalogService.products$;

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {
    this.catalogService.getProducts();
  }

}
