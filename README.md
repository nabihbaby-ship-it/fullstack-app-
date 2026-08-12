# Job Tracker

Ein Full-Stack Job Tracker zum Verwalten von Bewerbungen.

## Features

- Benutzerregistrierung und Login
- JWT-Authentifizierung
- Passwort-Hashing mit bcrypt
- Bewerbungen erstellen
- Bewerbungen löschen
- Bewerbungsstatus ändern
  - Pendent
  - Interview
  - Absage
- PostgreSQL Datenbank
- Chrome Extension zum Speichern von LinkedIn-Jobs

## Live Demo

Frontend:
https://deine-vercel-url.vercel.app

## Chrome Extension

Die Chrome Extension ermöglicht das Speichern von LinkedIn-Jobs direkt in den Job Tracker.

### Installation

1. Repository herunterladen
2. ZIP entpacken
3. Chrome öffnen
4. `chrome://extensions` aufrufen
5. Entwicklermodus aktivieren
6. Auf "Entpackte Erweiterung laden" klicken
7. Den Extension-Ordner auswählen

### Verwendung

1. Bei LinkedIn anmelden
2. Eine Jobseite öffnen
3. Die Extension öffnen
4. Auf "Job speichern" klicken
5. Der Job wird automatisch im Dashboard gespeichert

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Node.js
- Express

### Datenbank

- PostgreSQL
- Neon

### Deployment

- Vercel
- Railway

### Authentication

- JWT
- bcrypt

## Projektstruktur

```txt
frontend/
backend/
extension/
```

## Screenshots

Hier kannst du später Screenshots vom Dashboard und der Extension einfügen.

## Motivation

Dieses Projekt wurde entwickelt, um den gesamten Bewerbungsprozess an einem Ort zu verwalten und LinkedIn-Jobs mit einer Chrome Extension direkt zu speichern.

## Autor

Youssouf