/*

Sources : http://blog.engelke.com/2014/06/22/symmetric-cryptography-in-the-browser-part-1/
          https://github.com/diafygi/webcrypto-examples

*/

var keyPromise = window.crypto.subtle.generateKey(
    {name: "AES-CBC", length: 128}, // Algorithm the key will be used with
    true,                           // Can extract key value to binary string
    ["encrypt", "decrypt"]          // Use for these operations
);

var aesKey;   // Global variable for saving
keyPromise.then(function(key) {aesKey = key;});
keyPromise.catch(function(err) {alert("Something went wrong: " + err.message);});

var plainTextString = "toto";
var plainTextBytes = new Uint8Array(plainTextString.length);
for (var i=0; i<plainTextString.length; i++) {
    plainTextBytes[i] = plainTextString.charCodeAt(i);
}

var iv = window.crypto.getRandomValues(new Uint8Array(16));

var cipherTextBytes;
var encryptPromise = window.crypto.subtle.encrypt(
    {name: "AES-CBC", iv: iv}, // Random data for security
    aesKey,                    // The key to use 
    plainTextBytes             // Data to encrypt
);
encryptPromise.then(function(result) {cipherTextBytes = new Uint8Array(result);});
encryptPromise.catch(function(err) {alert("Problem encrypting: " + err.message);});

/* -------------------- AUTRE FACON -------------------------

function genererCle(){
  window.crypto.subtle.generateKey(
      {
          name: "AES-CBC",
          length: 128, //can be  128, 192, or 256
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] //can be any combination of "encrypt" and "decrypt"
  )
  .then(function(key){
      //returns a key object
      console.log(key);
      return key;
  })
  .catch(function(err){
      console.error(err);
  });
}

var cle = genererCle();
var uint8 = new Uint8Array(1);
uint8[0] = 42;

window.crypto.subtle.encrypt(
    {
        name: "AES-CBC",
        //Don't re-use initialization vectors!
        //Always generate a new iv every time your encrypt!
        iv: window.crypto.getRandomValues(new Uint8Array(16)),
    },
    cle, //from generateKey or importKey above
    uint8 //ArrayBuffer of data you want to encrypt
)
.then(function(encrypted){
    //returns an ArrayBuffer containing the encrypted data
    console.log(new Uint8Array(encrypted));
})
.catch(function(err){
    console.error(err);
});


*/


