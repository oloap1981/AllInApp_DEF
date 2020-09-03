import { Injectable, ErrorHandler } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private alertController: AlertController) {}

    handleError(error: any): void {

      this.presentErrorAlert(error.message);
      throw error;
    }

    private async presentErrorAlert(message: string) {
      const alert = await this.alertController.create({
        header: 'Errore',
        message: (message),
        buttons: ['CHIUDI']
      });
      await alert.present();
    }
}
