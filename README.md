# Babel Remove RequireJS plugin prefixes

This is a [Babel](https://babeljs.io/) plugin for removing the plugin prefixes from module requirements in `require` and `define` calls.

# What it does

It turns define or require calls like this:


```
define(['es6!some-module-1', 'normal-module'], function () { ... })
```

into

```
define(['some-module-1', 'normal-module'], function () { ... })
```

Pretty simple huh!

# Installation
First install via npm, or add to your `package.json`

```
npm install --save-dev babel-plugin-strip-requirejs-plugin-prefix
```

Then in your babel configuration, add `'strip-requirejs-plugin-prefix'` to your set of plugins:

```
{
  'plugins': [
    ['strip-requirejs-plugin-prefix', { plugin: 'es6'}]
  ]
}
```

# License
See [LICENSE.md](./LICENSE.md)
