var handle_error = function (error) {
  cnosole.log("Error:");
  console.log(err);  
};

window.crypto.subtle.digest({name: "SHA-256"}, new Uint8Array([0x01, 0x02])).then(function (hash) {
  console.log("SHA-256:");
  console.log(new Uint8Array(hash));

  window.crypto.subtle.importKey("raw", hash, {name: "AES-GCM"}, true, ["encrypt", "decrypt"]).then(function (key) {
    var data = new Uint8Array([0x01, 0x02]);
    var algorithm = key.algorithm;
    algorithm.iv = window.crypto.getRandomValues(new Uint8Array(16));

    window.crypto.subtle.encrypt(algorithm, key, data).then(function (ct) {
      console.log("AES-GCM encrypt:");
      console.log(new Uint8Array(ct));

      window.crypto.subtle.decrypt(algorithm, key, ct).then(function (pt) {
        console.log("AES-GCM decrypt:");
        console.log(new Uint8Array(pt));
      }, handle_error);
    }, handle_error);
  }, handle_error);
}, handle_error);