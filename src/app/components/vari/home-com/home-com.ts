import { OnInit, Component, Input } from '@angular/core';
// import { HomeElement } from '../../models/home-element/home-element.namespace';
// import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';


@Component({
  selector: 'home-com',
  templateUrl: 'home-com.html'
})
export class HomeComComponent implements OnInit {

  @Input() color: string;
  @Input() date: string;
  @Input() titolo: string;
  @Input() descrizione: string;

  public giorno: string;
  public mese: string;

  constructor() {}

  public ngOnInit(): void {
    this.giorno = " ";
    this.mese = " ";
    if (this.date != null) { this.mese = this.date.charAt(5) + this.date.charAt(6); }
    if (this.date != null) { this.giorno = this.date.charAt(8) + this.date.charAt(9); }
    switch (this.mese) {
      case '01':
        this.mese = 'Gennaio';
        break;
      case '02':
        this.mese = 'Febbraio';
        break;
      case '03':
        this.mese = 'Marzo';
        break;
      case '04':
        this.mese = 'Aprile';
        break;
      case '05':
        this.mese = 'Maggio';
        break;
      case '06':
        this.mese = 'Giugno';
        break;
      case '07':
        this.mese = 'Luglio';
        break;
      case '08':
        this.mese = 'Agosto';
        break;
      case '09':
        this.mese = 'Settembre';
        break;
      case '10':
        this.mese = 'Ottobre';
        break;
      case '11':
        this.mese = 'Novembre';
        break;
      case '12':
        this.mese = 'Dicembre';
        break;
    }
  }



}
