[![License: AGPL-3.0-or-later](https://img.shields.io/badge/license-AGPL-lightgrey.svg)](https://choosealicense.com/licenses/agpl-3.0/)
![Latest Release](https://img.shields.io/github/v/release/ewh-it/padJS)

Pascal'sches Dreieck

* Copyright (C) 2019-2024 ewh-it - EW.H

Pascal'sches Dreieck mit Faktoren-Zerlegung und Mehrsprachigkeit

## Inhalt

* [Beschreibung](#description)
  * [Bedienelemente](#userinterface)
  * [Noch zu tun](#TODO)
* [Voraussetzungen](#requirements)
* [Installation](#installation)
* [Upgrade](#upgrade)
* [Übersetzungen](#translation)
* [Support](#support)
* [Danksagungen](#thanks)
* [Lizenz](#license)

<a name="description"></a>
## Beschreibung

Ein Pascal'sches Dreieck wird aufgebaut, 101 Ebenen mit dementsprechend 5151 Knoten. Ein Steuerelement erlaubt das Setzen eines Teilers, die durch den jeweiligen Teiler ganzzahlig teilbaren Knotenwerte werden rot hervorgehoben. Ist ein Teilerwert keine Primzahl, werden in einem weiteren Steuerelement die zugehörigen Faktoren-Werte angezeigt, bei Auswahl eines der Faktoren werden die damit korrespondierenden zusätzlichen Knoten blau hervorgehoben. Man kann zwischen Anzeigesprachen wechseln, die verfügbaren Sprachen sind durch Flaggensymbole kenntlich gemacht.

Der Teilerwert kann abgestuft verändert werden, die Stufen werden über die Konfiguration gesetzt und sind entweder 1-2-10 oder 1-10-100. Die Vorgabe kann nicht im laufenden Programm geändert werden.

Das Programm ist parametrisiert, es gibt ein Konfigurations-Modul, in welchem diverse Werte hinterlegt sind und das Programm setzt diese um. Änderungen der Parameter sind potentiell möglich, alternative Ausprägungen sind in der Konfiguration auskommentiert.

Die Index.html enthält nur die Hauptelemente, die Details werden vom Programm entweder durch konkrete Anweisungen oder durch Einbindung von template-Literals eingefügt.

Die Darstellung ist ein canvas, für das Management der Darstellungselemente wird D3.js benutzt.

Die Mehrsprachigkeit wird über i18n.js erreicht, die Textelemente sind in einem Programm-Modul hinterlegt.

Das Programm arbeitet komplett lokal, die zusätzlichen Bibliotheken sind ebenfalls lokal vorgehalten.

* Anmerkung: Ein nicht vorhergesehenes Problem ergab sich beim Erstellen des Pascal-Kegels ...
Das vorliegende Programm war ursprünglich in Python erstellt und ließ sich dort ohne besondere Anpassungen entwickeln. Bei der Umstellung auf Javascript zeigte sich, dass die Werte in den unteren Ebenen in Bereiche vordringen, welche vom üblichen Inventar nicht unterstützt werden. Die Zahlenwerte müssen speziell als BigInt definiert und behandelt werden, denn die größten Werte liegen weit außerhalb des regulären Integer-Bereichs (2^^53-1):
- Die größte Zahl bei lcnt = 101 ist 100 891 344 545 564 193 334 812 497 256  (10^^29) => (2^^96)



<a name="userinterface"></a>
#### Bedienelemente

Immer sichtbar sind Sprachen-Flaggen und Teiler-Box.

- Die Teilerbox enthält jeweils 3 Schaltflächen zum Hoch- und Runterzählen des Teilerwerts, die Anzeige des aktuellen Werts und eine Schaltfläche, welche den Ausgangszustand herstellt.

- Die Schaltflächen zum Hochzählen sind immer aktiv, die Runterzähl-Elemente nur wenn der Teiler im entsprechenden Wertebereich ist.

- Die Faktoren-Box wird nur eingeblendet, wenn der Teiler keine Primzahl ist. Beim Start wird der Teilerwert selbst gezeigt und die nach-Rechts-Schaltfläche ist inaktiv, solange der jeweils gewählte Faktor nicht der kleinste oder größte ist sind beide Schaltflächen aktiv, mit Erreichen des kleinsten Faktor-Wert wird die nach-Links-Schaltfläche inaktiv.

- Die Flaggen-Box zeigt die verfügbaren Anzeige-Sprachen durch die jeweiligen Landesflaggen, die aktive Sprache ist hervorgehoben (große Flagge).

<a name="TODO"></a>
#### Noch zu Tun
 
- Mehrsprachigkeit: Zurzeit sind nur Deutsch und Englisch definiert, denkbar sind weitere gängige Verkehrssprachen.
- Zusätzliche Darstellungselemente: Einblendung der Fibonacci-Zahlen, Hervorhebung der Diagonalen ... 
- PHP-Backend einrichten, so dass Texte und Einstellungen vom Server abgerufen werden können.

<a name="requirements"></a>
## Voraussetzungen

Dieses Modul ist standalone, es gibt keine Abhängigkeiten, alle Elemente sind im Download enthalten.
Das Modul ist ein reines Frontend-Modul im Browser. Der Code ist Vanilla-JavaSript im ES6-Standard.

<a name="installation"></a>
## Installation

1. Laden Sie die [Neueste Version] (https://github.com/ewh-it/padJS/releases/latest) herunter.
2. Entpacken Sie es in ein Verzeichnis <ihre Wahl> auf dem Webserver.

<a name="upgrade"></a>
## Upgrade

Um die neueste Version zu erhalten, ersetzen Sie einfach die vorhandenen PaD-Dateien mit denen der neuesten Version.

<a name="translation"></a>
## Übersetzungen

Eine Sprache wird beschrieben durch
- Meldungstexte und Beschriftungen - in PaDtranslate.js

<a name="support"></a>
## Support

<span style="font-weight: bold;">Issues: </span>Fehler bitte in diesem GitHub-Repository melden.

<a name="thanks"></a>
## Danksagungen

* **i18n**    : Simon Rodwell und Mitgestalter https://github.com/roddeh/i18njs
* **D3js**    : Mike Bostock und Mitgestalter https://d3js.org/ bzw. https://github.com/d3
* **Flaggen** : https://flagpedia.net/

<a name="license"></a>
## Lizenz

* (AGPL-3.0-or-later)

Die Lizendefinition kann unter https://www.gnu.org/licenses/agpl-3.0 bzw. https://choosealicense.com/licenses/agpl-3.0/
eingesehen werden.

i18n ist unter MIT lizensiert.

D3js ist unter ISC lizensiert.
