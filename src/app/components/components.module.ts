import { NgModule } from '@angular/core';
import { HomeMessComponent } from './vari/home-mess/home-mess';
import { HomeComComponent } from './vari/home-com/home-com';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { BachecaCardComponent } from './vari/bacheca-card/bacheca-card';
import { ContactCardComponent } from './vari/contact-card/contact-card';
import { DocumentaleCardComponent } from './vari/documentale-card/documentale-card';
import { MessaggiCardComponent } from './vari/messaggi-card/messaggi-card';
import { NewsCardComponent } from './vari/news-card/news-card';
import { ChatCardComponent } from './vari/chat-card/chat-card';
import { ComunicazioniCardComponent } from './vari/comunicazioni-card/comunicazioni-card';

@NgModule({
	declarations: [
	BaseComponent,
	HomeMessComponent,
	HomeComComponent,
	BachecaCardComponent,
	ChatCardComponent,
	ComunicazioniCardComponent,
	ContactCardComponent,
	DocumentaleCardComponent,
	MessaggiCardComponent,
	NewsCardComponent
],
imports: [CommonModule],
exports: [
	BaseComponent,
	HomeMessComponent,
	HomeComComponent,
	BachecaCardComponent,
	ChatCardComponent,
	ComunicazioniCardComponent,
	ContactCardComponent,
	DocumentaleCardComponent,
	MessaggiCardComponent,
	NewsCardComponent
]
})
export class ComponentsModule {}
