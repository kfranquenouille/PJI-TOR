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

function startCrypto(input_content){
  window.crypto.subtle.generateKey({name: "aes-cbc", length: 128}, true, ["encrypt", "decrypt"]).then(function (key1) {
    var data = asciiToUint8Array(input_content);
    console.log("Data:");
    console.log(uint8ArrayToAscii(data));
    var algorithm = key1.algorithm;
    algorithm.iv = window.crypto.getRandomValues(new Uint8Array(16));

    window.crypto.subtle.generateKey({name: "aes-cbc", length: 128}, true, ["encrypt", "decrypt"]).then(function (key2) {
      var algorithm = key2.algorithm;
      algorithm.iv = window.crypto.getRandomValues(new Uint8Array(16));

      window.crypto.subtle.generateKey({name: "aes-cbc", length: 128}, true, ["encrypt", "decrypt"]).then(function (key3) {
        var algorithm = key3.algorithm;
        algorithm.iv = window.crypto.getRandomValues(new Uint8Array(16));

        window.crypto.subtle.generateKey({name: "aes-cbc", length: 128}, true, ["encrypt", "decrypt"]).then(function (key4) {
          var algorithm = key4.algorithm;
          algorithm.iv = window.crypto.getRandomValues(new Uint8Array(16));

          window.crypto.subtle.encrypt(algorithm, key1, data).then(function (ct1) {
            console.log("AES-CBC encrypt 1:");
            $( "#encrypt1" ).text($( "#encrypt1" ).text()+uint8ArrayToAscii(new Uint8Array(ct1)));
            //console.log(new Uint8Array(ct1));
            console.log(uint8ArrayToAscii(new Uint8Array(ct1)));

            window.crypto.subtle.encrypt(algorithm, key2, new Uint8Array(ct1)).then(function (ct2) {
              console.log("AES-CBC encrypt 2:");
              $( "#encrypt2" ).text($( "#encrypt2" ).text()+uint8ArrayToAscii(new Uint8Array(ct2)));
              //console.log(new Uint8Array(ct2));
              console.log(uint8ArrayToAscii(new Uint8Array(ct2)));

              window.crypto.subtle.encrypt(algorithm, key3, new Uint8Array(ct2)).then(function (ct3) {
                console.log("AES-CBC encrypt 3:");
                $( "#encrypt3" ).text($( "#encrypt3" ).text()+uint8ArrayToAscii(new Uint8Array(ct3)));
                //console.log(new Uint8Array(ct3));
                console.log(uint8ArrayToAscii(new Uint8Array(ct3)));

                window.crypto.subtle.encrypt(algorithm, key4, new Uint8Array(ct3)).then(function (ct4) {
                  console.log("AES-CBC encrypt 4:");
                  $( "#encrypt4" ).text($( "#encrypt4" ).text()+uint8ArrayToAscii(new Uint8Array(ct4)));
                  //console.log(new Uint8Array(ct4));
                  console.log(uint8ArrayToAscii(new Uint8Array(ct4)));

                  window.crypto.subtle.decrypt(algorithm, key4, ct4).then(function (pt4) {
                    console.log("AES-CBC decrypt 4:");
                    $( "#decrypt4" ).text($( "#decrypt4" ).text()+uint8ArrayToAscii(new Uint8Array(pt4)));
                    //console.log(new Uint8Array(pt4));
                    console.log(uint8ArrayToAscii(new Uint8Array(pt4)));

                    window.crypto.subtle.decrypt(algorithm, key3, pt4).then(function (pt3) {
                      console.log("AES-CBC decrypt 3:");
                      $( "#decrypt3" ).text($( "#decrypt3" ).text()+uint8ArrayToAscii(new Uint8Array(pt3)));
                      //console.log(new Uint8Array(pt3));
                      console.log(uint8ArrayToAscii(new Uint8Array(pt3)));

                      window.crypto.subtle.decrypt(algorithm, key2, pt3).then(function (pt2) {
                        console.log("AES-CBC decrypt 2:");
                        $( "#decrypt2" ).text($( "#decrypt2" ).text()+uint8ArrayToAscii(new Uint8Array(pt2)));
                        //.log(new Uint8Array(pt2));
                        console.log(uint8ArrayToAscii(new Uint8Array(pt2)));

                        window.crypto.subtle.decrypt(algorithm, key1, pt2).then(function (pt) {
                          console.log("AES-CBC decrypt 1:");
                          $( "#decrypt1" ).text($( "#decrypt1" ).text()+uint8ArrayToAscii(new Uint8Array(pt)));
                          //console.log(new Uint8Array(pt));
                          console.log(uint8ArrayToAscii(new Uint8Array(pt)));
                        }, handle_error);
                      }, handle_error);
                    }, handle_error);
                  }, handle_error);
                }, handle_error);
              }, handle_error);
            }, handle_error);
          }, handle_error);
        }, handle_error);
      }, handle_error);
    }, handle_error);
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
    $("#valid").click(function(event){
      var test = $( "#data" ).val();
      event.preventDefault();
      //window.location.hash = this.hash;
      if (test == "") {
        location.reload();
      } else {
        clear();
        startCrypto(test);
      }
    });
});