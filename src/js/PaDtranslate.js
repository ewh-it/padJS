/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Bildschirm-Elemente - Beschriftungen
 * 
 */

import { print } from "./AAAhelpers.js";

const PaDtext_de = `{"values":{
    "title": "Pascal'sches Dreieck",
    "TM-100": "Runterzählen um 100",
    "TM-10": "Runterzählen um 10",
    "TM-1": "Runterzählen um 1",
    "TM-2": "Runterzählen um 2",
    "TP-1": "Hochzählen um 1",
    "TP-2": "Hochzählen um 2",
    "TP-10": "Hochzählen um 10",
    "TP-100": "Hochzählen um 100",
    "lblT": "Teiler",
    "tt000": "Teiler auf 0 setzen",
    "lblF": "Dazu Faktoren",
    "FL-1": "Vorheriger Faktor",
    "FR-1": "Nächster Faktor",
    "ZZZL": "de"
}}`;

const PaDtext_en = `{"values":{
    "title": "The Pascal Triangle",
    "TM-100": "Set down by 100",
    "TM-10": "Set down by 10",
    "TM-2": "Set down by 2",
    "TM-1": "Set down by 1",
    "TP-1": "Set up by 1",
    "TP-2": "Set up by 2",
    "TP-10": "Set up by 10",
    "TP-100": "Set up by 100",
    "lblT": "Divider",
    "tt000": "Set Divider to 0",
    "lblF": "The Factors",
    "FL-1": "Previous Factor",
    "FR-1": "Next Factor",
    "ZZZL": "en"
}}`;


function load_PaDtext(_locale) {
    let _text = '';
    switch(_locale) {
        case 'en':
            _text = PaDtext_en;
            break;
        default:
            _text = PaDtext_de;
    }
    // Prepare - remove newlines and double whitespaces to get proper JSON-ready text
    _text = _text.replace(/[\r]/g, '');
    _text = _text.replace(/ {2,}/g, ' ');
    let data = JSON.parse(_text);
    return data;
}

export function switch_locale(_locale) {
    // Clear previous state
    i18n.translator.reset();

    // Set the data
    let TXTdata = load_PaDtext(_locale);
    i18n.translator.add(TXTdata);

    print("switch_locale", _locale);
}

switch_locale('de');
