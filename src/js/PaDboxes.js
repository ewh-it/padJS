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

const actUserAgent = navigator.userAgent;

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
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="130" viewBox="-12 -6 100 100" preserveAspectRatio="xMidYMid meet">
            <g id="${_bx0}" class="bxT inactive">
                <title>-1</title>
                <path d="m51.5134,19.95734l19.23668,5.41252l-0.04459,40.78574l-19.19209,5.33173l0,-51.52999z"/>
            </g>
            <text id="${_bx0}t" class="bxTt inactive" x="60" y="26" style="display:inline">-1</text>
            <g id="${_bx1}" class="bxT inactive">
                <title>-10</title>
                <path d="m26.59003,11.618l21.90333,7.15l-0.05077,53.85l-21.85256,7.04l0,-68.04z"/>
            </g>
            <text id="${_bx1}t"class="bxTt inactive" x="35" y="26" style="display:inline">-2</text>
            <g id="${_bx2}" class="bxT inactive">
                <title>-100</title>
                <path d="m1,0.5l22.57,9.46743l-0.05232,71.31669l-22.51768,9.32921l0,-90.11334z"/>
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
        <svg xmlns="http://www.w3.org/2000/svg" style="display: block; " width="120" height="130" viewBox="2 12 100 100" preserveAspectRatio="xMidYMid meet">
            <g id="${_bx0}" class="bxT">
                <title>-1</title>
                <path d="m18.8,43.62529l19.92,-5.41796l0,52.36333l-19.97,-5.51031l0.05,-41.43507z"/>
            </g>
            <text id="${_bx0}t" class="bxTt" x="28" y="46" style="display:inline">+1</text>
            <g id="${_bx1}" class="bxT">
                <title>-10</title>
                <path d="m40.93761,36.89654l21.85256,-7.1952l0,69.54l-21.90333,-7.30763l0.05077,-55.03717z"/>
            </g>
            <text id="${_bx1}t" class="bxTt" x="52" y="46" style="display:inline">+2</text>
            <g id="${_bx2}" class="bxT">
                <title>-100</title>
                <path d="m65.27743,28.2l25.55756,-9.45l0,91.28l-25.62,-9.6l0.06244,-72.23z"/>
            </g>
            <text id="${_bx2}t" class="bxTt" x="76" y="36" style="display:inline">+10</text>
        </svg>
        `;
    }

    getFLboxDOM() {
        let _ty = '34';
        if (actUserAgent.includes('Firefox/'))
            _ty = '43';
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="130" viewBox="-20 60 40 30" preserveAspectRatio="xMidYMid meet">
            <g>
                <title>-1</title>
                <path d="M0 82.5 L21.26 76.91 L21.26 50.58 L0 45.08 L0 82.5 Z" class="bxF inactive"/>
            </g>
            <text id="FL-1" x="10" y="${_ty}" style="display:inline">≺</text>
        </svg>
        `;
    }

    getFRboxDOM() {
        let _ty = '34';
        if (actUserAgent.includes('Firefox/'))
            _ty = '43';
        return `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: block; transform: scale(-1,1)" width="60" height="130" viewBox="-20 64 40 30" preserveAspectRatio="xMidYMid meet">
            <g>
                <title>-1</title>
                <path d="M0 82.5 L21.26 76.91 L21.26 50.58 L0 45.08 L0 82.5 Z" class="bxF inactive"/>
            </g>
            <text id="FR-1" x="10" y="${_ty}" style="display:block"></text>
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
