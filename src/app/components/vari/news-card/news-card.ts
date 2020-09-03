// import { NewsDetailsPage } from './../news-details/news-details';
// import { NewsPage } from './../news/news';
import { HttpService } from '../../../services/shared/http.service';
// import { NavController } from '@ionic/angular';

import { OnInit, Component, Input, NgZone } from '@angular/core';
// import { HomeElement } from '../../models/home-element/home-element.namespace';
// import { StoreService } from '../../services/store/store.service';
import { News } from '../../../models/news/news.namespace';
import { Module } from '../../../models/modules/modules.namespace';
import { BaseComponent } from '../../../components/base/base.component';
import { Router } from '@angular/router';


@Component({
  selector: 'news-card',
  templateUrl: 'news-card.html'
})

export class NewsCardComponent extends BaseComponent implements OnInit {

  public newsFull: News.NewsElem[];

  public newsMin: News.NewsElem[] = [];

  public color: string;
  public icon: string;
  public colonne: number;

  @Input() modules: Module.ModuleElem[];

  constructor(
    private http: HttpService,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

  }

  ngOnInit() {

    if (this.modules !== undefined) {
      for (const module of this.modules) {
        if (module.tab_moduli_cod === 2) {
          this.color = module.tab_moduli_colore;
          this.icon = module.tab_moduli_icona;
          this.colonne = module.tab_moduli_colonne;
        }
      }
    }

    // let s = this.store.userData$.subscribe((val)=>{
    //     let s1 = this.http.getNewsList(val.token_value,"0","0","X").subscribe(
    //         (res)=>{
    //           console.log(res);
    //           if (res.ErrorMessage.msg_code == 0){
    //             this.newsFull = res.l_lista_news;
    //             if (this.colonne == 1){
    //               for (let i = 0 ; i < 4 ; i++){
    //                 if (this.newsFull[i] != null){
    //                   this.newsMin[i]=  this.newsFull[i];
    //                 }
    //               }
    //             }else{
    //               for (let i = 0 ; i < 3 ; i++){
    //                 if (this.newsFull[i] != null){
    //                   this.newsMin[i]=  this.newsFull[i];
    //                 }
    //               }
    //             }

    //           }else{
    //             console.log("errore ricezione News");
    //           }
    //           s1.unsubscribe();
    //         }
    //       );
    //       s.unsubscribe();
    //      }
    //   );
    //   this.store.getUserData();

    this.http.getNewsList("0", "0", "X").then(
        (res: News.NewsElem[]) => {
          this.newsFull = res;
          if (this.colonne === 1) {
            for (let i = 0 ; i < 4 ; i++) {
              if (this.newsFull[i] != null) {
                this.newsMin[i] =  this.newsFull[i];
              }
            }
          } else {
            for (let i = 0 ; i < 3 ; i++) {
              if (this.newsFull[i] != null) {
                this.newsMin[i] =  this.newsFull[i];
              }
            }
          }
        },
        (error) => {
          console.log("errore ricezione News");
          console.log(error);
        }
      );
    }

    public goToNews() {
      this.goToPageParams('news', { queryParams: { queryParams: { news: this.newsFull } } });
      // this.navCtrl.push(NewsPage, {news: this.newsFull});
    }

    public goToDetails(news) {
      this.goToPageParams('news-details', { queryParams: { queryParams: { news } } });
      // this.navCtrl.push(NewsDetailsPage, {news});
    }
}
