import { Injectable } from '@angular/core';

@Injectable()
export class IconNameService {

    public pulisciNomeIcone(nomeIconaSporco: string): string {
        let nomePulito = '';

        const split1 = nomeIconaSporco.split(' ');
        if (split1.length < 2) {
            return nomeIconaSporco;
        }
        const secondaParte = split1[1];

        const indiceMeno = secondaParte.indexOf('-');
        nomePulito = secondaParte.substring(indiceMeno + 1);

        return nomePulito;
    }
}
