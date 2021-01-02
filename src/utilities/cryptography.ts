import * as crypto from "crypto";

class Cryptography {

    constructor() {
    }

    public secret(): string {
        return crypto.randomBytes(16).toString("hex");
    }

    public iv(): string {
        return crypto.randomBytes(16).toString("hex");
    }

    public hash(text: string, secret: string): string {
        const hmac = crypto.createHmac("sha256", secret);

        return hmac.update(text).digest('hex');
    }

    public encrypt(text: string, secret: string, iv: string): string {
        const cipher = crypto.createCipheriv('aes-256-ctr', secret, Buffer.from(iv, "hex"));
        
        cipher.update(text, "utf8", "hex");

        return cipher.final("hex");
    }

    public decrypt(text: string, secret: string, iv: string): string {
        const decipher = crypto.createDecipheriv('aes-256-ctr', secret, Buffer.from(iv, "hex"));
        
        decipher.update(text, "hex", "utf8");

        return decipher.final("utf8");
    }
}

const cryptography = new Cryptography();

export { cryptography };