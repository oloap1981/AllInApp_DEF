import { BachecaCategoriaElem } from './bacheca-categoria-elem';
import { MessaggioErrore } from './messaggio-errore';

export class BachecaCategoriaResult {
    public ErrorMessage: MessaggioErrore;
    public l_tab_categorie_annuncio: Array<BachecaCategoriaElem>;
    public token: string;
    public result: string;
}
