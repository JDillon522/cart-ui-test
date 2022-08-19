import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <section>
      <!-- TODO make header and footer separate components and project into them  -->
      <div class="header-content">
        <ng-content select="[header]"></ng-content>
      </div>

      <div class="body-content">
        <ng-content select="[body]"></ng-content>
      </div>

      <div class="footer-content">
        <ng-content select="[footer]"></ng-content>
      </div>
    </section>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
