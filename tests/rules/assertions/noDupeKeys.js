export default {
  invalid: [
    {
      code: 'type f = { a: number, b: string, a: number }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'type f = { a: number, b: string, a: string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'type f = { get(key: "a"): string, get(key: "a"): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'type f = { get(key: 1): string, get(key: 1): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'type f = { get(key: 1.1): string, get(key: 1.1): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'type f = { get(key: true): string, get(key: true): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'type f = { get(key: {a: 1}): string, get(key: {a: 1}):string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'var a = "a"; type f = { get(key: a): string, get(key: a): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'var b = 1; type f = { get(key: b): string, get(key: b): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'var c = true; type f = { get(key: c): string, get(key: c): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'var d = {}; type f = { get(key: d): string, get(key: d): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'var e = []; type f = { get(key: e): string, get(key: e): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'var e = [1, "a"]; type f = { get(key: e): string, get(key: e): string }',
      errors: [{message: 'Duplicate property.'}],
    },
    {
      code: 'function fn() {}; type f = { get(key: fn): string, get(key: fn): string }',
      errors: [{message: 'Duplicate property.'}],
    },
  ],
  valid: [
    {
      code: 'type FooType = { a: number, b: string, c: number }',
    },
    {
      code: 'type FooType = { a: number, b: string, a: number }',
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
    },
    {
      code: 'type f = { get(key: "a"): string, get(key: "b"): string }',
    },
    {
      code: 'type f = { get(key: 1): string, get(key: 2): string }',
    },
    {
      code: 'type f = { get(key: 1.1): string, get(key: 1.2): string }',
    },
    {
      code: 'type f = { get(key: true): string, get(key: false): string }',
    },
    {
      code: 'type f = { get(key: ["a", 1]): string, get(key: ["a", 2]): string }',
    },
    {
      code: 'type f = { get(key: ["a", ["b", 1]]): string, get(key: ["a", ["b", 2]]): string }',
    },
    {
      code: 'type f = { a: number, b: string, c: number }',
    },
    {
      code: 'type f = { get(key: "a"): string, get(key: "b"): string }',
    },
    {
      code: 'type f = { get(key: "a"): string, get(key: "a", key2: "b"): string }',
    },
    {
      code: 'type f = { get(key: "a"): string, get(key: 1): string }',
    },
    {
      code: 'type f = { get(key: { a: 1 }): string, get(key: { a: 2 }): string}',
    },
    {
      code: 'var a = {}; var b = {}; type f = { get(key: a): string, get(key: b): string }',
    },
    {
      code: 'var a = 1; var b = 1; type f = { get(key: a): string, get(key: b): string }',
    },
    {
      code: 'type a = { b: <C>(config: { ...C, key: string}) => C }',
    },
  ],
};
