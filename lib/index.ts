/// <reference lib="es2015.proxy" />
/// <reference lib="es2015.reflect" />



export function bind <T extends object> (origin: T): T {

    const proxy = new Proxy(origin, {

        get <K extends keyof T> (target: T, propKey: K, receiver: any) {

            if (receiver === proxy) {
                receiver = target;
            }

            const property = Reflect.get(target, propKey, receiver) as unknown;

            if (typeof property === 'function') {
                return property.bind(receiver);
            }

            return property;

        },

    });

    return proxy;

}



export function mirror <T extends object> (origin: T): readonly [ T, T ] {
    return [ origin, bind(origin) ] as const;
}



export { bind as bond }

