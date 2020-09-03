import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPage } from './login.page';

import { LoginService } from '../../services/login/login.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [
        LoginPage
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        LoginPageRoutingModule
    ],
    exports: [
        LoginPage
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule {}
