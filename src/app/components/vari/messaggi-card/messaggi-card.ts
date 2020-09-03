// import { MessaggiDetailsPage } from './../messaggi-details/messaggi-details';

// import { MessaggiPage } from './../messaggi/messaggi';
// import { NewsDetailsPage } from './../news-details/news-details';
// import { NewsPage } from './../news/news';
import { HttpService } from '../../../services/shared/http.service';
import { NavController, MenuController } from '@ionic/angular';

import { OnInit, Component, Input, NgZone } from '@angular/core';
// import { HomeElement } from '../../models/home-element/home-element.namespace';
// import { StoreService } from '../../services/store/store.service';
// import { News } from '../../models/news/news.namespace';
import { Messaggi } from '../../../models/messaggi/messaggi.namespace';
import { Module } from '../../../models/modules/modules.namespace';
import { BaseComponent } from '../../../components/base/base.component';
import { Router } from '@angular/router';


@Component({
  selector: 'messaggi-card',
  templateUrl: 'messaggi-card.html'
})


export class MessaggiCardComponent extends BaseComponent implements OnInit {

  public messFull: Messaggi.MessaggiElem[] = [];

  public messMin: Messaggi.MessaggiElem[] = [];

  public color: string;
  public icon: string;
  public colonne: number;

  @Input() modules: Module.ModuleElem[];

  constructor(
    private navCtrl: NavController,
    private http: HttpService,
    public menuCtrl: MenuController,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

  }

  ngOnInit() {

    if (this.modules !== undefined) {
      for (const module of this.modules) {
        if (module.tab_moduli_cod === 5) {
          this.color = module.tab_moduli_colore;
          this.icon = module.tab_moduli_icona;
          this.colonne = module.tab_moduli_colonne;
        }
      }
    }

    // let s = this.store.userData$.subscribe((val)=>{
    //     let s1 = this.http.getMessaggeList(val.token_value,"0","0","I").subscribe(
    //         (res)=>{
    //           console.log(res);
    //           if (res.ErrorMessage.msg_code == 0){
    //             this.messFull = res.l_lista_messaggi;
    //             if (this.colonne==1){
    //               for (let i = 0 ; i < 4 ; i++){
    //                 if (this.messFull[i] != null){
    //                   this.messMin[i]=  this.messFull[i];
    //                 }
    //               }
    //             }else{
    //               for (let i = 0 ; i < 3 ; i++){
    //                 if (this.messFull[i] != null){
    //                   this.messMin[i]=  this.messFull[i];
    //                 }
    //               }
    //             }

    //           }else{
    //             console.log("errore ricezione News");
    //           }
    //           s1.unsubscribe();
    //         }
    //       );
    //       s.unsubscribe();
    //      }
    //   );
    //   this.store.getUserData();

    this.http.getMessaggeList("0", "0", "I").then(
      (res: Messaggi.MessaggiElem[]) => {
        console.log(res);
        this.messFull = res;
        if (this.colonne === 1) {
          for (let i = 0 ; i < 4 ; i++) {
            if (this.messFull[i] != null) {
              this.messMin[i] =  this.messFull[i];
            }
          }
        } else {
          for (let i = 0 ; i < 3 ; i++) {
            if (this.messFull[i] != null) {
              this.messMin[i] =  this.messFull[i];
            }
          }
        }
      },
      (error) => {
        console.log(error);
      });
    }

    public goToMessaggi() {
      this.goToPageParams('messaggi', { queryParams: { queryParams: { messFull: this.messFull } } });
      // this.navCtrl.push(MessaggiPage, {messFull : this.messFull});
      // this.navCtrl.setRoot(MessaggiPage);
      this.menuCtrl.enable(false, 'home');
    }

    public goToDetails(mess) {
      this.goToPageParams('messaggi-details', { queryParams: { queryParams: { mess } } });
      // this.navCtrl.push(MessaggiDetailsPage, {mess});
    }
}
