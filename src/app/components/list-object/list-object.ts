// import { Messaggi } from './../../models/messaggi/messaggi.namespace';
import { OnInit, Component, Input } from '@angular/core';
// import { HomeElement } from '../../models/home-element/home-element.namespace';
// import { News } from '../../models/news/news.namespace';


@Component({
  selector: 'list-object',
  templateUrl: 'list-object.html',
  styleUrls: ['list-object.scss']
})
export class ListObjectComponent implements OnInit {

  @Input() color: string;
  @Input() icon: string;
  @Input() titolo: string;
  @Input() descrizione: string;
  @Input() date: string;
  @Input() letta: string;

  public giorno: string;
  public ora: string;

  constructor() {

  }

  public ngOnInit(): void {
    console.log(this.color);
    this.giorno = ' ';
    this.ora = ' ';
    if (this.date != null) { this.ora = this.date.charAt(11) + this.date.charAt(12) + ':' + this.date.charAt(13) + this.date.charAt(14); }
    if (this.date != null) { this.giorno = this.date.charAt(8) + this.date.charAt(9); }
  }



}
