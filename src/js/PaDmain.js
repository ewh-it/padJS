/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 */

import { print, duplicateMap } from "./AAAhelpers.js";
import * as PaDc from "./PaDconfig.js";
import { cNODES } from "./PaDnodes.js";
import { makeCircs } from "./PaDcircs.js";
import { cLINES } from "./PaDlines.js";
import * as PaDl from "./PaDlayout.js";
import { SVGboxes } from "./PaDboxes.js";
import { makeTooltip } from "./PaDinteraction.js";
import { switch_locale } from "./PaDtranslate.js";

const m_SVGboxes = new SVGboxes();
PaDc.SET("SVGboxes", m_SVGboxes);

export function mainExec(actLocale) {

    let c_cLINES = new cLINES();
    let padLevel = PaDc.GET("PaDlevels");
    c_cLINES.init(padLevel);
    PaDc.SET("cLINES", c_cLINES);

    const c_cNODES = new cNODES();
    PaDc.SET("cNODES", c_cNODES);

    makeCircs();

    PaDl.prepFlagBox();
    PaDl.initLayout();

    mainExec_DO(actLocale);

    // makeTooltip();
}
export function mainExec_DO(actLocale) {
    switch_locale(actLocale);
    PaDc.SET("actLocale", actLocale);

    PaDl.prepLayout();

    PaDl.draw();
}
