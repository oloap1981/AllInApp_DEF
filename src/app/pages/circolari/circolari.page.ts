import { CircolariDetailsPage } from '../circolari-details/circolari-details';
import { HttpService } from '../../services/shared/http.service';
// import { StoreService } from './../../services/store/store.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';
import { Module } from '../../models/modules/modules.namespace';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Router } from '@angular/router';
import { IconNameService } from 'src/app/services/shared/iconname.service';

/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-circolari',
  templateUrl: 'circolari.page.html',
  styleUrls: ['circolari.page.scss']
})
export class CircolariPage extends BaseComponent implements OnInit {

  public comFull: Comunicazione.ComunicazioneElencoElem[];
  public groupedCom = [] ;
  public clonedCom = [];
  public color: string;
  public icon = 'circle';

  constructor(
    public navCtrl: NavController,
    private http: HttpService,
    private alertCtrl: AlertController,
    public router: Router,
    public ngZone: NgZone,
    public iconNameService: IconNameService) {

    super(router, ngZone);

  }

  ngOnInit() {

    this.http.getModules().then(
      (modules: Module.ModuleElem[]) => {
        console.log(modules);
        for (const module of modules) {
          if (module.tab_moduli_cod === 3) {
            this.color = module.tab_moduli_colore;
            const icona = module.tab_moduli_icona;
            this.icon = this.iconNameService.pulisciNomeIcone(icona);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
    // let s = this.store.userData$.subscribe(
    //   (val)=>{
    //     let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','R').subscribe(
    //       (val1)=>{
    //         this.comFull = val1.l_lista_comunicazione;
    //         s1.unsubscribe();
    //       }
    //     )
    //     s.unsubscribe();
    //   }
    // )
    // this.store.getUserData();

    this.http.getComunicazioniElenco(0, 0, 'X', 'R').then(
      (val1: Comunicazione.ComunicazioneElencoElem[] ) => {
        this.comFull = val1;
        this.clonedCom  = Object.assign([], this.comFull);
        this.groupCom(this.comFull);
        console.log(this.groupedCom);
        },
        (error) => {
          console.log(error);
        }
      );

  }

  goToDetails(com) {
    this.goToPageParams('circolari-details', { queryParams: { com: com.comunicazione_key } });
    // this.navCtrl.push(CircolariDetailsPage, {com});
  }

  groupCom(com: Comunicazione.ComunicazioneElencoElem[]) {
    const sortedCom = com.sort((n1, n2) => {
      if (new Date (n1.cm_data).getTime > new Date (n2.cm_data).getTime) { return 1; }
      if (new Date (n1.cm_data).getTime < new Date (n2.cm_data).getTime) { return -1; }
      return 0;
    });
    let currentLetter = '00';
    let currentCom = [];

    sortedCom.forEach((val, index) => {
        const value = val.cm_data;
        const temp = value.charAt(5) + value.charAt(6);
        if (temp  !== currentLetter) {

            currentLetter = value.charAt(5) + value.charAt(6);

            const newGroup = {
                letter: currentLetter,
                mese: this.getMese(currentLetter),
                anno: value.charAt(0) + value.charAt(1) + value.charAt(2) + value.charAt(3),
                com: []
            };

            currentCom = newGroup.com;
            this.groupedCom.push(newGroup);

        }
        currentCom.push(val);
    });
  }

  getMese(date) {
    let mese;
    if (date != null) { mese = date; }
    switch (mese) {
      case '01':
        mese = 'Gennaio';
        break;
      case '02':
        mese = 'Febbraio';
        break;
      case '03':
        mese = 'Marzo';
        break;
      case '04':
        mese = 'Aprile';
        break;
      case '05':
        mese = 'Maggio';
        break;
      case '06':
        mese = 'Giugno';
        break;
      case '07':
        mese = 'Luglio';
        break;
      case '08':
        mese = 'Agosto';
        break;
      case '09':
        mese = 'Settembre';
        break;
      case '10':
        mese = 'Ottobre';
        break;
      case '11':
        mese = 'Novembre';
        break;
      case '12':
        mese = 'Dicembre';
        break;
    }
    return mese;
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.comFull = [];
    this.comFull  = Object.assign([], this.clonedCom );
    // set val to the value of the ev target
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.comFull = this.comFull.filter((item) => {
        return (item.cm_titolo.toLowerCase().indexOf(val.toLowerCase()) > -1
                || item.cm_data.toLowerCase().indexOf(val.toLowerCase()) > -1
                );
      });
    }
    this.groupedCom = [];
    this.groupCom(this.comFull);
  }

  public back() {
    // let s = this.store.userData$.subscribe(
    //   (val)=>{
    //     let s1 = this.http.getComunicazioniElenco(val.token_value,0,0,'X','R').subscribe(
    //       (val1)=>{
    //         this.comFull = val1.l_lista_comunicazione;
    //         let lette = true;
    //         for (let i = 1 ; i < this.comFull.length ; i++){
    //           if (this.comFull[i].dc_letta == 'N') lette = false;
    //         }
    //         if (lette == true )this.navCtrl.pop();
    //         else{
    //           let alert = this.alertCtrl.create({
    //             title: 'Aspetta!!',
    //             subTitle: 'prima leggi tutte le circolari',
    //             buttons: ['Ok']
    //           });
    //           alert.present();
    //         }
    //         s1.unsubscribe();
    //       }
    //     )
    //     s.unsubscribe();
    //   }
    // )
    // this.store.getUserData();

  this.http.getComunicazioniElenco(0, 0, 'X', 'R').then(
        async (val1: Comunicazione.ComunicazioneElencoElem[]) => {
          this.comFull = val1;
          let lette = true;
          for (let i = 1 ; i < this.comFull.length ; i++) {
            if (this.comFull[i].dc_letta === 'N') { lette = false; }
          }
          if (lette === true ) {this.navCtrl.pop(); } else {
            const alert = await this.alertCtrl.create({
              header: 'Aspetta!!',
              message: 'prima leggi tutte le circolari',
              buttons: ['Ok']
            });
            await alert.present();
          }
        },
        (error) => {
          console.log(error);
        }
      );

  }
}
