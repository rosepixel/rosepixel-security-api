export function isEmptyObject(instance: object) {
    for (var key in instance) {
        if (Object.prototype.hasOwnProperty.call(instance, key)) {
            return false;
        }
    }
    return true;
}