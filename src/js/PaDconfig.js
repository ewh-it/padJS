/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Steuerwerte - Zentral-Verzeichnis
 * 
 */

import {print, duplicateMap} from "./AAAhelpers.js";

const confData = [
// zentrale Schalter    - 0: inaktiv    1: aktiv
    [ "doEscape", 1 ],       // Abbruch per 'Escape'
    [ "doLocales", 1],       // Sprach-Auswahl
    [ "boxMode", "1_2"],     // Boxen '1' '2' '10'
    // [ "boxMode", "1_10"],     // Boxen '1' '10' '100'
// relevante Steuerwerte - Anzahl, Länge
    [ "PaDlevels", 101],     // Anzahl PaD-Ebenen
    [ "nLFlen", 0],          // Länge Faktoren-Liste
    [ "nLFvals", []],        // Faktoren-Liste
    [ "nLFind", 0],          // Faktoren-Liste aktueller Index
// Bildschirm-Layout
    [ "bgWwidth", 1280],     // PaD-Widget Breite
    [ "bgWheight", 1024],    // PaD-Widget Höhe
    [ "gXmin", 0],
    [ "gYmin", 0],
    [ "gYmax", 100],
    [ "gXdiff", 5],
    [ "gYdiff", 5],
    [ "oVy", 9],             // Nodes Versatz Y-Achse
    [ "oVx", 12],            // Nodes Versatz X-Achse
    [ "oDia", 10],           // Nodes Durchmesser
    [ "oBord", 2],           // Nodes Randstärke - Gesamtdurchmesser dann: Odia + 2 * oBord
    [ "xH", 20],            // Startposition Header X-Achse
    [ "xL0", 160],           // Startposition Label X-Achse
    [ "xLd", 20],            // Versatz X-Achse
    [ "yH", 20],             // Startposition Header Y-Achse
    [ "yHl2", 50],           // Startposition Header 2. Zeile
    [ "yL0", 160],           // Startposition Label Y-Achse
    [ "yLd", 80],            // Versatz Y-Achse
    [ "xL", 0],              // Fenstergröße X-Achse
    [ "yL", 0],              // Fenstergröße Y-Achse
// aktive Sprache
    [ "actLocale", 'de'],
];

const CONF = new Map(confData);

export function GET(key) {
    if (CONF.has(key)) {
        return CONF.get(key);
    }
    return null;
}
export function SET(key, value) {
    CONF.set(key, value);
}
export function TEST(key) {
    return CONF.has(key);
}


// Teiler und Faktor(en)

var m_Teiler = 0;

// Sprach-Auswahl

                    /*  key   flag  (unused)  -wid  -hei  svg-  */
export const locales = {'de': ['de', 'de_DE', 1000, 600],
                        'en': ['gb', 'en_GB', 1200, 600],
                        };


// Node-Farben

export const nFill = [
    '#f8f8ff',              // Default-Farbe
    '#ff0000',              // Teiler-Farbe
    '#87cefa'               // Faktor-Farbe
];