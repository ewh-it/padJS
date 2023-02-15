/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Circs erzeugen/verwalten
 * 
 */

import { print, rgb } from "./AAAhelpers.js";
import * as PaDc from "./PaDconfig.js";

/**
 *  Jede Instanz entspricht 1 Wert des Pascal-Kegel
 */
class Circ
{
    constructor(id, lLine, lInd, cClass, aX, aY, aR, xVal)
    {
        this.id = id;                       // Circ-Kennung
        this.lLine = lLine;                 // Kegel-Zeile
        this.lInd = lInd;                   // Knoten-Index in Zeile
        this.cClass = cClass;               // Klassen-Kennung (für D3-Einbindung)
        this.aX = aX;                       // Position X - Canvas-Koordinate
        this.aY = aY;                       // Position Y - Canvas-Koordinate
        this.aR = aR;                       // Radius
        this.xVal = xVal;                   // Korrespondierender Knoten-Wert (Achtung: BigInt)
        this.bFsD = true;                   // Schalter Default
        this.bFsT = false;                  // Schalter Teiler-Farbe
        this.bFsF = false;                  // Schalter Faktor-Farbe
    }
}

export function makeCircs() {
    let c_cLINES = PaDc.GET("cLINES");
    let anzLines = c_cLINES.lineDict.size;

    let oD = PaDc.GET('oDia');              // Durchmesser
    let ovX = PaDc.GET('oVx');              // Versatz X
    let oVy = PaDc.GET('oVy');              // Versatz Y
    let ox0 = PaDc.GET('bgWwidth') / 2;     // Startposition X-Achse
    let oy0 = 0 + 3 * (oVy);                // Startposition Y-Achse

    let oDr = oD * 0.5;
    ox0 = ox0 + oDr;
    let ox = ox0; let oy = oy0;

    let circDict = new Map();
    let cBounds = [];

    for (let iL=1; iL<=anzLines; iL++) {
        oy += oVy;
        let oxd = (iL * ovX) / 2;
        ox = ox0 - oxd;
        let numD = c_cLINES.GETlineDictI(iL);
        let oxC1 = ox;
        numD.forEach( (nV,nI) => {
            let cID = `cir-${iL}-${nI}`;
            //                  id, lLine, lInd, cClass, aX, aY, aR, xVal
            let cCirc = new Circ(cID, iL, nI, 'circ', ox, oy, oDr, nV);
            circDict.set(cID, cCirc);
            ox += ovX;
        });
        let oxCn = ox;
        let oxC = [oy, oxC1, oxCn];
        cBounds.push(oxC);
    }
    print('circDict', circDict.size, 'cBounds', cBounds.length);
    PaDc.SET('cBounds', cBounds);

    const circData = {};
    let cNodes = [];
    circDict.forEach ( (val, key) => {
        circData[key] = val;
        cNodes.push(val);
    });

    let c_cNODES = PaDc.GET('cNODES');
    c_cNODES.SET(cNodes);
    PaDc.SET('cNODES', c_cNODES);
}
