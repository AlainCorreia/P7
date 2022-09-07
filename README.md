# P7 - Groupomania

### Prérequis
* [Node.js](https://nodejs.org/en/) et npm
* [MongoDB](https://www.mongodb.com/try/download/community)
* [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools) pour restaurer un dump de la base de données

### Backend
Dans le dossier backend renommer le fichier `.env.example` en `.env`. Éditer `DATABASE_URI` si la configuration locale est différente de la configuration par défaut.

Si besoin restaurer la base de données en exécutant `mongorestore <chemin du dossier dump>`.

Depuis le dossier backend dans un terminal exécuter `npm install` pour installer les dépendances puis `npm start` pour démarrer le serveur.

### Frontend
Depuis le dossier frontend dans un terminal exécuter `npm install` puis `npm start`.