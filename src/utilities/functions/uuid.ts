import { parse, stringify } from "uuid";

class UUID {

    binToUuid(binary: any): string {
        return stringify(binary);
    }

    uuidToBin(uuid: string): any {
        return parse(uuid);
    }
    
}

const uuid = new UUID();

export { uuid };