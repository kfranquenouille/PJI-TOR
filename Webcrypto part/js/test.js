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

window.crypto.subtle.generateKey({name: "aes-cbc", length: 128}, true, ["encrypt", "decrypt"]).then(function (key) {
  var data = asciiToUint8Array("ceci est un test");
  console.log("Data:");
  console.log("value: ceci est un test")
  console.log(data);
  var algorithm = key.algorithm;
  algorithm.iv = window.crypto.getRandomValues(new Uint8Array(16));

  window.crypto.subtle.encrypt(algorithm, key, data).then(function (ct) {
    console.log("AES-GCM encrypt:");
    console.log(new Uint8Array(ct));

    window.crypto.subtle.decrypt(algorithm, key, ct).then(function (pt) {
      console.log("AES-GCM decrypt:");
      console.log(new Uint8Array(pt));
      console.log(uint8ArrayToAscii(new Uint8Array(pt)));
    }, handle_error);
  }, handle_error);
}, handle_error);