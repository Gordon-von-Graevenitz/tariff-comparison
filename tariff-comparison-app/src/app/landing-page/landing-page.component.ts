import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  showTable = false;
  tariffItems = [];

    showTableItems(event: any){
      this.showTable = false;
      if (event){
        this.tariffItems = event
        this.showTable = true;
      }
    }
}
