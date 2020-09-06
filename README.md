# RecordsApp

Records app is a ``Node``, ``ReST``, ``JavaScript``, ``Hapi JS``, ``MongoDB`` and ``Handlebars`` based app used to display a basic CRUD operations into a locally installed database.

## Requirements to run the applciation

The application displays a list of ReST operations (GET/POST) for both the display of static files and records (fetching from the MongoDB) and also serving the static files from the file system

To run the complete application we need :

```
Node
```
```
MongoDB
```

Collection required in the database : ``Records``

## Start the application

You can use the below commands to start the appication:

```bash
node app.js
```
or simply
```bash
nodemon
```

## URLs to view different operations

``GET`` records : ``http://localhost:8000/records``

``POST`` records : ``http://localhost:8000/records``

View static content/image : ``http://localhost:8000/image``

View static content/html : ``http://localhost:8000/about``