
// import { NavController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { StoreService } from '../store/store.service';
import { LoginService } from '../login/login.service';
import { AlertController } from '@ionic/angular';
// import { MessaggiPage } from '../../pages/messaggi/messaggi';

@Injectable()
export class AlertService {

     constructor(
       public alertController: AlertController,
       public storeService: StoreService,
       public loginService: LoginService) {}

     public async presentAlert(message: string) {
        const alert = await this.alertController.create({
          header: 'Conferma',
          message,
          buttons: ['OK']
        });
        await alert.present();
      }

      public async presentErrorAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Errore',
            message,
            buttons: ['CHIUDI']
        });
        await alert.present();
      }

      // public async presentAlertNewPage(nav: NavController, type: string, id: number) {
      //   let messaggio = "";
      //   switch(type){
      //     case "messaggi":
      //         messaggio = "Vai alla sezione Messaggi";
      //         break;
      //     case "attivita":
      //         messaggio = "Vai alla sezione Attività";
      //         break;
      //     case "prescrizioni":
      //         messaggio = "Vai alla sezione Prescrizioni";
      //         break;
      //     case "commenti_at":
      //         messaggio = "Vai alla sezione Attività";
      //         break;
      //     case "commenti_os":
      //         messaggio = "Vai alla sezione Osservazioni";
      //         break;
      //     default:
      //         messaggio = "";
      //   }
      //   let confirm = this.alertController.create({
      //     title: 'Hai ricevuto una nuova notifica per la sezione. ' + messaggio,
      //     buttons: [
      //       {
      //         text: 'VAI',
      //         handler: () => {
      //           switch(type){
      //             case "messaggi":
      //               nav.push(MessaggiPage);
      //                 break;
      //             case "attivita":
      //                 nav.push(ElencoAttivitaPage);
      //                 break;
      //             case "prescrizioni":
      //                 nav.push(ElencoProcedimentiPage);
      //                 break;
      //             default:
      //                 nav.push(ElencoMessaggiPage);
      //                 break;
      //           }
      //         }
      //       }
      //     ]
      //   });
      //   confirm.present();
      // }

      // public presentServerInputAlert(header: string) {
      //   let alert = this.alertController.create({
      //     title: header,
      //     inputs: [
      //       {
      //         name: 'indirizzo',
      //         placeholder: 'http://servername'
      //       }
      //     ],
      //     buttons: [
      //       {
      //         text: 'Salva',
      //         handler: data => {
      //           var server = data.indirizzo;
      //           //controllo di validita'
      //           this.loginService.checkServerValidity(server)
      //           .subscribe(r => {
      //             if(r.result == 'OK'){
      //               console.log('OK');

      //               var esitoSalvataggio = this.storeService.setServer(server);
      //               if(esitoSalvataggio == 1){
      //                 this.presentAlert("Salvataggio server avvenuto con successo");
      //               } else {
      //                 this.presentAlert("Si è verificato un problema nel salvataggio del server");
      //               }
      //             } else {
      //               this.presentErrorAlert(r.ErrorMessage.msg_testo);
      //             }
      //           },
      //           error => {
      //             console.log("Errore indirizzo server sbagliato: " + error.message);
      //             this.presentServerInputAlert("Indirizzo Server Sbagliato");
      //           });
      //         }
      //       }
      //     ]
      //   });
      //   alert.present();
      // }
}
