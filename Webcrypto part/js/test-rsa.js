var handle_error = function (error) {
  console.log("Error:");
  console.log(error);  
};

var keyGenerate1;
var keyGenerate2;
var keyGenerate3;
var keyGenerate4;

var encryptedMsg;
var compteur = 0;

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

function startCrypto(input_content){
  var data = asciiToUint8Array(input_content);
  encryptedMsg = null;
  console.log("Data:");
  console.log(uint8ArrayToAscii(data));

  encryptData(keyGenerate1, data, "#encrypt1");

  setTimeout(function () {
    encryptData(keyGenerate2, encryptedMsg, "#encrypt2");
    setTimeout(function () {
      encryptData(keyGenerate3, encryptedMsg, "#encrypt3");
      setTimeout(function () {
        encryptData(keyGenerate4, encryptedMsg, "#encrypt4");
        setTimeout(function () {
          decryptData(keyGenerate4, encryptedMsg, "#decrypt4");
          setTimeout(function () {
            decryptData(keyGenerate3, encryptedMsg, "#decrypt3");
            setTimeout(function () {
              decryptData(keyGenerate2, encryptedMsg, "#decrypt2");
              setTimeout(function () {
                decryptData(keyGenerate1, encryptedMsg, "#decrypt1");
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

/** Generation de clés **/
function generateKeys(){
  window.crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 512, publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: {name: "SHA-1"}}, true, ["encrypt", "decrypt"]).then(function (key) {
    keyGenerate1 = key;
    console.log(keyGenerate1);
    window.crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 1024, publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: {name: "SHA-1"}}, true, ["encrypt", "decrypt"]).then(function (key2) {
      keyGenerate2 = key2;
      console.log(key2);
      window.crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: {name: "SHA-1"}}, true, ["encrypt", "decrypt"]).then(function (key3) {
        keyGenerate3 = key3;
        console.log(key3);
        window.crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 4096, publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: {name: "SHA-1"}}, true, ["encrypt", "decrypt"]).then(function (key4) {
          keyGenerate4 = key4;
          console.log(key4);
          alert("Cles generees");
        }, handle_error);
      }, handle_error);
    }, handle_error);
  }, handle_error);
}

function encryptData(key, data, jquerySelector){
  var temp;
  compteur += 1;
  window.crypto.subtle.encrypt({name: "RSA-OAEP"}, key.publicKey, data).then(function (ct1) {
    console.log("RSA-OAEP encrypt "+compteur+" :");
    temp = new Uint8Array(ct1);
    encryptedMsg = new Uint8Array(ct1);
    $( jquerySelector ).text($( jquerySelector ).text()+uint8ArrayToAscii(temp));
    //console.log(new Uint8Array(ct1));
    console.log(uint8ArrayToAscii(temp));
  }, handle_error);
  return temp;
}

function decryptData(key, data, jquerySelector){
  window.crypto.subtle.decrypt({name: "RSA-OAEP"}, key.privateKey, data).then(function (pt) {
    console.log("RSA-OAEP decrypt "+compteur+" :");
    encryptedMsg = new Uint8Array(pt);
    $( jquerySelector ).text($( jquerySelector ).text()+uint8ArrayToAscii(encryptedMsg));
    //console.log(new Uint8Array(pt));
    console.log(uint8ArrayToAscii(encryptedMsg));
    compteur -= 1;
    return pt;
  }, handle_error);
}

function clear(){
  $("#encrypt1").text("Encryption 1 : ");
  $("#encrypt2").text("Encryption 2 : ");
  $("#encrypt3").text("Encryption 3 : ");
  $("#encrypt4").text("Encryption 4 : ");
  $("#decrypt4").text("Decryption 4 : ");
  $("#decrypt3").text("Decryption 3 : ");
  $("#decrypt2").text("Decryption 2 : ");
  $("#decrypt1").text("Decryption 1 : ");
}


$( document ).ready(function() {
    generateKeys();
    $("#valid").click(function(event){
      var test = $( "#data" ).val();
      event.preventDefault();
      //window.location.hash = this.hash;
      setTimeout(function () {
        if (test == "") {
          generateKeys();
          location.reload();
        } else {
          clear();
          startCrypto(test);
        }
      }, 1000);
    });
});