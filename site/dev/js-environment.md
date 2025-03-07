---
outline: deep
next:
  text: Module-based extensions
  link: /dev/js-modules
titleTemplate: :title — PopClip Developer
---

# JavaScript environment

JavaScript actions and module-based extensions run inside PopClip's JavaScript
environment. This environment provides provides properties and functions that
let your scripts interact with PopClip. Scripts run in a secure JavaScript
sandbox that cannot access the filesystem.

## PopClip globals

PopClip predefines several global objects and functions in the JavaScript
environment for extensions to use. These are documented in detail in the
[JavaScript API Reference](https://pilotmoon.github.io/popclip-types/modules.html).
The following is a summary of the commonly needed parts.

### Global `popclip` object

#### Readonly Properties

Scripts can access the selected text and other input via the following readonly
properties of the
[`popclip`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html)
global:

- `popclip.input.text`: the full plain text selection
- `popclip.input.matchedText`: the part of the text matching the requirement or
  regex
- `popclip.input.regexResult`: if regex was specified, this is an array
  containing the full result of the match, including any capture groups
- `popclip.input.html`: the html backing the selection (if `capture html` is
  set)
- `popclip.input.markdown`: the markdownified html (if `capture html` is set)
- `popclip.input.data.urls`: array of detected web URLs
- `popclip.context.browserUrl`, `popclip.context.browserTitle`: browser page URL
  and title, if available.
- `popclip.modifiers.command`, `popclip.modifiers.option`,
  `popclip.modifiers.shift`, `popclip.modifiers.control`: booleans for modifier
  keys pressed
- `popclip.options`: an object with properties for each option, where the
  property name is the option's identifier. Option values can be either strings
  or booleans

#### Methods

Scripts can perform actions via calling methods on the
[`popclip`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html)
global:

- [`popclip.pasteText()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#pasteText):
  paste a given string (similar to `paste-result`)
- [`popclip.copyText()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#copyText):
  copy a string to the clipboard (similar to `copy-result`)
- [`popclip.showText()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#showText):
  show a string in the PopClip bar (similar to `show-result`)
- [`popclip.openUrl()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#openUrl):
  open a URL (similar to a URL action)
- [`popclip.pressKey()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#pressKey):
  presses a key combo (similar to a key press extension)
- [`popclip.performCommand()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#performCommand):
  perform a cut, copy or paste command in the foreground app (simlar to the
  `before` and `after` steps)
- [`popclip.showSuccess()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#showSuccess),
  [`popclip.showFailure()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#showFailure),
  [`popclip.showSettings()`](https://pilotmoon.github.io/popclip-types/interfaces/PopClip.html#showSettings):
  show a check mark, shaking-X, or Pop up the extension's settings.

### Global `pasteboard` object

Scripts can also have direct read/write access the macOS clipboard via the
[`pasteboard`](https://pilotmoon.github.io/popclip-types/interfaces/Pasteboard.html)
global:

- `pasteboard.text` - the current plain text content of the clipboard, a
  read/write property.

### Global `print()` function

There is a global function
[`print()`](https://pilotmoon.github.io/popclip-types/functions/print.html) for
debug output. You can
[view the debug output in the Console.app](./#debug-output) and also in the
[test harness](#test-harness).

## Language version and libraries

PopClip's JavaScript engine is Apple's
[JavaScriptCore](https://developer.apple.com/documentation/javascriptcore),
which is part of macOS. Language features will vary depending on the macOS
version PopClip is running on. However, you can assume availability of language
features up to at least ES2018 on all macOS versions that PopClip supports
(10.15+).

::: tip JavaScript reference

The website I use and recommend to learn about the JavaScript language, the
Standard Library and other APIs, is
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

:::

### Standard built-in objects

For the
[Standard Library](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects),
PopClip supplements the built-in JavaScript objects provided by macOS with
polyfills from [core-js](https://github.com/zloirock/core-js). This means that
you can use the latest features up to ES2023 on all macOS versions.

### Web APIs and Node globals

PopClip provides a limited subset of the standard
[Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) that are normally
available in a browser environment:

- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL),
  [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [atob](https://developer.mozilla.org/en-US/docs/Web/API/atob),
  [btoa](https://developer.mozilla.org/en-US/docs/Web/API/btoa)
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout),
  [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)
- [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)

Additionally, from the Node.js environment:

- [Buffer](https://nodejs.org/api/buffer.html#buffer)

All of the above functions and classes are accessible in the global scope.

### Bundled libraries

Some libraries from [NPM](https://www.npmjs.org/) are bundled within the PopClip
app itself, and are available to load by scripts. These are:

| Library                    | Version | Description                    |
| -------------------------- | ------- | ------------------------------ |
| axios                      | 1.6.7   | HTTP client                    |
| case-anything              | 2.1.13  | Case conversion library        |
| content-type               | 1.0.5   | Parse HTTP Content-Type header |
| dom-serializer             | 2.0.0   | HTML serializer                |
| emoji-regex                | 10.3.0  | Emoji regular expression       |
| entities                   | 4.5.0   | HTML entity encoder/decoder    |
| fast-json-stable-stringify | 2.1.0   | Stable JSON stringify          |
| htmlparser2                | 9.1.0   | HTML parser                    |
| js-yaml                    | 4.1.0   | YAML parser                    |
| linkedom                   | 0.16.8  | DOM implementation             |
| linkifyjs                  | 4.1.3   | Detect web links in text       |
| rot13-cipher               | 1.0.0   | ROT13 cipher                   |
| sanitize-html              | 2.12.1  | HTML sanitizer                 |
| turndown                   | 7.1.2   | HTML to Markdown converter     |
| typescript                 | 5.4.2   | TypeScript transpiler & tools  |

Library modules may be loaded by name, for example:

::: code-group

```javascript
const axios = require("axios");
```

```typescript
import axios from "axios";
```

:::

## Using `require()`

PopClip has a `require()` function for loading modules and JSON data from other
files. It takes a single string argument, interpreted as follows:

- If the string starts with `./` or `../`, it is interpreted as a path to a file
  in the package directory, relative the current file.
- Otherwise, the string is interpreted as a path relative to the root of the
  package directory.
- If no file is found in the package directory, the string is then checked
  against the names of the [bundled libraries](#bundled-libraries). If found,
  the library module is loaded and returned.

The return value of `require()` is the exported value of the module, or the
parsed JSON object. If the specified file or library module is not found, or an
invalid path is supplied, `undefined` is returned.

Results are cached, and subsequent calls to `require()` with the same argument
will return the same object instance that was returned the first time.

File paths beginning with `/` or using `..` to go up a directory level outside
the package directory are not valid.

TypeScript files can use `import` syntax to load modules, which will be
transpiled to `require()` calls under the hood.

### Supported file types

The `require()` function can load the following file types:

| File extension | Description                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.js`          | A JavaScript module in [CommonJS](https://www.typescriptlang.org/docs/handbook/2/modules.html#commonjs-syntax) format.                             |
| `.ts`          | A TypeScript module. TypeScript modules may use [ES Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html#es-module-syntax) syntax. |
| `.json`        | A JSON file parsed into a JavaScript object.                                                                                                       |

If no file name extension is specified, PopClip will try `.js`, `.ts`, `.json`
in order.

::: info Note on `.lzfse` files

The `require()` loader also looks for the `.js.lsfze` file extension. These are
compressed javascript files. It's how the internal modules are stored in the app
package. A couple of my published extensions also use this format but I haven't
documented it yet.

:::

## Asynchronous operations and async/await

PopClip provides implementations of `XMLHttpRequest` and `setTimeout`, which are
asynchronous. If a script uses these, PopClip will show its spinner and wait
until the last asynchronous operation has finished. During asynchronous
operations, clicking PopClip's spinner will cancel all current operations.

The returned value from the script (if any) is the return value of the last
function to complete. For example:

```javascript
// # popclip setTimeout example
// name: setTimeout Test
// after: show-result
// language: javascript
setTimeout(() => {
  return "bar";
}, 1000); // 1 second delay
return "foo";
// result shown will be 'bar', not 'foo'
```

Your functions can be `async`, and you can use the `await` keyword when calling
any function that returns a Promise. PopClip handles the details of resolving
promises internally.

As a convenience, PopClip supplies a global function `sleep()` as a
promise-based wrapper around `setTimeout()`:

```javascript
// # popclip await example
// name: Await Test
// language: js
await sleep(5000); // 5 second delay
popclip.showText("Boo!");
```

## Network access from JavaScript

::: warning Entitlement needed

To use XHR, the `network` entitlement must be present in the `entitlements`
array in the extension's config.

:::

PopClip provides its own implementation of
[`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
(XHR). This is the only way for JavaScript code to access the network.

PopClip is also bundled with the HTTP library
[axios](https://axios-http.com/docs/intro), which is an easier to use wrapper
around XHR.

Due to macOS's App Transport Security, PopClip can only access `https:` URLs.
Attempts to access `http:` URLs will throw a network error.

Here's an example extension snippet that downloads a selected URL's contents,
and copies it to the clipboard:

::: code-group

```javascript
// # popclip JS network example
// name: Download Text
// icon: symbol:square.and.arrow.down.fill
// requirements: [url]
// entitlements: [network]
// after: copy-result
// language: javascript
const axios = require("axios");
const response = await axios.get(popclip.input.data.urls[0]);
/* note: there is no particular need to check the return status here.
   axios calls will throw an error if the HTTP status is not 200/2xx. */
return response.data;
```

```typescript
// # popclip TS network example
// name: Download Text
// icon: symbol:square.and.arrow.down.fill
// requirements: [url]
// entitlements: [network]
// after: copy-result
// language: typescript
import axios from "axios";
const response = await axios.get(popclip.input.data.urls[0]);
/* note: there is no particular need to check the return status here.
   axios calls will throw an error if the HTTP status is not 200/2xx. */
return response.data;
```

:::

For a more substantial axios example, see for example
[Instant Translate](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/InstantTranslate.popclipext).

## TypeScript support

PopClip has built-in support for [TypeScript](https://www.typescriptlang.org/).
You can supply TypeScript source in any place where a JavaScript file can be
specified. PopClip loads files with a `.js` extension as raw JavaScript, and
loads files with a `.ts` extension as TypeScript.

At load time, PopClip transpiles TypeScript files into JavaScript source.
PopClip does not do any type validation on the TypeScript source.

### TypeScript configuration

When working with TypeScript files you'll want to provide a
[tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
file. For my current recommended `compilerOptions`, see the one in the
PopClip-Extensions repo:

- [Example tsconfig.json for PopClip extensions](https://github.com/pilotmoon/PopClip-Extensions/blob/master/tsconfig.json)

### PopClip types package

I have published the NPM package
[`@popclip/types`](https://www.npmjs.com/package/@popclip/types), a TypeScript
type definitions package to assist in developing extensions. This will enable
autocomplete and type-checking in TypeScript-aware editors.

Use an NPM-compatible JavaScript package manager to install both `typescript`
itself and the types package in the directory where you are writing your
extension code. I recommend [Bun](https://bun.sh/):

```bash
bun install --dev typescript @popclip/types
```

And then, in your `tsconfig.json` file, add an explicit reference to the
types:

```json
{
  "compilerOptions": {
    "types": ["@popclip/types"]
  }
}
```

Once this is done, you should get autocomplete and type-checking in your editor
and TypeScript's `tsc` will check your code for type errors:

```bash
bun run tsc --noEmit
```

## Test Harness

::: warning Beta feature

This section describes the test harness in [beta](/beta) Build 4615.

:::

PopClip has a command-line mode that loads a JavaScript or TypeScript file into
the PopClip environment and runs it. Optionally, if the file is a module, it can
then call one of the module's exported functions.

It is useful for running tests of your code in PopClip's environment, with the
same libraries, globals etc.

The test harness is activated by calling PopClip's executable (inside the
PopClip.app package) with the parameter `run` followed by the filename to load
and an optional function name to call. For example:

```bash
/Applications/PopClip.app/Contents/MacOS/PopClip run myfile.js myfunc
```

If a function name is supplied, it will be called with no parameters. If the
function is an `async` function or returns a `Promise`, the test harness will
wait for the function to complete before exiting. If the function completes
successfully, the return value of the function is printed to the console.

The shell exit status will be:

- 0 if the scipt loads and runs without error and the called function (if any)
  completes normally;
- 1 if an error occurs (e.g. file not found, syntax error), or if the function
  throws an exception.

Some notes:

- Scripts can output strings with the global `print()` function (not
  `console.log()`).
- When running in the test harness, the `popclip` object's properties will
  return blank data. Its methods can be called but some will not have any
  effect.
- Scripts running in the test harness always have the network access
  entitlement.
- The test harness is a somewhat experimental feature at present. Please reach
  out to me if something does not seem to work as expected.

### Example

'foo.ts':

```typescript
print("file loading now");
function sayHi(x: string) {
  print(`hello ${x}`);
}
export async function test() {
  sayHi("there");
  await sleep(500);
  sayHi("again");
  return "that's all folks";
}
```

Test harness output:

![](./media/shot-harness-2.png "Example Test Harness output.")
