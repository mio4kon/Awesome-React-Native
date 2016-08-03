/**
 * Created by mio4kon on 16/8/2.
 * const
 */

'use strict'

const i = {};

i.a = 100;

console.log(i.a);

// i = {}; // Assignment to constant variable.

/**
 * 'use strict' error
 */

// const  foo = Object.freeze({});
// foo.prop  = 123;
// console.log(foo.prop);