# Airtame eslint configuration

[![Build Status](https://img.shields.io/travis/airtame/javascript.svg)](https://travis-ci.org/airtame/javascript) [![npm version](https://badge.fury.io/js/eslint-config-airtame.svg)](https://www.npmjs.com/package/eslint-config-airtame) [![David](https://img.shields.io/david/airtame/javascript.svg)](https://david-dm.org/airtame/javascript)

An Airtame approach to Javascript and React

This config is inspired by Airbnb's [Javascript](https://github.com/airbnb/javascript) and [React](https://github.com/airbnb/javascript/tree/master/react) styleguides with an Airtame touch and the help of [Prettier](https://github.com/prettier/prettier) for styling.


## Usage

Install as a development dependency to your project

```bash
$ yarn add --dev eslint-config-airtame
```
or

```bash
$ npm install --save-dev eslint-config-airtame
```

Then, on your `eslint` configuration file

```json
{
  "extends": "airtame"
}
```

If using prettier extension on your text editor, the following options are necessary

```
"eslintIntegration": true,
"printWidth": 100,
"trailingComma": "es5",
"singleQuote": true
```


## Rules

#### camelcase

Use camelCase when naming objects, functions, and instances.

```javascript
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

#### curly

Always use curly brackets, even when doing single line blocks.

```javascript
// bad
if (foo) foo++;

while (bar)
    baz();

if (foo) {
    baz();
} else qux();

// good
if (foo) {
    foo++;
}

while (bar) {
    baz();
}

if (foo) {
    baz();
} else {
    qux();
}
```


#### dot-notation

Use dot notation when accessing properties, unless they are variables.

```javascript
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```


#### eqeqeq

Prefer `===` and `!==` over `==` and `!=` to guarantee proper comparisons.

```javascript
// bad
if (x == 5) {
  console.log(x);
}

if (x != 5) {
  console.log(x);
}

// good
if (x === 5) {
  console.log(x);
}

if (x !== 5) {
  console.log(x);
}
```

#### [import/default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md)

Make sure that there is an `export` for every `import` in the file.

Given
```javascript
// ./foo.js
export default function () { return 42 }

// ./bar.js
export function bar() { return null }

// ./baz.js
module.exports = function () { /* ... */ }

// node_modules/some-module/index.js
exports.sharedFunction = function shared() { /* ... */ }
```
Expect
```javascript
// bad
import bar from './bar' // no default export found in ./bar
import baz from './baz' // no default export found in ./baz
```
```javascript
// good
import foo from './foo'

// assuming 'node_modules' are ignored (true by default)
import someModule from 'some-module'
```



#### [import/export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md)

Only allow valid exports.

```javascript
// bad
export default class MyClass { /*...*/ } // Multiple default exports.

function makeClass() { return new MyClass(...arguments) }

export default makeClass // Multiple default exports.
```
```javascript
// also bad
export const foo = function () { /*...*/ } // Multiple exports of name 'foo'.

function bar() { /*...*/ }
export { bar as foo } // Multiple exports of name 'foo'.
```



#### [import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

Ensure all imports appear before any other statements.

```javascript
// bad
import foo from './foo'

// some module-level initializer
initWith(foo)

import bar from './bar'
```

```javascript
// good
import foo from './foo'
import bar from './bar'

// some module-level initializer
initWith(foo)
```



#### [import/no-unresolved](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md)

Ensures an imported module can be resolved to a module. This includes CommonJS and AMD modules.



#### [import/named](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md)

Ensure named imports correspond to a named export in the remote file.

Given
```javascript
// ./foo.js
export const foo = "I'm so foo"
```
Expect
```javascript
// bad
// ./baz.js
import { notFoo } from './foo'
```
```javascript
// good
import { foo } from './foo'
```




#### [import/namespace](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md)

Ensure named imports correspond to a named export in the remote file.


Given
```javascript
// @module ./named-exports
export const a = 1
const b = 2
export { b }

const c = 3
export { c as d }

export class ExportedClass { }
```
and
```javascript
// @module ./deep
export const e = "MC2"
```
Expect
```javascript
// good
// @module ./foo
import * as names from './named-exports'

function great() {
  return names.a + names.b  // so great https://youtu.be/ei7mb8UxEl8
}

function notGreat() {
  doSomethingWith(names.c) // Reported: 'c' not found in imported namespace 'names'.

  const { a, b, c } = names // also reported, only for 'c'
}

// also tunnels through re-exported namespaces!
function deepTrouble() {
  doSomethingWith(names.deep.e) // fine
  doSomethingWith(names.deep.f) // Reported: 'f' not found in deeply imported namespace 'names.deep'.
}
```



#### [import/no-mutable-exports](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)

Forbid the use of mutable exports with `var` or `let`.

```javascript
// bad
export let count = 2
export var count = 3

let count = 4
export { count }

// good
export const count = 1
export function getCount() {}
export class Counter {}
```



#### [import/no-webpack-loader-syntax](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)

Forbid Webpack loader syntax in imports to avoid dependency on a bundler.

```javascript
// bad
import myModule from 'my-loader!my-module';
import theme from 'style!css!./theme.css';

var myModule = require('my-loader!./my-module');
var theme = require('style!css!./theme.css');

// good
import myModule from 'my-module';
import theme from './theme.css';

var myModule = require('my-module');
var theme = require('./theme.css');
```



#### [import/prefer-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

Prefer a default export if module exports a single name

```javascript
// bad.js

// There is only a single module export and it's a named export.
export const foo = 'foo';
```

```javascript
// good1.js

// There is a default export.
export const foo = 'foo';
const bar = 'bar';
export default 'bar';
```
```javascript
// good2.js

// There is more than one named export in the module.
export const foo = 'foo';
export const bar = 'bar';
```
```javascript
// good3.js

// There is more than one named export in the module
const foo = 'foo';
const bar = 'bar';
export { foo, bar }
```
```javascript
// good4.js

// There is a default export.
const foo = 'foo';
export { foo as default }
```
```javascript
// export-star.js

// Any batch export will disable this rule. The remote module is not inspected.
export * from './other-module'
```

#### [jsx-a11y/aria-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

```javascript
// bad
<div role="datepicker"></div>
<div role="range"></div>
<div role=""></div>

// good
<div role="button"></div>
<div role={role}></div>
<div></div>
```

#### [jsx-a11y/alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

Make sure all images have the `alt` prop

```
// bad
<img {...props} />

// good
<img alt="Airtame logo" {...props} />
```


#### [jsx-a11y/img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

Make sure `alt` props don't contain image or picture as part of it, as screen readers already call this out.

```javascript
// bad
<img src="foo" alt="Photo of foo being weird." />

// good
<img src="foo" alt="Foo eating a sandwich." />
```


#### [jsx-a11y/no-access-key](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

Do not use the `accessKey` prop.

> Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

```javascript
// bad
<div accessKey="h" />

// good
<div />
```

#### max-len

Each line of code should be no longer than 100 characters


#### new-cap

Only use PascalCase to name classes or constructors

```javascript
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```

#### no-alert

Alerts are thrown as warnings to allow debugging. Make sure to remove before deployment.


#### no-array-constructor

Use literal syntax for array creation.

```javascript
// bad
const items = new Array();

// good
const items = [];
```


#### no-case-declarations

Use braces to create blocks in case and default clauses that contain lexical declarations (e.g. `let`, `const`, `function`, and `class`).

> Why? Lexical declarations are visible in the entire switch block but only get initialized when assigned, which only happens when its case is reached. This causes problems when multiple case clauses attempt to define the same thing.

```javascript
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```
#### no-cond-assign

Prevent variable assignments in conditions

```javascript
// bad
if (foo = 5) {
  // stuff
}
```


#### no-confusing-arrow

Avoid confusing arrow function syntax (`=>`) with comparison operators (`<=`, `>=`).

```javascript
// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};
```


#### no-console

Console logs are thrown as warnings to allow debugging. Make sure to remove before deployment.


#### no-dupe-class-members

Avoid duplicate class members.

> Why? Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug.

```javascript
// bad
class Foo {
  bar() { return 1; }
  bar() { return 2; }
}

// good
class Foo {
  bar() { return 1; }
}

// good
class Foo {
  bar() { return 2; }
}
```


#### no-duplicate-imports

Only import a path once per file

> Why? Having multiple lines that import from the same path can make code harder to maintain.

```javascript
// bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo, {
  named1,
  named2,
} from 'foo';
```


#### no-empty

Do not write empty blocks of code

```javascript
// bad

if (foo) {
}

while (foo) {
}

switch(foo) {
}

try {
    doSomething();
} catch(ex) {

} finally {

}

// good
if (foo) {
    // empty
}
```

#### no-iterator

Do not use iterators like `for-in` and `for-of`

> Why? This enforces the immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.

```javascript
// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach(num => sum += num);
sum === 15;
```


#### no-loop-func

Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead.

> Why? Browsers will allow you to do it, but they all interpret it differently.

```javascript
// bad
for (var i=10; i; i--) {
    (function() { return i; })();
}

// good
var a = function() {};

for (var i=10; i; i--) {
    a();
}
```


#### no-multiple-empty-lines

Do not add more empty lines than needed

```javascript
// bad
var foo = 5;



var bar = 3;

// good
var biz = 2;

function foo() {
  ...
}
```


#### no-multi-spaces

Do not use more than one space between identifiers unless it's for indentation

```javascript
// bad
if(foo  === "bar") {}


// good
if (foo === "bar") {}
```



#### no-nested-ternary

Ternaries should not be nested and generally be single line expressions, unless it's inside JSX

```javascript
// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// better
const maybeNull = value1 > value2 ? 'baz' : null;

const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const maybeNull = value1 > value2 ? 'baz' : null;

const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
```



#### no-new-func

Never use the Function constructor to create a new function.

> Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

```javascript
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');

// good
const multiply = function(a, b) { return a * b };
```



#### no-new-object

Use the literal object syntax for object creation

```javascript
// bad
const item = new Object();

// good
const item = {};
```



#### no-param-reassign

Do not reasign the value of you're parameters. This usually means you're creating some unwanted behavior

```javascript
// bad
function foo(bar) {
  bar = bar * 5;
  return bar;
}

// good
function foo(bar) {
  return bar * 5;
}
```



#### no-plusplus

Avoid using `++` and `--`

> Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in your programs.

```javascript
// bad
a++;

// good
a += 1;
```



#### no-restricted-syntax

See [`no-iterator`](#no-iterator)



#### no-throw-literal

Only throw valid errors as part of a `throw`.

```javascript
// bad
throw "error";

throw 0;

throw undefined;

throw null;

// good
throw new Error();

throw new Error("error");
```


#### no-undef

Make sure all variables are defined. Use `let` or `const` to define your variables.

```javascript
// bad
a = 5;

// good
let b = 5;
const x = 10;
```


#### no-unneeded-ternary

Only used a ternary when it's necessary and not for implicit conditions

```javascript
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```


#### no-unused-vars

All declared variables must be used. Otherwise the variable shouldn't exist;

```javascript
// bad
var x = 5;
...

// good
var y = 5;
myFunctionCall(y);
```



#### no-useless-constructor

Classes have a default constructor if one is not specified, which means an empty constructor is not necessary

```javascript
// bad
class Jedi {
  constructor() {}

  getName() {
    return this.name;
  }
}

// bad
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
  }
}

