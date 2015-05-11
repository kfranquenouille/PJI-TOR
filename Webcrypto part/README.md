#Webcrypto part

Dans cette partie, il n'y a que la cryptographie utilisant Web Cryptographie API.

###Comment tester ?
Il suffit de lancer _index.html_. Par défaut, on utilise la cryptographie RSA-OAEP. Pour tester avec AES-CBC, il suffit de remplacer dans le code html de la page d'index, la ligne suivante : 
`<script type="text/javascript" src="js/test-rsa.js"></script>`
par celle-ci : 
`<script type="text/javascript" src="js/test-cbc.js"></script>`

Puis tester à nouveau en rentrant un message dans le champs et vous pouvez également consulter la console web.

Les 2 autres fichiers Javascript, sont juste présent afin de montrer comment nous avons procédé pour en arriver à l'état actuel.
