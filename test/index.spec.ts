import { bind, bond } from '../lib';





describe('proxy-bind', () => {

    test('imports', () => {
        expect(bind).toBeDefined();
        expect(bond).toBeDefined();
        expect(bind).toBe(bond);
    });

    test('static Math', () => {

        const M = bind(Math);

        expect(M.PI).toBe(Math.PI);
        expect(M.pow(5, 2)).toBe(Math.pow(5, 2));

    });

    test('static Promise', async () => {

        const { resolve } = bind(Promise);
        expect(await resolve(42)).toBe(42);

    });

    test('instance Promise', async () => {

        const cb = jest.fn();
        const promise = Promise.resolve(42);
        const { then } = bind(promise);

        await then(cb);

        expect(cb).toBeCalledWith(42);

        const thenFn = promise.then;

        expect(() => thenFn()).toThrowError(TypeError);

    });

    test('instance Set', () => {

        const set = new Set([ 1, 2, 3 ]);
        const setP = bind(set);

        const { size, has, add } = setP;

        expect(size).toEqual(3);
        expect(has(1)).toEqual(set.has(1));
        expect(() => add(9)).not.toThrow();
        expect(set.size).toEqual(4);

        const clear = set.clear;

        expect(() => clear()).toThrowError(TypeError);

    });

    test('instance Array', () => {

        const arr = [ 1, 2, 3 ];
        const arrP = bind(arr);

        const { push } = arrP;

        expect(arrP.length).toEqual(arr.length);
        expect(push(4)).toEqual(arr.length);

        const pop = arr.pop;

        expect(() => pop()).toThrowError(TypeError);

    });

    test('instance Class', () => {

        class Shape {

            readonly name = 'raw';

            draw () {
                return `->${ this.name }<-`;
            }

        }

        const shape = new Shape();
        const shapeP = bind(shape);

        expect(shape.name).toBe(shapeP.name);
        expect(shape.draw()).toEqual(shapeP.draw());

        const drawB = shape.draw.bind(shape);
        const { draw: drawP } = shapeP;

        expect(drawB()).toEqual(drawP());

        const draw = shape.draw;

        expect(() => draw()).toThrowError(TypeError);

    });

});

