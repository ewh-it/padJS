/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Bildschirm-Elemente - Schaltflächen
 * 
 */

import { repS } from "./AAAhelpers.js";
import * as PadC from "./PaDconfig.js";

// Schaltflächen für Teiler Rauf&Runter-Zählen - SVG-Elemente zum direkten Einkopieren ins DOM

export class SVGboxes {

    constructor () {
        this.SVGboxes = {
            // T-Elemente -> Teiler             val -> wird mit aktuellem Zustand verrechnet
            "TM-1": {id: "TM-1", status: "OFF", rv: 1, ops: "SUB", val: -1, elem: {}, elemt: {} },
            "TM-2": {id: "TM-2", status: "OFF", rv: 2, ops: "SUB", val: -2, elem: {}, elemt: {}  },
            "TM-10": {id: "TM-10", status: "OFF", rv: 10, ops: "SUB", val: -10, elem: {}, elemt: {}  },
            "TM-100": {id: "TM-100", status: "OFF", rv: 100, ops: "SUB", val: -100, elem: {}, elemt: {}  },
            "TP-1": {id: "TP-1", status: "ON", rv: null, ops: "ADD", val: 1, elem: {}, elemt: {}  },
            "TP-2": {id: "TP-2", status: "ON", rv: null, ops: "ADD", val: 2, elem: {}, elemt: {}  },
            "TP-10": {id: "TP-10", status: "ON", rv: null, ops: "ADD", val: 10, elem: {}, elemt: {}  },
            "TP-100": {id: "TP-10", status: "ON", rv: null, ops: "ADD", val: 100, elem: {}, elemt: {}  },
            // F-Elemente -> Faktor             val -> verändert Zeiger auf Faktor-Array
            "FL-1": {id: "FL-1", status: "ON", rv: null, ops: "SHIFT", val: -1, elem: {}, elemt: {}  },
            "FR-1": {id: "FR-1", status: "OFF", rv: null, ops: "SHIFT", val: 1, elem: {}, elemt: {}  },
        };
        this.Tval = 0;
        this.Tfactor = 0;
        this.boxMode = {
            "aktiv": "",
            "1_2": ["Tx-1","Tx-2","Tx-10"],
            "1_10": ["Tx-1","Tx-10","Tx-100"]
        };
        this.doTouch = false;
    }

    init(evListener, firstChar, suff=null) {
        function set_ev(delem) {
                delem.addEventListener('touchstart', function(event) {
                    event.preventDefault();
                    evListener(event);
                });
                delem.addEventListener('click', function(event) {
                    evListener(event);
                });
        }
        let boxes = Object.keys(this.SVGboxes);
        boxes.forEach( (key, ind) => {
            if (key.startsWith(firstChar)) {
                let delem = document.getElementById(key);
                if (delem) {
                    set_ev(delem);
                    let sbox = this.SVGboxes[key];
                    sbox.elem = delem;
                }
                if (suff) {
                    let key_ = key + suff;
                    let delemt = document.getElementById(key_);
                    if (delemt)
                        set_ev(delemt);
                        let sbox = this.SVGboxes[key];
                        sbox.elemt = delemt;
                    }
            }
        });
    }

    reset() {
        let boxes = Object.keys(this.SVGboxes);
        boxes.forEach( (key, ind) => {
            let delem = document.getElementById(key);
            let sbox = this.SVGboxes[key];
            if ( sbox.ops == "SUB" || sbox.ops == "SHIFT")
                if (!delem.classList.contains("inactive"))
                    delem.classList.toggle("inactive");
                    let key_ = key + "t";
                    let delemt = document.getElementById(key_);
                    if (delemt)
                        if (!delemt.classList.contains("inactive"))
                            delemt.classList.toggle("inactive");
                });
        this.Tval = 0;
        this.Tfactor = 0;
    }

