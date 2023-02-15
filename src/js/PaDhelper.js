/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Hilfsfunktionen
 * 
 */

import {print, expandArray, duplicateMap} from "./AAAhelpers.js";

/**
 * Pascal-Zahlenkegel - Werte zu Ebene entwickeln
 * in       lcnt        aktuelle Ebene
 * return   line        Werte zu Ebene
 */
export function pascal(lcnt) {
    /** Zahlenwerte werden als BigInt definiert */
    let line = [];
    if (lcnt == 1)
        return [BigInt(1)];
    else {
        let p_line = pascal(lcnt-1);
        for (let i=0; i<p_line.length-1; i++) {
            let lv = BigInt(p_line[i] + p_line[i+1]);
            line.push(lv);
        }
        line.unshift(BigInt(1));            // Eintrag '1' am Anfang zufügen
        line.push(BigInt(1));               // Eintrag '1' am Ende zufügen
    }
    return line;
}

export function factorize(num) {
    if (num == 1)
        return [1];

    let limit = Math.ceil(Math.sqrt(num)) + 1;
    // Es werden 2 Teilmengen aufgebaut ->
    // small    untere Hölfte
    // large    obere Hälfte
    let small = [1];                        // wird mit '1' initialisiert
    let large = [num];                      // wird mit Eingangswert initialisiert
    for (let i=2; i<limit; i++) {
        if (num % i == 0) {                     // Modulo ...
            small.push(i);                          // Z#hler ist Faktor des Eingangswerts
            let _num = Math.ceil(num / i);          // der sich daraus ergebende Wert ...
            large.push(_num);                           // als 'obere Hölfte' merken
        }
    }
    // die Teilmengen werden aneinandergehängt und müssen sortiert werden
    // Array.sort() arbeitet mit Umwandlung in String [1, 2, 10, 5, 40] -> [1, 2, 10, 40, 5]
    // -> diese Funktion stellt sicher, dass die Werte numerisch 
    //    interpretiert werden  -> [1, 2, 5, 10, 40]
    function compareNumbers(a, b) {
        return a - b;
    }
    // Es kann vorkommmen, dass die beiden letzten Elemente der Teilmengen identisch sind ...
    let _sml = small.slice(-1)[0];
    let _lal = large.slice(-1)[0];
    if (_sml == _lal)
        large.pop();                        // ... dann letztes Element der oberen Hölfte entfernen
    let nums = [];
    small.shift();                          // führende '1' entfernen
    large.sort(compareNumbers);
    if (large.slice(0, 1)[0] == 1)
        large.shift();                      // führende '1' entfernen
    expandArray(nums, small);               // untere Hälfte umkopieren
    expandArray(nums, large);               // obere Hälfte umkopieren
    if (!nums.includes(num))                // sicherstellen, dass Teiler selbst enthalten ist
        nums.push(num);
    nums.sort(compareNumbers);              // in aufsteigender Reihenfolge anordnen
    return nums;
}
