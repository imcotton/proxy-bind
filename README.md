# proxy-bind

[![npm version](https://badgen.net/npm/v/proxy-bind)](https://www.npmjs.com/package/proxy-bind)
[![actions](https://github.com/imcotton/proxy-bind/workflows/Check/badge.svg)](https://github.com/imcotton/proxy-bind/actions)
[![codecov](https://codecov.io/gh/imcotton/proxy-bind/branch/master/graph/badge.svg)](https://codecov.io/gh/imcotton/proxy-bind)



## tl;dr

from

```javascript
const fn = foobar.fn.bind(foobar);
```

to

```javascript
const { fn } = bind(foobar);
```



## Install

    npm install proxy-bind



## Import

    import { bind, bond } from 'proxy-bind';

.

    import { bind, bond } from 'https://deno.land/x/proxy_bind/mod.ts';

.

    const { bind, bond } = require('proxy-bind');

or

```html
<script type="module">
    import { bind, bond } from 'https://cdn.jsdelivr.net/npm/proxy-bind@1.x/index.mjs';
</script>
```
.
```html
<script type="javascript">
    (async () => {
        const { bind, bond } = await import('https://cdn.jsdelivr.net/npm/proxy-bind@1.x/index.mjs');
    })();
</script>
```

> the `bond` is only an alias to avoid naming conflict, just in case.



## Example

"point-free" ish

```javascript
import { bind } from 'proxy-bind';

const { push, join } = bind([ 1, 2, 3 ]);

push(4);

console.log(join('-'));  // 1-2-3-4
```

```javascript
import { bind } from 'proxy-bind';

const { resolve } = bind(Promise);

console.log(await resolve(42));  // 42
console.log(await resolve('foobar'));  // foobar
```

bind `this`

```javascript
import { bind } from 'proxy-bind';

const me = {

    name: 'foo',

    greet (you) {
        return `Hi ${ you }, this is ${ this.name }.`;
    },

};

const { greet } = bind(me);

console.log(greet('bar'));  // Hi bar, this is foo.
```

`mirror` helper

```javascript
import { mirror } from 'proxy-bind';

const [ list, { push } ] = mirror([ 1, 2, 3 ]);

push(4);

console.log(list);  // [1, 2, 3, 4]
```



## Methodology

It uses ES6 `Proxy` to bridge function calls via `Function.prototype.bind`.



## Caveat

- Doesn't work on primitive types:
  - don't `bind(5)`
  - do `bind(new Number(5))`



## License

the MIT

