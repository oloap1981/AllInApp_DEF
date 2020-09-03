import { Module } from '../../../models/modules/modules.namespace';

import { OnInit, Component, Input, NgZone } from '@angular/core';
import { BaseComponent } from '../../../components/base/base.component';
import { Router } from '@angular/router';



@Component({
  selector: 'documentale-card',
  templateUrl: 'documentale-card.html'
})

export class DocumentaleCardComponent extends BaseComponent implements OnInit {

  public color: string;
  public icon: string;
  public colonne: number;
  @Input() modules: Module.ModuleElem[];

  constructor(
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
  }

  ngOnInit() {
    if (this.modules !== undefined) {
      for (const module of this.modules) {
        if (module.tab_moduli_cod === 7) {
          this.color = module.tab_moduli_colore;
          this.icon = module.tab_moduli_icona;
          this.colonne = module.tab_moduli_colonne;
        }
      }
    }
  }

  goToDocumentale() {
    this.goToPage('documentale');
  //  this.navCtrl.push(DocumentalePage);
  }

}

