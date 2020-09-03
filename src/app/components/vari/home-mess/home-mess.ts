// import { Messaggi } from './../../models/messaggi/messaggi.namespace';
import { OnInit, Component, Input } from '@angular/core';
// import { HomeElement } from '../../models/home-element/home-element.namespace';
// import { News } from '../../models/news/news.namespace';


@Component({
  selector: 'home-mess',
  templateUrl: 'home-mess.html'
})
export class HomeMessComponent implements OnInit {

  @Input() color: string;
  @Input() icon: string;
  @Input() titolo: string;
  @Input() descrizione: string;

  constructor() {

  }

  public ngOnInit(): void {

  }



}
