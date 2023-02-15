/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Bildschirm-Elemente - Layout
 * 
 */

import { print, elemToggler, rgb } from "./AAAhelpers.js";
import * as PaDc from "./PaDconfig.js";
import { TestFaktor, TestFlag, TestTeiler, DoReset } from "./PaDinteraction.js";

export function initLayout() {
    /* Basis-Layout erzeugen - Titel, Infos, Zeilen-Blöcke */

    let dElem = null;
    let cElem = null;
    let m_SVGboxes = PaDc.GET("SVGboxes");
    let boxMode = PaDc.GET("boxMode");

    // Schaltflächen für Teiler Rauf&Runter-Zählen sind als ins DOM eingebundene SVG-Elemente realisiert
    // -> Referenz auf konkretes Layout über CSS - background-image: url( ... ) 
    //      ... funktioniert bezüglich der Darstellung, aber nicht in Bezug auf Javascript
    // -> Einbindung direkt ins DOM als <object>
    //      ... klappt nicht unter CHROME, weil das Schnipsel als fremd markiert wird 
    //      -> virtuelles Element '#document' trennt anhängende Teile von DOM-Sicht ab
    // -> Einbindung direkt ins DOM als normales SVG-Element
    //      -> Definition als 'template-literal' in PaDboxes.js
    //      ... funktioniert, Eigenschaften können über CSS gesteuert werden, Events werden erkannt

    let cbgt = document.getElementById("bg-teiler");
    cbgt.innerHTML = "";                                // alles vorhandenene entfernen

        dElem = document.createElement("div");
        dElem.className = "TM-boxes";
        dElem.innerHTML = m_SVGboxes.getTMboxesDOM(boxMode);       // Schaltflächen Minus
    cbgt.appendChild(dElem);
        dElem = document.createElement("div");
        dElem.className = "t-box";
            cElem = document.createElement("div");
            cElem.className = "t-info";
            cElem.setAttribute("id", "lblT");               // Überberschrift
        dElem.appendChild(cElem);
            cElem = document.createElement("div");
            cElem.className = "t-wert";
            cElem.setAttribute("id", "valT");               // aktueller Teiler-Wert
            cElem.textContent = "0";
        dElem.appendChild(cElem);
            cElem = document.createElement("button");
            cElem.className = "t-reset";
            cElem.setAttribute("id", "tt000");              // Button 0-setzen
            cElem.textContent = "0";
        dElem.appendChild(cElem);
    cbgt.appendChild(dElem);
        dElem = document.createElement("div");
        dElem.className = "TP-boxes";
        dElem.innerHTML = m_SVGboxes.getTPboxesDOM(boxMode);       // Schaltflächen Plus
    cbgt.appendChild(dElem);

    // Schaltflächen für Faktor Links&Rechts-Läufer sind als ins DOM eingebundene SVG-Elemente realisiert
    //      -> siehe obige Anmerkungen

    let bElem = null;

    let cbgf = document.getElementById("bg-factors");
    cbgf.innerHTML = "";                                // alles vorhandenene entfernen

        dElem = document.createElement("div");
        dElem.className = "f-info";
        dElem.setAttribute("id", "lblF");               // Überberschrift
    cbgf.appendChild(dElem);
        dElem = document.createElement("div");
        dElem.className = "f-spinner";
            cElem = document.createElement("div");
            cElem.className = "f-boxes";
            cElem.innerHTML = m_SVGboxes.getFLboxDOM();         // Schaltfläche Links
        dElem.appendChild(cElem);
            cElem = document.createElement("div");
            cElem.className = "f-wert";
            cElem.setAttribute("id", "valF");                   // aktueller Faktor-Wert
            cElem.textContent = "";
        dElem.appendChild(cElem);
            cElem = document.createElement("div");
            cElem.className = "f-boxes";
            cElem.innerHTML = m_SVGboxes.getFRboxDOM();         // Schaltfläche Rechts
        dElem.appendChild(cElem);
    cbgf.appendChild(dElem);

    // Events zuordnen

    m_SVGboxes.init(TestTeiler, "T");                       // Schaltflächen - Events dazu
    m_SVGboxes.init(TestFaktor, "F");                       // Schaltflächen - Events dazu
    let but0 = document.getElementById("tt000");            // Button 0 - Event dazu
    but0.addEventListener('click', function(event) {
        DoReset(event);
    });

    // Elemente ausblenden
    elemToggler("bg-factors", false);

}
export function prepLayout() {
    /* Basis-Layout erzeugen - Titel, Infos */
    // Titel -> werden als tooltips gezeigt

    let _SVGboxes = PaDc.GET("SVGboxes").SVGboxes;

    let telem = document.getElementById("bg-title");
    let cElem = telem.firstChild;
    cElem.textContent = i18n("title");

    telem = document.getElementById("lblT");
    telem.textContent = i18n("lblT");

    telem = document.getElementById("tt000");
    telem.title = i18n("tt000");

    for (const [key, value] of Object.entries(_SVGboxes)) {
        telem = document.getElementById(key);
        if (telem) {
            telem = document.getElementById(key).firstChild.nextSibling;
            telem.innerHTML = i18n(key);
        }
    }

    telem = document.getElementById("lblF");
    telem.textContent = i18n("lblF");

}