    getTMboxesDOM(_boxMode) {
        this.boxMode.aktiv = _boxMode;
        let _bM = this.boxMode[_boxMode];
        let _bx0 = repS(_bM[0], "Tx", "TM");
        let _bx1 = repS(_bM[1], "Tx", "TM");
        let _bx2 = repS(_bM[2], "Tx", "TM");
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 90 84" preserveAspectRatio="xMidYMid meet">
            <g id="${_bx0}" transform="translate(50,-23)" class="bxT inactive">
                <title>-1</title>
                <path d="M0 88.5 L21.26 80.91 L21.26 50.58 L0 45.08 L0 88.5 Z"/>
            </g>
            <text id="${_bx0}t" class="bxTt inactive" x="60" y="26" style="display:inline">-1</text>
            <g id="${_bx1}" transform="translate(24,-14)" class="bxT inactive">
                <title>-10</title>
                <path d="M0 88.5 L21.6 80.55 L21.6 34.35 L0.23 27.23 L0 88.5 Z"/>
            </g>
            <text id="${_bx1}t"class="bxTt inactive" x="35" y="26" style="display:inline">-2</text>
            <g id="${_bx2}" transform="translate(0,-1)" class="bxT inactive">
                <title>-100</title>
                <path d="M0 88.5 L20.12 76.54 L20.12 13.09 L0 2.14 L0 88.5 Z"/>
            </g>
            <text id="${_bx2}t" class="bxTt inactive" x="10" y="18" style="display:inline">-10</text>
        </svg>
        `;
    }

    getTPboxesDOM(_boxMode) {
        let _bM = this.boxMode[_boxMode];
        let _bx0 = repS(_bM[0], "Tx", "TP");
        let _bx1 = repS(_bM[1], "Tx", "TP");
        let _bx2 = repS(_bM[2], "Tx", "TP");
        return `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: block; " width="144" height="120" viewBox="0 0 90 84" preserveAspectRatio="xMidYMid meet">
            <g id="${_bx0}" transform="translate(34,-23) scale(-1,1)" >
                <title>-1</title>
                <path d="M0 88.5 L21.26 80.91 L21.26 50.58 L0 45.08 L0 88.5 Z" class="bxT"/>
            </g>
            <text id="${_bx0}t" class="bxTt" x="24" y="26" style="display:inline">+1</text>
            <g id="${_bx1}" transform="translate(60,-14) scale(-1,1)">
                <title>-10</title>
                <path d="M0 88.5 L21.6 80.55 L21.6 34.35 L0.23 27.23 L0 88.5 Z" class="bxT"/>
            </g>
            <text id="${_bx1}t" class="bxTt" x="50" y="26" style="display:inline">+2</text>
            <g id="${_bx2}" transform="translate(84,-1) scale(-1,1)" >
                <title>-100</title>
                <path d="M0 88.5 L20.12 76.54 L20.12 13.09 L0 2.14 L0 88.5 Z" class="bxT"/>
            </g>
            <text id="${_bx2}t" class="bxTt" x="74" y="18" style="display:inline">+10</text>
        </svg>
        `;
    }

    getFLboxDOM() {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="130" viewBox="-20 60 40 30" preserveAspectRatio="xMidYMid meet">
            <g>
                <title>-1</title>
                <path d="M0 82.5 L21.26 76.91 L21.26 50.58 L0 45.08 L0 82.5 Z" class="bxF inactive"/>
            </g>
            <text id="FL-1" x="10" y="34" style="display:inline">≺</text>
        </svg>
        `;
    }

    getFRboxDOM() {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: block; transform: scale(-1,1)" width="60" height="130" viewBox="-20 64 40 30" preserveAspectRatio="xMidYMid meet">
            <g>
                <title>-1</title>
                <path d="M0 82.5 L21.26 76.91 L21.26 50.58 L0 45.08 L0 82.5 Z" class="bxF inactive"/>
            </g>
            <text id="FR-1" x="10" y="34" style="display:block"></text>
        </svg>
        `;
    }

    getStatus(eID) {
        return this.SVGboxes[eID].elem.status;
    }

    setStatus(eID, status) {
        this.SVGboxes[eID].elem.status = status;
        return this.SVGboxes[eID].elem.status;
    }

    getWert(eID) {
        return this.SVGboxes[eID].val;
    }

    updWert(tval) {
        this.Tval = tval;
        function tbox(sbox, tval) {
            let selem = sbox.elem; // document.getElementById(eID);
            let doToggle = false;
            if (sbox.rv > tval) {
                if (selem.classList.contains("inactive") == false)
                    doToggle = true;
            } else {
                if (selem.classList.contains("inactive") == true)
                    doToggle = true;
            }
            if (doToggle) {
                selem.classList.toggle("inactive");
                if (sbox.elemt)
                    sbox.elemt.classList.toggle("inactive");
            }
        }
        let _boxMode = this.boxMode.aktiv;
        let tboxes = this.boxMode[_boxMode];
        // let tboxes = ["TM-1", "TM-10", "TM-100"];
        // TM-Boxen entsprechend aktuellem Wert deaktivieren/aktivieren
        tboxes.forEach( tbID => {
            let eID = repS(tbID, "Tx", "TM");
            let sbox = this.SVGboxes[eID];
            tbox(sbox, tval);
        });
    }

}