// good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = 'Rey';
  }
}
```



#### no-useless-escape

Only escape characters that need to be escaped

> Why? Backslashes harm readability, thus they should only be present when necessary.

```javascript
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```



#### no-var

Never use `var`. Use `let` or `const` instead.

> Why? `let` is block-scoped rather than function-scoped like `var`.

```javascript
// bad
var x = 5;

// good
let y = 5;
```


#### object-shorthand

Use object shorthand notation when possible.

```javascript
// bad
function foo(bar) {
  let awesome = bar;
  return {
    awesome: awesome
  }
}

// good
function biz(bar) {
  let awesome = bar;
  return {awesome};
}
```


#### one-var

Declare each variable individually

> Why? Readability

```javascript
// bad
var foo, bar, biz;

// good;
let foo;
let bar;
let biz;
```


#### prefer-arrow-callback

User arrow functions for your callbacks

> Why? It creates a version of the function that executes in the context of `this,` which is usually what you want, and is a more concise syntax.

```javascript
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```


#### prefer-const

If your variable is never reassigned, use `const` instead of `let`



#### prefer-rest-params

Never use `arguments`, opt to use rest syntax `...` instead

> Why? `...` is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like `arguments`.

```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```



#### prefer-spread

Prefer the use of the spread operator `...` to call variadic functions.

```javascript
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);
```



#### prefer-template

Use template strings instead of doing string concatenation

```javascript
let age = 10;

