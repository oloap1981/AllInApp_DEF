import { HttpService } from '../../../services/shared/http.service';
import { NavController } from '@ionic/angular';

import { OnInit, Component, Input, NgZone } from '@angular/core';
import { Module } from '../../../models/modules/modules.namespace';
import { BaseComponent } from '../../../components/base/base.component';
import { Router } from '@angular/router';
import { BachecaElem } from '../../../models/bacheca/bacheca-elem';



@Component({
  selector: 'bacheca-card',
  templateUrl: 'bacheca-card.html'
})
export class BachecaCardComponent extends BaseComponent implements OnInit {

  public color: string;
  public icon: string;
  public colonne: number;
  @Input() modules: Module.ModuleElem[];
  public letta: string;
  public  bachecaFull: Array<BachecaElem>;
  public  bachecaMin: Array<BachecaElem> = [];

  constructor(
    private navCtrl: NavController,
    private http: HttpService,
    public router: Router,
    public ngZone: NgZone) {
    super(router, ngZone);

  }

  ngOnInit() {
    this.letta = 'S';
    console.log(this.modules);
    if (this.modules !== undefined) {
      for (const module of this.modules) {
        if (module.tab_moduli_cod === 2) {
          this.color = module.tab_moduli_colore;
          this.icon = module.tab_moduli_icona;
          this.colonne = module.tab_moduli_colonne;
        }
      }
    }

    this.http.getElencoAnnunci('0', '0', 'X').then(
      (res: Array<BachecaElem>) => {
        this.bachecaFull = res;
        if (this.colonne === 1) {
          for (let i = 0 ; i < 4 ; i++) {
            if (this.bachecaFull[i] != null) {
              this.bachecaMin[i] =  this.bachecaFull[i];
            }
          }
        } else {
          for (let i = 0 ; i < 3 ; i++) {
            if (this.bachecaFull[i] != null) {
              this.bachecaMin[i] =  this.bachecaFull[i];
            }
          }
        }
        console.log(this.bachecaMin);
      },
      (error) => {
        console.log('errore ricezione Annunci');
        console.log(error);
      }
    );
  }

  public goToBacheca() {
    this.goToPage('bacheca');
    // this.navCtrl.push(BachecaPage);
  }

  public goToDetails(bacheca) {
    this.goToPageParams('bacheca-details', { queryParams: { bacheca } });
    // this.navCtrl.push(BachecaDetailsPage, {bacheca});
  }

}

