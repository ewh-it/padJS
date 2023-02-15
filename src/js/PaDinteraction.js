/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Bildschirm-Elemente - Interaction
 * 
 */

import { print, elemToggler, rgb } from "./AAAhelpers.js";
import { mainExec_DO } from "./PaDmain.js";
import * as PaDc from "./PaDconfig.js";
import { factorize } from "./PaDhelper.js";
import { draw } from "./PaDlayout.js";

class FaktorData {
    constructor() {
        this.nLFlen = 0;
        this.nLFvals = [];
        this.nLFind = 0;
        this.nLFtv = 0;
    }
}

export function TestFlag() {
    let fElem = document.activeElement;
    let pElem = fElem.parentElement;
    let oElem = pElem.parentElement;
    let btnName = fElem.name;
    print(fElem.name, "CLICKed");
    if (pElem.classList.contains("flag-s")) {
        let pElem_c = oElem.children;
        for (let i=0; i<pElem_c.length; i++) {
            let celem = pElem_c[i];
            let clist = celem.classList;
            if (clist.contains("flag-b")) {
                celem.classList.toggle("flag-b");
                celem.classList.toggle("flag-s");
                break;
            } 
        }
        pElem.classList.toggle("flag-s");
        pElem.classList.toggle("flag-b");

        mainExec_DO(btnName);
    }
}

export function TestTeiler(ev) {
    let aElem = ev.target.parentNode;
    ev.preventDefault();
    ev.stopPropagation();
    print(aElem.id, "CLICKed");
    if (aElem.classList.contains("inactive")) {
        return;
    }
    let eID = aElem.id;
    let m_SVGboxes = PaDc.GET("SVGboxes");
    let val = m_SVGboxes.getWert(eID);

    let tElem = document.getElementById("valT");
    let tval = parseInt(tElem.textContent);
    tval += val;
    tElem.textContent = tval.toString();

    m_SVGboxes.updWert(tval);

    let cNODES = PaDc.GET("cNODES");
    let cLINES = PaDc.GET("cLINES");

    PaDc.SET("nLFlen", 0);

    if (tval == 0) {
        Reset(cNODES, cLINES);
        return;
    } else if (tval == 1) {
        elemToggler("bg-factors", false);
        cNODES.set1all();
        draw();
        return;
    }
    let numListF = factorize(tval);
    if (numListF.length == 1)
        numListF.length = 0;

    if (numListF.length == 0) {
        elemToggler("bg-factors", false);
    } else {
        let nLlen = numListF.length - 1;
        let nLind = nLlen;
        let cFaktorData = PaDc.GET("FaktorData");
        if (cFaktorData == null)
            cFaktorData = new FaktorData();
        cFaktorData.nLFlen = nLlen;
        cFaktorData.nLFvals = numListF;
        cFaktorData.nLFind = nLind;
        cFaktorData.nLFtv = numListF[nLind];
        PaDc.SET("FaktorData", cFaktorData);

        let fElem = document.getElementById("valF");
        fElem.textContent = cFaktorData.nLFtv;
        elemToggler("bg-factors", true);

        switchFspinner("FL-1", "ON");
    }
    cNODES.setTval(tval);

    draw();
}
function switchFspinner(eID, status) {
    let fElem = document.getElementById(eID).children[1];
    if (status == "ON") {
        if (fElem.classList.contains("inactive")) {
            fElem.classList.toggle("inactive");
        }
    } else {
        if (!fElem.classList.contains("inactive")) {
            fElem.classList.toggle("inactive");
        }
    }
}

export function TestFaktor(ev) {
    let aElem = ev.target.parentNode;
    ev.preventDefault();
    ev.stopPropagation();
    print(aElem.id, "CLICKed");
    if (aElem.classList.contains("inactive")) {
        return;
    }
    let eID = aElem.id;
    let m_SVGboxes = PaDc.GET("SVGboxes");
    let val = m_SVGboxes.getWert(eID);
    let cFaktorData = PaDc.GET("FaktorData");
    let nind = cFaktorData.nLFind + val;
    if (nind <= 0) {
        nind = 0;
        switchFspinner("FL-1", "OFF");
        switchFspinner("FR-1", "ON");
    } else if (nind >= cFaktorData.nLFlen) {
        nind = cFaktorData.nLFlen;
        switchFspinner("FL-1", "ON");
        switchFspinner("FR-1", "OFF");
    } else {
        switchFspinner("FL-1", "ON");
        switchFspinner("FR-1", "ON");
    }
    cFaktorData.nLFind = nind;
    cFaktorData.nLFtv = cFaktorData.nLFvals[nind];
    PaDc.SET("FaktorData", cFaktorData);

    let fElem = document.getElementById("valF");
    fElem.textContent = cFaktorData.nLFtv;

    let cNODES = PaDc.GET("cNODES");
    let fval = cFaktorData.nLFtv;
    cNODES.setFval(fval);

    draw();
}

export function DoReset(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let cNODES = PaDc.GET("cNODES");
    let cLINES = PaDc.GET("cLINES");
    Reset(cNODES, cLINES);
}

function Reset(cNODES, cLINES) {
    elemToggler("bg-factors", false);

    let fElem = document.getElementById("valF");
    fElem.textContent = "";

    let tElem = document.getElementById("valT");
    tElem.textContent = "0";

    let m_SVGboxes = PaDc.GET("SVGboxes");
    m_SVGboxes.updWert(0);

    cNODES.reset();
    cLINES.resetNUMS();

    draw();
}

export function makeTooltip() {
    let showCanvas = d3.select('.showCanvas');
    showCanvas.on('mousemove', function(event) {
    // draw the hiddenCanvas
        // draw(hiddenCanvas, true); 
    // get mousePositions from the main canvas
        var mouseX = event.layerX || event.offsetX;
        var mouseY = event.layerY || event.offsetY;
    // get the toolbox for the hidden canvas  
        var hiddenCtx = showCanvas.node().getContext('2d');
        hiddenCtx.willReadFrequently = true;
    // Now to pick the colours from where our mouse is then stringify it in a way our map-object can read it
        var col = hiddenCtx.getImageData(mouseX, mouseY, 1, 1).data;
        var colKey = 'rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')';
    // get the data from our map !
            // var nodeData = colourToNode[colKey];
            // print(nodeData);
            // if (nodeData) {
        // Show the tooltip only when there is nodeData found by the mouse
            d3.select('#tooltip')
                .style('opacity', 0.8)
                .style('top', event.pageY + 5 + 'px')
                .style('left', event.pageX + 5 + 'px')
                .html("X:" + event.pageX.toString() + " Y:" + event.pageY.toString());
        print("X:" + event.pageX.toString() + " Y:" + event.pageY.toString());
                // .html(nodeData.value);
        //    } else {
        // Hide the tooltip when there our mouse doesn't find nodeData
            // d3.select('#tooltip')
            //     .style('opacity', 0);
            // }
    }); // canvas listener/handler
    showCanvas.on('mouseleave', function(event) {
            d3.select('#tooltip')
                .style('opacity', 0);
    }); // canvas listener/handler
}
