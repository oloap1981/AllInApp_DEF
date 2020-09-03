
import { StoreService } from './../store/store.service';
import { News } from './../../models/news/news.namespace';
import { Http } from './../../models/shared/http.namespace';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../models/login/login.namespace';
// import { Contact } from '../../models/contact/contact.namespace';
import { Messaggi } from '../../models/messaggi/messaggi.namespace';
import { Comunicazione } from '../../models/comunicazione/comunicazione.namespace';
import { Documentale } from '../../models/documentale/documentale.namespace';
import { Module } from '../../models/modules/modules.namespace';
import { BachecaElem } from 'src/app/models/bacheca/bacheca-elem';
import { BachecaList } from 'src/app/models/bacheca/bacheca-list';
import { BachecaResult } from 'src/app/models/bacheca/bacheca-result';
import { BachecaSingleResult } from 'src/app/models/bacheca/bacheca-single-result';
import { BachecaCategoriaResult } from 'src/app/models/bacheca/bacheca-categoria-result';
import { BachecaPutElem } from 'src/app/models/bacheca/bacheca-put-elem';
import { BachecaCategoriaElem } from 'src/app/models/bacheca/bacheca-categoria-elem';
import { BachecaRichiestaPut } from 'src/app/models/bacheca/bacheca-richiesta-put';
import { ConstantsService } from './constants.service';


