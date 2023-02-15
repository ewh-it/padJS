/**
 * 
 * Pascalsches-Dreieck - PaD
 * Copyright 2022/23 EW.Heinrich
 * This code is licensed under an AGPL-3.0-or-later License.
 *   Parts of the code in externally referenced modules may be subject to other licenses.
 * 
 * Knoten
 * 
 */

import {print, duplicateMap} from "./AAAhelpers.js";
import { factorize } from "./PaDhelper.js";

const bn0 = BigInt(0);

export class cNODES {
    constructor() {
        this.CNodes = [];
    }

    SET(cnodes) {
        this.CNodes = cnodes;
        print('cNODES', cnodes.length);
    }
    GET() {
        return this.CNodes;
    }
    reset() {
        this.CNodes.forEach( node => {
            node.bFsD = true;
            node.bFsT = false;
            node.bFsF = false;
        });
    }
    set1all() {
        this.CNodes.forEach( node => {
            node.bFsD = false;
            node.bFsT = true;
            node.bFsF = false;
        });
    }

    setTval(tval) {
        let tvbn = BigInt(tval);
        this.CNodes.forEach( node => {
            let _mval = node.xVal % tvbn;
            if (_mval == bn0) {
                node.bFsD = false;
                node.bFsT = true;
            } else {
                node.bFsD = true;
                node.bFsT = false;
            }
            node.bFsF = false;
        });
    }

    setFval(fval) {
        let fvbn = BigInt(fval);
        this.CNodes.forEach( node => {
            if (!node.bFsT) {
                let _mval = node.xVal % fvbn;
                if (_mval == bn0) {
                    node.bFsD = false;
                    node.bFsF = true;
                } else {
                    node.bFsD = true;
                    node.bFsF = false;
                }
            }
        });
    }

}
