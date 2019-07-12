/// <reference lib="es2015.proxy" />



export function bind <T extends object> (origin: T) {

    return new Proxy(origin, {

        get <K extends keyof T> (target: T, propKey: K) {

            const property = target[propKey];

            if (typeof property === 'function') {
                return property.bind(target);
            }

            return property;

        },

    });

}



export { bind as bond }

