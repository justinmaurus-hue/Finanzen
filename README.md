# Ausgleich-App

Private Schulden- und Ausgabenübersicht für zwei Personen mit einem Administrator.

## Zweck

Die App verwaltet gemeinsame Ausgaben zwischen:

- Carola
- Janine

Justin ist Administrator und verwaltet nur die App.

Justin ist **nicht Teil der Geldberechnung**.

---

# Benutzer

## Administrator

**Justin**

Aufgaben:
- App verwalten
- Einträge kontrollieren
- Fehler korrigieren

PIN:0203

---

## Benutzer
### Carola
Pin: 1509

### Janine
Pin:1002


---

# Funktionen

## Aktueller Stand

Die App berechnet automatisch:

- Wer bekommt Geld?
- Wer schuldet Geld?
- Wie hoch ist der offene Betrag?

---

## Ausgaben erfassen

Beispiel:

Carola bezahlt: 100€ Einkauf

Die App berechnet:
Janine schuldet Carola 50€


---

# Technik

Die App verwendet:

- HTML
- CSS
- JavaScript
- Firebase Firestore
- GitHub Pages

---

# Installation

1. Repository auf GitHub erstellen

2. Dateien hochladen: index.html style.css app.js firebase-config.js README.md

3. Firebase Projekt erstellen

4. Firebase Konfiguration in firebase-config.js eintragen

5. GitHub Pages aktivieren

---

# Sicherheit

Diese Version ist für private Nutzung gedacht.

Die PINs werden aktuell im Code gespeichert.

Für eine spätere Version kann Firebase Authentication ergänzt werden.

---

# Geplante Erweiterungen

- Rückzahlungen erfassen
- Einträge bearbeiten
- Einträge löschen
- Monatsübersichten
- App-Symbol
- Installierbare Handy-App
