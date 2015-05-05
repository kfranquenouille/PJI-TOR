exports.recognizedKeyUsageValues = ["encrypt", "decrypt", "sign", "verify", "deriveKey", "deriveBits", "wrapKey", "unwrapKey"];
exports.recognizedKeyFormatValues = ["raw", "pkcs8", "spki", "jwk"];
exports.encryptalgos = ["RSAES-PKCS1-v1_5", "RSA-OAEP", "AES-CTR", "AES-CBC", "AES-GCM", "AES-CFB"];
exports.decryptalgos = ["RSAES-PKCS1-v1_5", "RSA-OAEP", "AES-CTR", "AES-CBC", "AES-GCM", "AES-CFB"];
exports.signalgos = ["RSASSA-PKCS1-v1_5", "RSA-PSS","ECDSA", "AES-CMAC","HMAC"];
exports.verifyalgos = ["RSASSA-PKCS1-v1_5", "RSA-PSS", "ECDSA", "AES-CMAC", "HMAC"];
exports.generateKeyalgos = ["RSAES-PKCS1-v1_5", "RSASSA-PKCS1-v1_5", "RSA-PSS", "RSA-OAEP", "ECDSA", "ECDH", "AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "HMAC", "DH"];
exports.importKeyalgos = ["RSAES-PKCS1-v1_5", "RSASSA-PKCS1-v1_5", "RSA-PSS", "RSA-OAEP", "ECDSA", "ECDH", "AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "HMAC", "DH"];
exports.exportKeyalgos = ["RSAES-PKCS1-v1_5", "RSASSA-PKCS1-v1_5", "RSA-PSS", "RSA-OAEP", "ECDSA", "ECDH", "AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "HMAC", "DH"];
exports.digestalgos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
exports.deriveKeyalgos = ["ECDH", "DH", "CONCAT", "HKDF-CTR", "PBKDF2"];
exports.wrapKeyalgos = ["RSAES-PKCS1-v1_5", "RSA-OAEP", "AES-CTR", "AES-CBC", "AES-GCM", "AES-CFB", "AES-KW"];
exports.unwrapKeyalgos = ["RSAES-PKCS1-v1_5", "RSA-OAEP", "AES-CTR", "AES-CBC", "AES-GCM", "AES-CFB", "AES-KW"];