export function draw() {
    let cNODES = PaDc.GET("cNODES");
    let _cNodes = cNODES.GET();
    let cBounds = PaDc.GET('cBounds');
    draw_EXEC(_cNodes, cBounds);
}

function draw_EXEC(cNodes, cBounds) {
    let refElem = document.getElementById('bg-canvas');

    let cwidth = refElem.clientWidth;
    let cheight = 1000;
    /** Pro Neudurchgang canvas komplett neu aufbauen - nach Sprach-Wechsel
     *  ... der Ablauf ist nur eingeschränkt Restart-fähig,
     *      'canvas-Recycling' führt zu massiven Performance-Einbußen
     */
    let showCanvas = document.querySelector('#bg-canvas canvas');     // Kontrolle, ob canvas existiert
    if (showCanvas)                                                 // ja ...
        showCanvas.remove();                                            // ... entfernen
    showCanvas = d3.select('#bg-canvas')                              // canvas neu anlegen
                .append('canvas')
                .classed('showCanvas', true)
                .attr('width', cwidth)
                .attr('height', cheight);

    let elemCdummy = document.createElement('cdummy');             // wird immer neu angelegt, ist außerhalb des DOM
    let cDummy = d3.select(elemCdummy);
    /** canvas soll die Zustände in circs wiedergeben
     * ... dazu müssen die circs an canvas gebunden werden - d3.js Funktionalität
     */
    bindCircs(cDummy, cNodes);

    let ctx = showCanvas.node().getContext('2d');       // den im d3.js Konstrukt gekapselten Context freilegen
    // Virtuelle Canvas definieren - wg. verschiedener Farben ...
    let ctxD = createContext(cwidth, cheight);           // Default-Elemente
    let ctxT = createContext(cwidth, cheight);           // Teiler-Elemente
    let ctxF = createContext(cwidth, cheight);           // Faktor-Elemente

    draw_DO(ctx, ctxD, ctxT, ctxF, cwidth, cheight, cDummy, cBounds);     // Zeichnen ausführen

}
function createContext(_width, _height) {
    let _canv = document.createElement('canvas');
    _canv.setAttribute('width', _width);
    _canv.setAttribute('height', _height);
    let _ctx = _canv.getContext('2d');
    clearContext(_ctx);
    _ctx.lineWidth = 0.5;
    _ctx.strokeStyle = '#000000';
    return _ctx;
}
function clearContext(_ctx) {
    _ctx.setTransform(1, 0, 0, 1, 0, 0);
    _ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
}
function bindCircs(canvas, cNodes) {
    let join = canvas.selectAll('cdummy.arc')
                    .data(cNodes);
    let enterSel = 
        join.enter()
            .append('cdummy')
            .attr('class', 'arc')
            .attr('x', function (d, i) {
                return d.aX;
            })
            .attr('y', function (d, i) {
                return d.aY;
            })
            .attr('r', function (d, i) {
                return d.aR;
            })
            .attr('fillStyle', function (d,i) {
                return d.aFs;
            })
            .attr('bFs1', function (d,i) {
                return d.bFs1;
            })
            .attr('bFs2', function (d,i) {
                return d.bFs2;
            })
            ;
    join.merge(enterSel).transition()
            .attr('r', function (d, i) {
                return d.aR;
            })
            .attr('fillStyle', function (d,i) {
                return d.aFs;
            })
            ;
    let exitSel =
        join.exit()
            .transition()
            .remove()
            ;
}
function draw_DO(ctx, ctxD, ctxT, ctxF, width, height, cDummy, cBounds) {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    drawPoints(ctx, width, cBounds);
    ctx.stroke();
    ctx.fill();

    // Kreise zeichnen
    drawArcs(ctx, ctxD, ctxT, ctxF, cDummy);

    ctx.restore();

}
function drawPoints(ctx, width, cBounds) {
    let r360 = 2 * Math.PI;
    let oxd = PaDc.GET('oDia');        // Durchmesser
    let oVy = PaDc.GET('oVy');         // Versatz Y
    let obord = PaDc.GET('oBord');     // Rand

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#000000';

    function dcp(ox, oy) {
        ctx.moveTo(ox+0.5, oy);
        ctx.arc( ox, oy, 1, 0, r360 );
    }
    let ox0 = oxd/2 + obord;
    let oxw = width - oxd;
    let oyE = cBounds.length*oVy + 3*oVy;
    for (let oy=oVy; oy<oVy*4; oy+=oVy) {
        for (let ox=ox0; ox<oxw; ox+=oxd) {
            dcp(ox, oy);
        }
    }
    for (let icb=0; icb<cBounds.length; icb++) {
        let cb = cBounds[icb];
        let oy = cb[0];
        if (icb % 10 == 0) {
            ctx.moveTo(ox0, oy);
            ctx.lineTo(oxw, oy);
        }
        for (let ox=ox0; ox<oxw; ox+=oxd) {
            dcp(ox, oy);
        }
    }
    for (let oy=oyE+3*oVy; oy>oyE; oy-=oVy) {
        for (let ox=ox0; ox<oxw; ox+=oxd) {
            dcp(ox, oy);
        }
    }
}
function drawArcs(ctx, ctxD, ctxT, ctxF, cDummy) {
    var elements = cDummy.selectAll('cdummy.arc');
    let r360 = 2 * Math.PI;
    let clW = PaDc.GET('oBord');
    let csS = '#1d1d1d';
    function ctxXattr(_ctx, _clW, _csS, _cfs) {
        _ctx.lineWidth = _clW;
        _ctx.strokeStyle = _csS;
        _ctx.fillStyle = _cfs;
    }
    ctxXattr(ctxD, clW, csS, PaDc.nFill[0]);            // Default-Farbe
    ctxXattr(ctxT, clW, csS, PaDc.nFill[1]);            // Teiler-Farbe
    ctxXattr(ctxF, clW, csS, PaDc.nFill[2]);            // Faktor-Farbe

    let doD = false;
    let doT = false;
    let doF = false;

    elements.each(function (d, i) {
        let node = d3.select(this);
        let _node = node._groups[0][0].__data__;
        if (_node.bFsD) {
            doD = true;
            ctxD.moveTo(_node.aX + _node.aR, _node.aY);
            ctxD.arc( _node.aX, _node.aY, _node.aR, 0, r360 );
        }
        if (_node.bFsT) {
            doT = true;
            ctxT.moveTo(_node.aX + _node.aR, _node.aY);
            ctxT.arc( _node.aX, _node.aY, _node.aR, 0, r360 );
        }
        if (_node.bFsF) {
            doF = true;
            ctxF.moveTo(_node.aX + _node.aR, _node.aY);
            ctxF.arc( _node.aX, _node.aY, _node.aR, 0, r360 );
        }
    });

    if (doD) {
        ctxD.stroke();
        ctxD.fill();
        ctx.drawImage(ctxD.canvas, 0, 0);
    }
    if (doT) {
        ctxT.stroke();
        ctxT.fill();
        ctx.drawImage(ctxT.canvas, 0, 0);
    }
    if (doF) {
        ctxF.stroke();
        ctxF.fill();
        ctx.drawImage(ctxF.canvas, 0, 0);
    }
}

// Sprachen umschalten

export function prepFlagBox() {
    let actLocale = PaDc.GET("actLocale");
    let Clocales = PaDc.locales;
    let efbox = document.getElementById("bg-flags");
    efbox.innerHTML = "";

    let alocales = Clocales[actLocale];
    prepFlags(efbox, actLocale, alocales[0], false);
    for(const [key, locales] of Object.entries(Clocales)) {
        let _locale = locales[0];
        if (key != actLocale) {
            prepFlags(efbox, key, _locale , true);
        }
    }

    efbox.addEventListener('click', TestFlag);

}
function prepFlags(pelem, locale, flagKey, doClick) {
    let delem = document.createElement("div");
    if (doClick) {
        delem.classList = "flag-s";
    } else {
        delem.classList = "flag-b";
    }
    
    let belem = document.createElement("button");
    belem.type = "button";
    belem.name = locale;
    belem.title = locale;
    belem.classList = flagKey;

    delem.appendChild(belem);
    // if (doClick) {
    //     // belem.classList = "flag-s " + flagKey;
    // } else {
    //     // belem.classList = "flag-b " + flagKey;
    // }
    pelem.appendChild(delem);
}