// bad
const greeting = 'Mary is ' + age + ' years old';

// good
const greeting2 = `Tim is also ${age} years old`;
```


#### radix

Always set the radix when using `parseInt()`

```javascript
// bad
var num = parseInt("071");      // 57

// good
var num = parseInt("071", 10);  // 71
```



#### [react/jsx-boolean-value](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

Do not set explicit value for boolean JSX attributes.

```javascript
// bad
<Component disabled={true} />

// good
<Component disabled />
```


#### [react/jsx-no-bind](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

Never use bind in the `render` function. Arrow functions are allowed.

```javascript
// bad
render() {
  return (
    <Component onClick={this.myMethod.bind(this)} />
  );
}

// good
constructor() {
  super();

  this.myMethod = this.myMethod.bind(this);
}

render() {
  return (
    <div>
      <Component onClick={this.myMethod} />
      <Component onClick={(evt) => { this.myMethod(evt) }} />
    </div>
  );
}
```



#### [react/jsx-pascal-case](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

Use pascal case for your component names

```javascript
// bad
class myComponent extends React.Component {
  ...
}

// good
class MyComponent extends React.Component {

}
```


#### [react/jsx-tag-spacing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

Always use a space before a self closing tag.

```javascript
// bad
<Component/>

// good
<Component />
```


#### [react/jsx-uses-react](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md)

Prevents React from being marked as unused



#### [react/jsx-uses-vars](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md)

Prevent variables used in JSX to be incorrectly marked as unused



#### [react/no-is-mounted](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

Prevents the use of the isMounted lifecycle method

> Why? [isMounted is an anti-pattern](https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html), is not available when using ES6 classes, and is on its way to being officially deprecated.


#### [react/no-multi-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless)

Write only one React component per file, unless they are Stateless components



#### [react/no-string-refs](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

Always use ref callbacks

> Why? String callbacks will be deprecated in future versions of React

```javascript
// bad
var Hello = React.createClass({
 render: function() {
  return <div ref="hello">Hello, world.</div>;
 }
});

