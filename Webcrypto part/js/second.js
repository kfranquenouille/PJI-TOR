var handle_error = function (error) {
  console.log("Error:");
  console.log(error);  
};

function asciiToUint8Array(str)
{
  var chars = [];
  for (var i = 0; i < str.length; ++i)
    chars.push(str.charCodeAt(i));
  return new Uint8Array(chars);
}

function uint8ArrayToAscii(tab)
{
  var string = "Result: ";
  for (var i = 0; i < tab.length; i++){
    string += String.fromCharCode(tab[i]);
  }
  return string;
    
}

window.crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: {name: "SHA-256"}}, true, ["encrypt", "decrypt"]).then(function (key) {
  var data = asciiToUint8Array("ceci est un test");
  console.log("Data:");
  console.log(uint8ArrayToAscii(data));
  console.log("Public Key");
  console.log(key.publicKey);
  console.log("Private Key");
  console.log(key.privateKey);

  window.crypto.subtle.encrypt({name: "RSA-OAEP"}, key.publicKey, data).then(function (encrypted) {
    console.log(uint8ArrayToAscii(new Uint8Array(encrypted)));

    window.crypto.subtle.decrypt({name: "RSA-OAEP"}, key.privateKey, encrypted).then(function (decrypted) {
      console.log(uint8ArrayToAscii(new Uint8Array(decrypted)));
    }, handle_error);
  }, handle_error);
}, handle_error);