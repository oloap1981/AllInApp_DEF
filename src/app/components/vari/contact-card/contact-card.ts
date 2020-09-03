// import { ContactsPage } from './../contacts/contacts';
// import { NavController } from '@ionic/angular';

import { OnInit, Component, Input, NgZone } from '@angular/core';
import { Module } from '../../../models/modules/modules.namespace';
import { BaseComponent } from '../../../components/base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-card',
  templateUrl: 'contact-card.html'
})
export class ContactCardComponent extends BaseComponent implements OnInit {

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
        if (module.tab_moduli_cod === 6) {
          this.color = module.tab_moduli_colore;
          this.icon = module.tab_moduli_icona;
          this.colonne = module.tab_moduli_colonne;
        }
      }
    }
  }

  public goToContact() {
    this.goToPage('contacts');
    // this.navCtrl.push(ContactsPage);
  }

}

