// const crypto = require('crypto');

// // Key and IV (Initialization Vector)
// const secretKey = crypto.randomBytes(32); // 256-bit key
// const iv = crypto.randomBytes(16); // 16-byte IV

// // Encrypt Function
// function encryptData(data) {
//    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
//    let encrypted = cipher.update(data, 'utf-8', 'hex');
//    encrypted += cipher.final('hex');
//    return { iv: iv.toString('hex'), encryptedData: encrypted };
// }

// // Decrypt Function
// function decryptData(encryptedData, iv) {
//    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, Buffer.from(iv, 'hex'));
//    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
//    decrypted += decipher.final('utf-8');
//    return decrypted;
// }

// // Example Usage
// const data = "Hello333333, Nandan! This is secret data.";

// const encrypted = encryptData(data);
// console.log("Encrypted:", encrypted);

// const decrypted = decryptData(encrypted.encryptedData, encrypted.iv);
// console.log("Decrypted:", decrypted);

const crypto = require('crypto');

// Hash Function
function createHash(data) {
   return crypto.createHash('sha256').update(data).digest('hex');
}

// Simulate Storing a Hashed Password
const password = "NandanSecret123";
const hashedPassword = createHash(password);
console.log("Stored Hashed Password:", hashedPassword);

// Verifying the Password
function verifyPassword(inputPassword, storedHash) {
   const inputHash = createHash(inputPassword);
   return inputHash === storedHash;  // Compare hashes
}


// Example Verification
const isMatch = verifyPassword("NandanSecret123", hashedPassword);
console.log("Password Match:", isMatch);  // true or false
