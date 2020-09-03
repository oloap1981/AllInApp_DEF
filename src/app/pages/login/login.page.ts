
// import { Error } from './../../models/shared/error.namespace';
import { StoreService } from '../../services/store/store.service';
// import { Storage } from '@ionic/storage';
import { AlertService } from '../../services/shared/alert.service';


import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';
// import { ErrorService } from './../../services/shared/error.service';
import { Login } from '../../models/login/login.namespace';

// import { HomePage} from '../../pages/home/home';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Router } from '@angular/router';

// import { User } from '../../models/user/user.namespace';

/**
 * Generated class for the ComunicazioneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-page',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage extends BaseComponent implements OnInit {

  // private firebase_token: string = "";

  constructor(
    private loginService: LoginService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private store: StoreService,
    private alertService: AlertService,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
    this.userData = new Login.Token();
  }


  private userData: Login.Token;

  public username = '';
  public password = '';

  public ngOnInit(): void {
    console.log('ON INIT LOGIN');
  }

  ionViewDidEnter() {
    console.log('ON VIEW ENTER LOGIN');
  }

  public login(): void {

    const self = this;
    const s = self.loginService.login(self.username, self.password).subscribe(r => {
      console.log(r);
      if (r.ErrorMessage.msg_code === 0) {
        self.userData = r;
        self.store.setUserData(self.userData);

        this.goToPage('home');
        // this.goToPageParams('home', { queryParams: { queryParams: { val: 'pippo' } } });

      } else {
        // throw new Error("test Error");
        // let ed = new Error.ErrorData();
        // ed.message = "errore nel login" ;
        // this.error.sendError(ed);
        self.alertService.presentAlert(r.ErrorMessage.msg_testo);
      }
      s.unsubscribe();
    });
    // this.firebaseNative.getToken().then(function(fbToken) {
    //   // self.firebase_token = fbToken;


    // });
  }

  async presentAlert() {
    // se serve, qui si puo' mettere una chiamata per tenere traccia di chi ha tentato e fallito il login

    const alert = await this.alertCtrl.create({
      header: 'Login Failed',
      message: 'Retry',
      buttons: ['Again']
    });
    await alert.present();
  }
}
