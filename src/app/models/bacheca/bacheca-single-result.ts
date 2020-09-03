import { BachecaElem } from "./bacheca-elem";
import { MessaggioErrore } from "./messaggio-errore";

export class BachecaSingleResult {
    public ErrorMessage: MessaggioErrore;
    public annunci: BachecaElem;
    public token: string;
    public result: string;
}
