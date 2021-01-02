import * as crypto from "crypto";

function secret(){
	return crypto.randomBytes(16).toString("hex");
}

function iv() {
	return crypto.randomBytes(16).toString("hex");
}

function hash(text, secret) {
	const hmac = crypto.createHmac("sha256", secret);

	return hmac.update(text).digest('hex');
}

function encrypt(text, secret, iv) {
	const cipher = crypto.createCipheriv('aes-256-ctr', secret, Buffer.from(iv, "hex"));
        
	cipher.update(text);
	
	return cipher.final("hex");
}

function decrypt(text, secret, iv) {
	const decipher = crypto.createDecipheriv('aes-256-ctr', secret, Buffer.from(iv, "hex"));
        
	decipher.update(text, "hex", "utf8");

	return decipher.final("utf8");
}

let $secret = secret();
let $iv = iv();

let password = "teste";

let encrypted = encrypt(password, $secret, $iv);
let decrypted = decrypt(password, $secret, $iv);

console.log(encrypted);
console.log(decrypted);