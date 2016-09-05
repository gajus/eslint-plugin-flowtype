### `no-weak-types`

Warns against weak type annotations *any*, *Object* and *Function*.
These types can cause flow to silently skip over portions of your code,
which would have otherwise caused type errors.

This rule optionally takes one argument, an object to configure which type warnings to enable. By default, all of the
warnings are enabled. e.g. to disable the `any` warning (allowing it to exist in your code), while continuing to warn
about `Object` and `Function`:

```js
{
    "rules": {
        "flowtype/no-weak-types": [2, {
            "any": false,
            "Object": true,
            "Function": true
        }]
    }
}

// or, the following is equivalent as default is true:

{
    "rules": {
        "flowtype/no-weak-types": [2, {
            "any": false
        }]
    }
}
```

<!-- assertions noWeakTypes -->
