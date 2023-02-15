/**
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Allgemeine Hilfs-Funktionen
 * 
 */


/**
 * Wrapper für Log-Funktion
 */
export function print(...data) {
    console.log(data.join());
}
/**
 * Map by Value neu aufbauen
 * sMap     -> neue Map s(et)Map
 * qMap     -> vorhandene Map q(uell)Map
 */
export function duplicateMap(sMap, qMap) {
    qMap.forEach((value, key) => {
        sMap.set(key, value);
    });
}
/**
 * Array erweitern
 * sArray     -> Ziel-Array s(et)Array
 * qArray     -> vorhandenes Array q(uell)Array
 */
export function expandArray(sArray, qArray) {
    for (let i=0; i<qArray.length; i++) {
        let _qv = qArray[i];
        if (!sArray.includes(_qv))
            sArray.push(_qv);
    }
    return sArray;
}
/**
 * Array by Value neu aufbauen
 * sArray     -> neues Array s(et)Array
 * qArray     -> vorhandenes Array q(uell)Array
 */
export function duplicateArray(qArray) {
    let _qString = qArray.join("€");
    let sArray = _qString.split("€");
    return sArray;
}
/**
 * Helper-Funktion - 2-stelliger Index-String
 */
export function strNN(iV) {
    /* 2-stellige Index-Werte sicherstellen */
    let strN = String(iV);
    if (iV < 10)
        strN = '0' + strN;
    return strN;
}
/**
 * Helper-Funktion - CSS-kompatibler rgb-String aus numerischen Eingangswerten erzeugen
 */
export function rgb(red, green, blue) {
    let rval = (red & 0xF0 ? '#' : '#0') + (red << 16 | green << 8 | blue).toString(16);
    return rval;
}
/**
 * Helper-Funktion - DOM-Element explizit aus- und einblinden -> CSS-Klasse .novis
 * param    eID     Element-ID
 *          toVis   true -> Element soll eingeblendet sein
 *                  false -> Element soll ausgeblendet sein
 */
export function elemToggler(eID, toVis) {
    let _elem = document.getElementById(eID);
    let noVis = _elem.classList.contains('novis');  // .novis ist zugewiesen
    if (noVis && !toVis)                                // ist ausgeblendet und soll auch so sein
        return;
    if (!noVis && toVis)                                // ist eingeblendet und soll auch so sein
        return;
    _elem.classList.toggle('novis');                // Zustand wechseln
}
/**
 * Helper-Funktion - Replace
 * param    _string     Zeichenkette
 *          _from       Suchzeichen
 *          _to         Ersetzung
 */
export function repS(_string, _from, _to) {
    return _string.replace(_from, _to);
}