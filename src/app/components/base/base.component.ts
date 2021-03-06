import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {

  constructor(
    public router: Router,
    public ngZone: NgZone) { }

  public goToPage(pageName: string): void {
    this.ngZone.run(() => this.router.navigate([pageName])).then();
  }

  public goToPageParams(pageName: string, params: any): void {
    this.ngZone.run(() => this.router.navigate([pageName], params)).then();
  }

}
