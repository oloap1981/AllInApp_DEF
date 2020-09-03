import { BachecaElem } from './bacheca-elem';
import { MessaggioErrore } from './messaggio-errore';

export class BachecaList {
    public ErrorMessage: MessaggioErrore;
    public result: string;
    public l_lista_annunci: Array<BachecaElem>;
    public token: string;
}
