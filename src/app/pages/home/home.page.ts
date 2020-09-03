// import { BachecaPage } from './../bacheca/bacheca';
// import { MessaggiPage } from './../messaggi/messaggi';
// import { DocumentalePage } from './../documentale/documentale';
import { Module } from '../../models/modules/modules.namespace';

// import { CircolariPage } from './../circolari/circolari';
// import { NewsPage } from './../news/news';
import { LoginService } from '../../services/login/login.service';
import { StoreService } from '../../services/store/store.service';


// import { HomeElement } from './../../models/home-element/home-element.namespace';
// import { ProfiloPage } from './../profilo/profilo';
// import { ContactsPage } from './../contacts/contacts';
// import { ChatPage } from './../chat/chat';
// import { MyChatPage } from './../mychat/mychat';
// import { LoginPage } from '../login/login';
import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
// import { ComunicazioniPage } from '../comunicazioni/comunicazioni';
import { Login } from '../../models/login/login.namespace';
import { HttpService } from '../../services/shared/http.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';


@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage extends BaseComponent implements OnInit {

  public contentCom: string;

  public presenze: any = {};
  public colonne: any = {};
  public posizione: any = {};
  public icone: any = {};
  public colori: any = {};
  public segment = 'work';
  public slideOpts = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    }
  };
  public logoImg: string;

  public name: string;
  public message: string;

  public modules: Module.ModuleElem[];

  // @ViewChild(Slides) slides: Slides;

  constructor(
    private http: HttpService,
    private alertCtrl: AlertController,
    private store: StoreService,
    private login: LoginService,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

  }

  public ngOnInit(): void {

    // richiedo quali servizi devono essere visualizzati
    this.presenze.Comunicazioni = 'false';
    this.presenze.Circolari = 'false';
    this.presenze.Chat = 'false';
    this.presenze.Documentale = 'false';
    this.presenze.Rubrica = 'false';
    this.presenze.Messaggi = 'false';
    this.presenze.News = 'false';
    this.presenze.Bacheca = 'false';

    this.colonne.Comunicazioni = 1;
    this.colonne.Circolari = 1;
    this.colonne.Chat = 1;
    this.colonne.Documentale = 1;
    this.colonne.Rubrica = 1;
    this.colonne.Messaggi = 1;
    this.colonne.News = 1;
    this.colonne.Bacheca = 1;

    this.icone.Comunicazioni = '';
    this.icone.Circolari = '';
    this.icone.Chat = '';
    this.icone.Documentale = '';
    this.icone.Rubrica = '';
    this.icone.Messaggi = '';
    this.icone.News = '';
    this.icone.Bacheca = 'fa fa-file';

    this.colori.Comunicazioni = '';
    this.colori.Circolari = '';
    this.colori.Chat = '';
    this.colori.Documentale = '';
    this.colori.Rubrica = '';
    this.colori.Messaggi = '';
    this.colori.News = '';
    this.colori.Bacheca = '#88d379';
  }

  ionViewDidEnter() {
    this.store.getUserDataPromise().then(
      (val: Login.Token) => {
        if (val === null) {
          this.goToPage('login');
        } else {
          console.log(val);
          this.http.getModules().then(
            (modules: Module.ModuleElem[]) => {
              console.log(modules);
              this.modules = modules;
              for (const module of this.modules) {
                if (module.tab_moduli_attivo === 'S') {
                  this.presenze[module.tab_moduli_desc] = 'true';
                  this.colonne[module.tab_moduli_desc] = module.tab_moduli_colonne;
                  this.icone[module.tab_moduli_desc] = module.tab_moduli_icona;
                  this.colori[module.tab_moduli_desc] = module.tab_moduli_colore;
                  // this.colonne[modules[i].tab_moduli_desc]= 1;
                  // this.modules[i].tab_moduli_colonne = 1;
                }
                // if (this.modules[i].tab_moduli_desc=='Messaggi'){
                //   this.modules[i].tab_moduli_colonne = 2;
                //   this.colonne['Messaggi']= 2;
                // }
                this.presenze.Bacheca = 'true';
              }
            },
            (error) => {
              console.log(error);
            }
          );
          if (val.flag_richiesta_lettura === true) {
            this.goToPage('circolari');
          }
        }
      }
    );
  }

  public async changePassword() {
    const prompt = await this.alertCtrl.create({
      header: 'Cambio Password',
      message: 'inserisci i dati',
      inputs: [
        {
          name: 'old',
          placeholder: 'password corrente'
        },
        {
          name: 'new',
          placeholder: 'Nuova password'
        },
        {
          name: 'repeat',
          placeholder: 'reinserisci nuova passoword'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Send',
          handler: data => {
            if (this.checkPassword(data.old) === true) {
              if (data.new.length > 5) {
                if (data.new === data.repeat) {
                  const s = this.store.userData$.subscribe((val) => {
                    s.unsubscribe();
                    const s1 = this.login.changePassword(val, data.old, data.new, data.repeat).subscribe((r) => {
                      s1.unsubscribe();
                      if (r.ErrorMessage.msg_code === 0) {
                        alert('password cambiata correttamente');
                      } else {
                        alert('errore modifica password');
                      }
                    });
                  });
                  this.store.getUserData();
                } else {
                  alert('le password non corrispondono');
                }
              } else {
                alert('la password deve essere più lunga di 5 caratteri');
              }
            } else {
              alert('password corrente non corretta');
            }
          }
        }
      ],
      // enableBackdropDismiss: false
    });
    await prompt.present();
  }

  checkPassword(old): boolean {
    return true;
  }

  public GoProfile() {
    this.goToPage('profilo');
    // this.navCtrl.push(ProfiloPage);
  }

  public goToChat() {
    this.goToPage('chat');
    // this.navCtrl.push(ChatPage);
  }

  public goToContact() {
    this.goToPage('contacts');
    // this.navCtrl.push(ContactsPage);
  }

  public logOut(): void {
    this.store.clearUserData();
    this.goToPage('login');
    // this.navCtrl.setRoot(LoginPage);
  }

  public goToComunicazioni() {
    this.goToPage('comunicazione');
    // this.navCtrl.push(ComunicazioniPage);
  }

  public goToCircolari() {
    this.goToPage('circolari');
    // this.navCtrl.push(CircolariPage);
  }

  public goToNews() {
    this.goToPage('news');
    // this.navCtrl.push(NewsPage);
  }

  public goToMessaggi() {
    this.goToPage('messaggi');
    // this.navCtrl.push(MessaggiPage);
  }

  public goToDocumentale() {
    this.goToPage('documentale');
    // this.navCtrl.push(DocumentalePage);
  }

  public goToBacheca() {
    this.goToPage('bacheca');
    // this.navCtrl.push(BachecaPage);
  }

  public slideChanged() {
    // let ind = this.slides.getActiveIndex();
    // if (ind == 0) {this.segment = 'work' } else if (ind === 1) {this.segment = 'social'; }
  }
}
