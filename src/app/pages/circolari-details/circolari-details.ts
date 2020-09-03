// import { ComunicazioniDetailsModule } from './../../modules/comunicazioni-details/comunicazioni-details.module';
import { HttpService } from './../../services/shared/http.service';
import { StoreService } from './../../services/store/store.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';
import { Module } from '../../models/modules/modules.namespace';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';
import { IconNameService } from 'src/app/services/shared/iconname.service';

/**
 * Generated class for the ComunicazioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'circolari-details',
  templateUrl: 'circolari-details.html',
})
export class CircolariDetailsPage extends BaseComponent implements OnInit {

  public com: Comunicazione.Comunicazione;
  public color: string;
  public icon = 'circle';
  public conferma = false;

  constructor(
    private store: StoreService,
    private http: HttpService,
    private alertCtrl: AlertController,
    public router: Router,
    public ngZone: NgZone,
    public route: ActivatedRoute,
    public iconNameService: IconNameService
    ) {

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
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }

        const c = params.com;
        this.com = new Comunicazione.Comunicazione();
        this.http.getComunicazione(c).then(
          (val1: Comunicazione.Comunicazione) => {
            this.com = val1;
          },
          (error) => {
            console.log(error);
          }
        );
      });
  }

  back() {
    // this.navCtrl.pop();
  }

  delete() {
    console.log('ciao');
    // let s = this.store.userData$.subscribe(
    //   (val)=>{
    //     let s1 = this.http.setDeletedComunicazione(val.token_value, this.com.comunicazione_key).subscribe(
    //       (val1)=>{
    //         s1.unsubscribe();
    //       }
    //     )
    //     s.unsubscribe();
    //   }
    // )
    // this.store.getUserData();

    this.http.setDeletedComunicazione( this.com.comunicazione_key).then(
      (val1) => {
        console.log(val1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  read() {
    // let s = this.store.userData$.subscribe(
    //   (val)=>{
    //     let s2 = this.http.setReadComunicazione(val.token_value, this.com.comunicazione_key).subscribe(
    //       (val2)=>{
    //         console.log (val2);
    //         if (val2.ErrorMessage.msg_code == 0){
    //             let alert = this.alertCtrl.create({
    //               title: 'Lettura confermata',
    //               subTitle: '',
    //               buttons: ['Ok']
    //             });
    //             alert.present();
    //         }
    //         s2.unsubscribe();
    //       }
    //     );
    //     s.unsubscribe();
    //   }
    // )
    // this.store.getUserData();

    this.http.setReadComunicazione(this.com.comunicazione_key).then(
      async (val2: Comunicazione.Result) => {
        console.log (val2);
        if (val2.ErrorMessage.msg_code === 0) {
            const alert = await this.alertCtrl.create({
              header: 'Lettura confermata',
              message: '',
              buttons: ['Ok']
            });
            await alert.present();
        }
      });
  }

}
