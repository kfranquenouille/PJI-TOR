# TOR architecture on web browser
## Presentation (in french)
	Tor est un projet pour le support de l'anonymat en dissimulant les communications entre un client web et un serveur. Le mécanisme s'appuie sur un ensemble de relais de confiance disposés sur des serveurs. 
	
	Le nombre limité de relais (moins de 5000) et la confiance dans leur non-compromission peut être considéré comme une limitation de l'approche de Tor. Un moyen d'outrepasser cette limitation serait de limiter le rôle du serveur a un simple relais et de laisser les clients gérer l'anonymat dans le système. Afin de rendre le système le plus pratique et adoptable pour multiplier les chemins possibles, une idée serait de ne s'appuyer que sur des technologies webs (http, javascript) pour que chaque navigateur puisse devenir un client.
	
	Le but de ce projet est d'étudier la faisabilité de l'approche à l'aide de technologie comme websocket. Le cas d'étude sera limité à un simple chat (saisie limitée à 140 caractères).
	
	Technologies étudiées: websocket api, web crypto api, PHP.

## Code
*coming soon*

## Test project
### Websocket NodeJS part
1. Download and install nodejs 

2. Go to the Websocket NodeJS part folder

3. Type : npm install (to install dependencies)

4. Type : node server.js (to launch server)

5. open index.html in your favourite browser and enjoy !
### Websocket PHP part
Running Server :

1. Change host address in index.html and server.php

2. Go to your shell command-line interface

3. type: 
	php -q /path/to/server.php

4. Using browser, navigate to index.html location to open chat page

## Contributors
* Damien Cornette
* Kevin franquenouille