// good
class Hello extends React.Component {
  constructor() {

  super();
    var component = this.hello;
  }

  myMethod() {
    // ...do something with component
  }

  render() {
    return <div ref={(c) => { this.hello = c; }}>Hello, world.</div>;
  }
}
```


#### [react/prefer-es6-class](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md)

Write react components using ES6 Class vs `React.createClass`

```javascript
// bad
const Listing = React.createClass({
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
});

// good
class Listing extends React.Component {
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
}
```

#### [react/prefer-stateless-function](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

Use stateless functions when possibles

```javascript
// bad
class ComponentThatOnlyRenders extends React.Component {
  render() {
    return (
      <div className={this.props.className}>Hello World</div>
    )
  }
}

// good
const ComponentThatOnlyRenders = function(props) {
  return (
    <div className={props.className}>Hello World</div>
  );
}
```



#### [react/require-render-return](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

Always return a value in the `render` function

```javascript
// bad
render() {
  (<div />);
}

// good
render() {
  return (<div />);
}
```



#### [react/self-closing-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

Always self close Components that have no children

```javascript
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />
```


#### require-jsdoc

Always include JSDoc documentation for all your methods and functions

```javascript
// bad
function add(a, b) {
  return a + b;
}

// good

/**
 * Multiplies to values
 * @param  {number} a The first number to be multiplied
 * @param  {number} b The second number to be multiplied
 * @return {number}   The result of the multiplication
 */
function multiply(a, b) {
  return a * b;
}
```


#### spaced-comment

Always add a space after your comments

> Why? Readability

```javascript
// bad

//my comment
/*my comment*/

// good
// My comment
/**
 * My block comment
 */

/******************************
 *   A pretty block comment   *
 ******************************/
```


#### valid-jsdoc

Ensure your JSDoc is valid and all parameters and your return are documented

```javascript
// bad
function foo (bar, biz) {
  var y;
  // do stuff
  return y;
}

/**
 * This is function foo
 */
function foo (bar, biz) {
  var y;
  // do stuff
  return y;
}

/**
 * This is function foo
 * @param {number} foo - Only one parameter explained and no return is bad
 */
function foo (bar, biz) {
  var y;
  // do stuff
  return y;
}

// good

/**
 * This is function foo
 * @param  {number} foo - description of first param
 * @param  {number} bar - description of second param
 * @return {number} Description of the return
 */
function foo (bar, biz) {
  var y;
  // do stuff
  return y;
}
```