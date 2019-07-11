/// <reference lib="es2015.proxy" />



export function bind <T extends object> (origin: T) {

    return new Proxy(origin, {

        get (target, propKey) {

            const property = (target as any)[propKey];

            if (typeof property === 'function') {
                return property.bind(target);
            }

            return property;

        },

    });

}



export { bind as bond }

