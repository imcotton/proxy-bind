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

        expect(promise.then).toThrowError(TypeError);

    });

    test('instance Set', () => {

        const set = new Set([ 1, 2, 3 ]);
        const setP = bind(set);

        const { size, has, add } = setP;

        expect(size).toEqual(3);
        expect(has(1)).toEqual(set.has(1));
        expect(() => add(9)).not.toThrow();
        expect(set.size).toEqual(4);

        expect(set.clear).toThrowError(TypeError);

    });

    test('instance Array', () => {

        const arr = [ 1, 2, 3 ];
        const arrP = bind(arr);

        const { push } = arrP;

        expect(arrP.length).toEqual(arr.length);
        expect(push(4)).toEqual(arr.length);

        expect(arr.pop).toThrowError(TypeError);

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

        expect(shape.draw).toThrowError(TypeError);

    });

    test('instance inherited Class', () => {

        class User {

            protected role = 'normal';

            getRole () {
                return this.role;
            }

        }

        class SuperUser extends User {

            protected role = 'admin';

        }

        const admin = new SuperUser();

        const { getRole } = bind(admin);

        expect(getRole).not.toThrow();
        expect(admin.getRole).toThrowError(TypeError);

        expect(getRole()).toEqual('admin');

    });

    test('instance bond Class', () => {

        class Shape {

            readonly name = 'raw';

            constructor () {
                return bind(this);
            }

            draw () {
                return `->${ this.name }<-`;
            }

        }

        const { draw, name } = new Shape();

        expect(name).toEqual('raw');
        expect(draw).not.toThrow();

    });

});

