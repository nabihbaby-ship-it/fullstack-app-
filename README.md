
# Job Tracker

Ein Full-Stack Job Tracker zum Verwalten von Bewerbungen mit einer Chrome Extension zum direkten Speichern von LinkedIn-Jobs.

## Demo Video

https://youtu.be/0S6QhoHcvA0

## Live Demo

Frontend:

https://fullstack-ni2clfq4d-youssoufs-projects-007b61b2.vercel.app

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
- Automatische Übernahme von Jobtitel und Unternehmen von LinkedIn

## Chrome Extension

Die Chrome Extension ermöglicht das Speichern von LinkedIn-Jobs direkt in den Job Tracker.

### Installation

1. Repository herunterladen
2. ZIP entpacken
3. Chrome öffnen
4. `chrome://extensions` aufrufen
5. Entwicklermodus aktivieren
6. Auf **"Entpackte Erweiterung laden"** klicken
7. Den Ordner `extension` auswählen

### Verwendung

1. LinkedIn Jobseite öffnen
2. Chrome Extension öffnen
3. Auf **"Job speichern"** klicken
4. Der Job wird automatisch im Dashboard gespeichert

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

### Browser Extension

- Chrome Extension API
- Content Scripts
- Message Passing
- Chrome Storage API

## Projektstruktur

```txt
frontend/
backend/
extension/
```

## Motivation

Dieses Projekt wurde entwickelt, um den Bewerbungsprozess an einem Ort zu verwalten und LinkedIn-Jobs mit einer Browser Extension direkt zu speichern.

## Autor

Youssouf