// SERVICE NON UTILIZZATO
@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient,
        private store: StoreService,
        private constants: ConstantsService) {}

    public getToken(url: string): Observable<Login.Token> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // tslint:disable-next-line:object-literal-shorthand
        return this.http.get<Login.Token>(url, { headers: headers });
    }

    public get(url: string): Observable<Http.HttpResponse> {
        return this.http.get<Http.HttpResponse>(url);
    }

    public getNewsList(from: string, to: string , lette: string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_elenco_news/'
                    + token.token_value + '/' + from + '/' + to + '/' + lette;
                    console.log(url);
                    this.http.get<News.NewsList>(url).subscribe(
                        (r: News.NewsList) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_lista_news);
                            } else {
                                reject(r.ErrorMessage);
                            }
                            // s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public getNewsList(token : string, from : string, to : string , lette : string) : Observable<News.NewsList>{
    //     let url = this.constants.SERVER_ADDRESS + '/services/get_elenco_news/'+ token +'/'+from+'/'+to +'/'+ lette;
    //     console.log(url);
    //     return this.http.get<News.NewsList>(url);
    // }

    public getPublicNews(key: string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = 'http://server/services/get_public_news/{token}/{key}/'
                    + token.token_value + '/' + key + '/';
                    console.log(url);
                    const s = this.http.get<News.NewsSingleResult>(url).subscribe(
                        (r: News.NewsSingleResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.news);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

//    public setReadNews (token : string , key: number): Observable<News.NewsResult>{
//         let url = this.constants.SERVER_ADDRESS + '/services/set_read_news/'+token +'/'+key+'/';
//         console.log(url);
//         return this.http.get<News.NewsResult>(url);
//     }

    public setReadNews(key: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/set_read_news/' + token.token_value + '/' + key + '/';
                    console.log(url);
                    const s = this.http.get<News.NewsResult>(url).subscribe(
                        (r: News.NewsResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.result);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

//    public getMessaggeList(token : string, from : string, to : string , tipo : string):Observable<Messaggi.MessaggiList>{
//         let url = this.constants.SERVER_ADDRESS + '/services/get_elenco_messaggi/'+ token +'/'+from+'/'+to +'/'+ tipo;
//         console.log(url);
//         return this.http.get<Messaggi.MessaggiList>(url);
//     }

    public getMessaggeList( from: string, to: string , tipo: string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS +
                    '/services/get_elenco_messaggi/' +
                    token.token_value +
                    '/' + from + '/' + to + '/' + tipo;
                    console.log(url);
                    const s = this.http.get<Messaggi.MessaggiList>(url).subscribe(
                        (r: Messaggi.MessaggiList) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_lista_messaggi);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

    // public getMessagge(token : string, key : number):Observable<Messaggi.BustaMessaggio>{
    //     let url = this.constants.SERVER_ADDRESS + '/services/get_messaggio/'+ token +'/'+key;
    //     console.log(url);
    //     return this.http.get<Messaggi.BustaMessaggio>(url);
    // }

    public getMessagge(key: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_messaggio/' + token.token_value + '/' + key;
                    console.log(url);
                    const s = this.http.get<Messaggi.BustaMessaggio>(url).subscribe(
                        (r: Messaggi.BustaMessaggio) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public setStarMessage (token : string , key: number, stato: string): Observable<Messaggi.MessaggioResult>{
    //     let url = this.constants.SERVER_ADDRESS + '/services/set_star_message/'+ token +'/'+key +'/'+stato;
    //     console.log(url);
    //     return this.http.get<Messaggi.MessaggioResult>(url);
    // }

    public setStarMessage( key: number, stato: string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/set_star_message/' + token.token_value + '/' + key + '/' + stato;
                    console.log(url);
                    const s = this.http.get<Messaggi.MessaggioResult>(url).subscribe(
                        (r: Messaggi.MessaggioResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public setDeleteMessage (token : string , key: number): Observable<Messaggi.MessaggioResult>{
    //     let url = this.constants.SERVER_ADDRESS + '/services/set_deleted_message/'+ token +'/'+key;
    //     console.log(url);
    //     return this.http.get<Messaggi.MessaggioResult>(url);
    // }

    public setDeleteMessage(key: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/set_deleted_message/' + token.token_value + '/' + key;
                    console.log(url);
                    const s = this.http.get<Messaggi.MessaggioResult>(url).subscribe(
                        (r: Messaggi.MessaggioResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public deleteMessage (mess): Observable<Messaggi.MessaggioResult>{
    //     let url = this.constants.SERVER_ADDRESS + '/services/del_message/';
    //     console.log(url);
    //     return this.http.post<Messaggi.MessaggioResult>(url, mess);
    // }

    public deleteMessage(mess) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/del_message/';
                    console.log(url);
                    const s = this.http.post<Messaggi.MessaggioResult>(url, mess).subscribe(
                        (r: Messaggi.MessaggioResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }


    // public sendMessage(token : string, mess: Messaggi.BustaMessaggio){
    //     let url = this.constants.SERVER_ADDRESS + '/services/put_message';
    //     console.log(url);
    //     console.log (mess);
    //     return this.http.post<Messaggi.MessaggioResult>(url, mess);
    // }

    public sendMessage( mess: Messaggi.BustaMessaggio) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/put_message';
                    console.log(url);
                    const s = this.http.post<Messaggi.MessaggioResult>(url, mess).subscribe(
                        (r: Messaggi.MessaggioResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public getComunicazioniElenco (token : string , from : number, to: number, lette : string, tipo : string){
    //     let url = this.constants.SERVER_ADDRESS + '/services/get_elenco_comunicazioni/'+ token +'/' + from +
    //         '/' + to +'/' + lette + '/'+ tipo + '/';
    //     console.log(url);
    //     return this.http.get<Comunicazione.ComunicazioniElenco>(url);
    // }

    public getComunicazioniElenco(from: number, to: number, lette: string, tipo: string) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_elenco_comunicazioni/' + token.token_value + '/' + from +
                        '/' + to + '/' + lette + '/' + tipo + '/';
                    console.log(url);
                    const s = this.http.get<Comunicazione.ComunicazioniElenco>(url).subscribe(
                        (r: Comunicazione.ComunicazioniElenco) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_lista_comunicazione);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public getComunicazione (token : string , key: number ){
    //     let url = this.constants.SERVER_ADDRESS + '/services/get_public_comunicazione/'
    //     + token + '/' + key + '/';
    //     console.log(url);
    //     return this.http.get<Comunicazione.ComunicazioneResult>(url);
    // }
    public getComunicazione(key: number ) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_public_comunicazione/'
                        + token.token_value + '/' + key + '/';
                    console.log(url);
                    const s = this.http.get<Comunicazione.ComunicazioneResult>(url).subscribe(
                        (r: Comunicazione.ComunicazioneResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.comunicazione);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public setReadComunicazione (token : string , key : number){
    //     let url = this.constants.SERVER_ADDRESS + '/services/set_read_comunicazione/'
    //         + token + '/' +  key + '/';
    //     console.log(url);
    //     return this.http.get<Comunicazione.Result>(url);
    // }

    public setReadComunicazione(key: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/set_read_comunicazione/'
                        + token.token_value + '/' +  key + '/';
                    console.log(url);
                    const s = this.http.get<Comunicazione.Result>(url).subscribe(
                        (r: Comunicazione.Result) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.result);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public setDeletedComunicazione (token: string , key: number){
    //     let url = this.constants.SERVER_ADDRESS + '/services/set_deleted_comunicazione/' + token + '/' + key +'/';
    //     console.log(url);
    //     return this.http.get<Comunicazione.Result>(url);
    // }

    public setDeletedComunicazione(key: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/set_deleted_comunicazione/' + token.token_value + '/' + key + '/';
                    console.log(url);
                    const s = this.http.get<Comunicazione.Result>(url).subscribe(
                        (r: Comunicazione.Result) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.result);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public getElencoTipoDocumenti(token : string){
    //     let url = this.constants.SERVER_ADDRESS + '/services/get_elenco_tipo_documenti/' + token;
    //     console.log(url);
    //     return this.http.get<Documentale.tipiElenco>(url);
    // }

    public getElencoTipoDocumenti() {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_elenco_tipo_documenti/' + token.token_value;
                    console.log(url);
                    const s = this.http.get<Documentale.tipiElenco>(url).subscribe(
                        (r: Documentale.tipiElenco) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_lista_tipo_documenti);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public getCategorieDocumenti(token: string, categoria : number){
    //     let url = this.constants.SERVER_ADDRESS + '/services/get_elenco_categoria_documenti/'+ token+'/'+categoria;
    //     console.log(url);
    //     return this.http.get<Documentale.ListaCategorie>(url);
    // }

    public getCategorieDocumenti(categoria: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_elenco_categoria_documenti/' + token.token_value + '/' + categoria;
                    console.log(url);
                    const s = this.http.get<Documentale.ListaCategorie>(url).subscribe(
                        (r: Documentale.ListaCategorie) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_lista_categoria_documenti);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public getElencoDocumenti (token : string, from : number, to : number, tipo : number, categoria : number){
    //     let url = this.constants.SERVER_ADDRESS + '/services/get_elenco_documenti/'+token+'/'+from +'/'+ to+'/'+
    //      tipo+ '/'+ categoria;
    //      console.log(url);
    //      return this.http.get<Documentale.ListaDocumenti>(url);
    // }

    public getElencoDocumenti(from: number, to: number, tipo: number, categoria: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_elenco_documenti/' + token.token_value + '/' + from + '/' + to + '/' +
                    tipo + '/' + categoria;
                    console.log(url);
                    const s = this.http.get<Documentale.ListaDocumenti>(url).subscribe(
                        (r: Documentale.ListaDocumenti) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_lista_documenti);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    // public getDocumento (token : string , key : number){
    //     let url = this.constants.SERVER_ADDRESS + '/services/get_public_documento/' + token + '/'+ key + '/';
    //     console.log (url);
    //     return this.http.get<Documentale.DocumentoResult>(url);
    // }

    public getDocumento(key: number) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_public_documento/' + token.token_value + '/' + key + '/';
                    console.log(url);
                    const s = this.http.get<Documentale.DocumentoResult>(url).subscribe(
                        (r: Documentale.DocumentoResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.documento);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    public getModules() {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_modules/' + token.token_value;
                    console.log(url);
                    const s = this.http.get<Module.ModuleResult>(url).subscribe(
                        (r: Module.ModuleResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_moduli);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

    public getElencoAnnunci(from, to, preferiti) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_elenco_annunci/' + token.token_value + '/' + from + '/' + to + '/' + preferiti;
                    console.log(url);
                    const s = this.http.get<BachecaList>(url).subscribe(
                        (r: BachecaList) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_lista_annunci);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

    public getMieiAnnunci(from, to) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_miei_annunci/' + token.token_value + '/' + from + '/' + to ;
                    console.log(url);
                    const s = this.http.get<BachecaList>(url).subscribe(
                        (r: BachecaList) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_lista_annunci);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

    public getSchedaAnnuncio(key) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_public_annunci/' + token.token_value + '/' + key ;
                    console.log(url);
                    const s = this.http.get<BachecaSingleResult>(url).subscribe(
                        (r: BachecaSingleResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.annunci);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

    public getListaCategorieAnnuncio() {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/get_lista_categoria_annuncio/' + token.token_value  ;
                    console.log(url);
                    const s = this.http.get<BachecaCategoriaResult>(url).subscribe(
                        (r: BachecaCategoriaResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.l_tab_categorie_annuncio);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

    public setStatoAnnuncio(key, stato) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/set_stato_annuncio/' + token.token_value + '/' + key + '/' + stato ;
                    console.log(url);
                    const s = this.http.get<BachecaResult>(url).subscribe(
                        (r: BachecaResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.result);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

    public setPreferitoAnnuncio(key, stato) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/set_preferred_annuncio/' + token.token_value + '/' + key + '/' + stato;
                    console.log(url);
                    const s = this.http.get<BachecaResult>(url).subscribe(
                        (r: BachecaResult) => {
                            console.log(r);
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.result);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }


    public setDeletedAnnuncio(key) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/set_deleted_annuncio/' + token.token_value + '/' + key;
                    console.log(url);
                    const s = this.http.get<BachecaResult>(url).subscribe(
                        (r: BachecaResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r.result);
                            } else {
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );

        });
    }

    public putAnnuncio( mess: BachecaRichiestaPut) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/put_annuncio';
                    console.log(url);
                    const s = this.http.post<BachecaResult>(url, mess).subscribe(
                        (r: BachecaResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r);
                            } else {
                                console.log(r);
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    public delAnnuncio( mess: BachecaRichiestaPut) {
        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const url = this.constants.SERVER_ADDRESS + '/services/del_annuncio';
                    console.log(url);
                    const s = this.http.post<BachecaResult>(url, mess).subscribe(
                        (r: BachecaResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r);
                            } else {
                                console.log(r);
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

    public imgAnnuncio( key, tipologia, immagine) {

        return new Promise((resolve, reject) => {
            this.store.getUserDataPromise().then(
                (token: Login.Token) => {
                    const o = {
                        token : token.token_value,
                        oggetto_key: key,
                        tipologia,
                        immagine
                      };
                    const url = this.constants.SERVER_ADDRESS + '/services/img_annuncio';
                    console.log(url);
                    const s = this.http.post<BachecaResult>(url, o).subscribe(
                        (r: BachecaResult) => {
                            if (r.ErrorMessage.msg_code === 0) {
                                resolve(r);
                            } else {
                                console.log(r);
                                reject(r.ErrorMessage);
                            }

                            s.unsubscribe();
                        }
                    );
                }
            );
        });
    }

}
