/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * lineDict - Struktur der Bimomial-Koeffizienten und ihrer Faktorisierung
 * 
 */

// Line-Verzeichnis

import {print, duplicateMap} from "./AAAhelpers.js";
import { factorize, pascal } from "./PaDhelper.js";


//  Modul-Variable - Referenzierung über this.(....) funktioniert nicht 
const m_lineDict = new Map();
const m_numDict = new Map();


export class cLINES {

    construct() {
        this.lineDict = new Map();
        this.numDict = new Map();
        this.Teiler = 0;
        this.Faktor = null;
    }

    init(nV) {
        this.lineDict = padLoop(nV);
        duplicateMap(m_lineDict, this.lineDict);
        print("cLINES.lineDict", this.lineDict.size);

        this.numDict = numLoop();
        duplicateMap(m_numDict, this.numDict);
        print("cLINES.numDict", this.numDict.size);
    }

    GETlineDictAll() {
        /* aktuellen Zustand Line-Verzeichnis zurückgeben */
        return this.lineDict;
    }

    GETlineDictI(ind) {
        if (ind < 1)
            return m_lineDict.get(ind);
        else
            return this.GETlineDictIr0(ind, this.Teiler);
    }

    GETlineDictIr0(ind, nN) {
        let gnd = [];
        let gndi = m_lineDict.get(ind);
        let nx = 0;
        gndi.forEach( n => {
            if (nN > 0)
                nx = n % nN;
            else
                nx = n;
            gnd.push(nx);
        });
        return gnd;
    }

    // Nums-Verzeichnis

    resetNUMS() {
        this.numDict.forEach( (numD, key) => {
            numD = 0;
        });
        this.Faktor = 0;
        this.Teiler = 0;
        m_numDict.clear();
        duplicateMap(m_numDict, this.numDict);
    }



}
function padLoop(nV) {
    let padNums = new Map();
    for (let i=1; i<=nV; i++) {
        let pV = pascal(i);
        padNums.set(i, pV);
    }
    return padNums;
}
function numLoop() {
    let bval = BigInt(0);

    let _numDict = new Map();
    m_lineDict.forEach( (numD, key) => {
        // print("lineDict ", key, "->", typeof(numD), numD);
        numD.forEach( (nV,nI) => {
            if (nV > 1) {
                let _Nar = _numDict.has(nV);
                if (!_Nar) {
                    _Nar = 0;
                    _numDict.set(nV, _Nar);
                }
                if (nV > bval)
                    bval = nV;
            }
        });
    });
    print("Wertebereich - Anzahl:", _numDict.size, " größter Wert:", bval);
    return _numDict;
}
