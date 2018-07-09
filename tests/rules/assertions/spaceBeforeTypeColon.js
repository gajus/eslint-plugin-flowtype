import _ from 'lodash';

const ARROW_FUNCTION_PARAMS = {
  invalid: [
    {
      code: '(foo : string) => {}',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      options: ['never'],
      output: '(foo: string) => {}'
    },
    {
      code: '(foo ? : string) => {}',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      options: ['never'],
      output: '(foo ?: string) => {}'
    },
    {
      code: '(foo: string) => {}',
      errors: [{message: 'There must be a space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: '(foo : string) => {}'
    },
    {
      code: '(foo  : string) => {}',
      errors: [{message: 'There must be 1 space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: '(foo : string) => {}'
    },
    {
      code: '(foo?: string) => {}',
      errors: [{message: 'There must be a space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: '(foo? : string) => {}'
    },
    {
      code: '(foo ?  : string) => {}',
      errors: [{message: 'There must be 1 space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: '(foo ? : string) => {}'
    },
    {
      code: '(foo  ?: string) => {}',
      errors: [{message: 'There must be a space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: '(foo  ? : string) => {}'
    },
    {
      code: '({ lorem, ipsum, dolor } : SomeType) => {}',
      errors: [{message: 'There must be no space before "{ lorem, ipsum, dolor }" parameter type annotation colon.'}],
      output: '({ lorem, ipsum, dolor }: SomeType) => {}'
    },
    {
      code: '(foo : { a: string, b: number }) => {}',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      output: '(foo: { a: string, b: number }) => {}'
    },
    {
      code: '({ a, b } : { a: string, b: number }) => {}',
      errors: [{message: 'There must be no space before "{ a, b }" parameter type annotation colon.'}],
      output: '({ a, b }: { a: string, b: number }) => {}'
    },
    {
      code: '([ a, b ] : string[]) => {}',
      errors: [{message: 'There must be no space before "[ a, b ]" parameter type annotation colon.'}],
      output: '([ a, b ]: string[]) => {}'
    }
  ],
  valid: [
    {
      code: '(foo) => {}'
    },
    {
      code: '(foo: string) => {}'
    },
    {
      code: '(foo?: string) => {}'
    },
    {
      code: '(foo ?: string) => {}'
    },
    {
      code: '(foo: string) => {}',
      options: ['never']
    },
    {
      code: '(foo : string) => {}',
      options: ['always']
    },
    {
      code: '(foo? : string) => {}',
      options: ['always']
    },
    {
      code: '(foo ? : string) => {}',
      options: ['always']
    },
    {
      code: '(foo  ? : string) => {}',
      options: ['always']
    },
    {
      code: '({ lorem, ipsum, dolor }: SomeType) => {}'
    },
    {
      code: '(foo: { a: string, b: number }) => {}'
    },
    {
      code: '({ a, b }: ?{ a: string, b: number }) => {}'
    },
    {
      code: '(): { a: number, b: string } => {}'
    },
    {
      code: '() : { a : number, b : string } => {}',
      options: ['always']
    },
    {
      code: '([ a, b ]: string[]) => {}'
    }
  ]
};

const ARROW_FUNCTION_RETURN = {
  invalid: [
    {
      code: '() : x => {}',
      errors: [{message: 'There must be no space before return type colon.'}],
      output: '(): x => {}'
    },
    {
      code: '(): x => {}',
      errors: [{message: 'There must be a space before return type colon.'}],
      options: ['always'],
      output: '() : x => {}'
    },
    {
      code: '()  : x => {}',
      errors: [{message: 'There must be 1 space before return type colon.'}],
      options: ['always'],
      output: '() : x => {}'
    }
  ],
  valid: [
    {
      code: '(): x => {}'
    },
    {
      code: '() : x => {}',
      options: ['always']
    },
    {
      code: '(): (number | string) => {}'
    },
    {
      code: '() : (number | string) => {}',
      options: ['always']
    }
  ]
};

const FUNCTION_PARAMS = {
  invalid: [
    {
      code: 'function x(foo : string) {}',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      output: 'function x(foo: string) {}'
    },
    {
      code: 'function x(foo: string) {}',
      errors: [{message: 'There must be a space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: 'function x(foo : string) {}'
    },
    {
      code: 'var x = function (foo : string) {}',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      output: 'var x = function (foo: string) {}'
    },
    {
      code: 'var x = function (foo: string) {}',
      errors: [{message: 'There must be a space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: 'var x = function (foo : string) {}'
    },
    {
      code: 'class Foo { constructor(foo : string ) {} }',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      output: 'class Foo { constructor(foo: string ) {} }'
    },
    {
      code: 'class Foo { constructor(foo: string ) {} }',
      errors: [{message: 'There must be a space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: 'class Foo { constructor(foo : string ) {} }'
    },
    {
      code: 'async function foo({ lorem, ipsum, dolor } : SomeType) {}',
      errors: [{message: 'There must be no space before "{ lorem, ipsum, dolor }" parameter type annotation colon.'}],
      output: 'async function foo({ lorem, ipsum, dolor }: SomeType) {}'
    }
  ],
  valid: [
    {
      code: 'function x(foo: string) {}'
    },
    {
      code: 'function x(foo : string) {}',
      options: ['always']
    },
    {
      code: 'var x = function (foo: string) {}'
    },
    {
      code: 'var x = function (foo : string) {}',
      options: ['always']
    },
    {
      code: 'class X { foo({ bar }: Props = this.props) {} }'
    },
    {
      code: 'class Foo { constructor(foo: string ) {} }'
    },
    {
      code: 'class Foo { constructor(foo : string ) {} }',
      options: ['always']
    },
    {
      code: 'async function foo({ lorem, ipsum, dolor }: SomeType) {}'
    },
    {
      code: 'function x({ a, b }: { a: string, b: number }) {}'
    }
  ]
};

const FUNCTION_RETURN = {
  invalid: [
    {
      code: 'function a() : x {}',
      errors: [{message: 'There must be no space before return type colon.'}],
      output: 'function a(): x {}'
    },
    {
      code: 'function a(): x {}',
      errors: [{message: 'There must be a space before return type colon.'}],
      options: ['always'],
      output: 'function a() : x {}'
    },
    {
      code: 'function a()  : x {}',
      errors: [{message: 'There must be 1 space before return type colon.'}],
      options: ['always'],
      output: 'function a() : x {}'
    }
  ],
  valid: [
    {
      code: 'function a(): x {}'
    },
    {
      code: 'function a() : x {}',
      options: ['always']
    },
    {
      code: 'function a(): (number | string) {}'
    },
    {
      code: 'function a() : (number | string) {}',
      options: ['always']
    }
  ]
};

const FUNCTION_TYPE_PARAMS = {
  invalid: [
    {
      code: 'type X = (foo :string) => string;',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      output: 'type X = (foo:string) => string;'
    },
    {
      code: 'type X = (foo:string) => string;',
      errors: [{message: 'There must be a space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: 'type X = (foo :string) => string;'
    },
    {
      code: 'type X = (foo  :string) => string;',
      errors: [{message: 'There must be 1 space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: 'type X = (foo :string) => string;'
    },
    {
      code: 'type X = (foo? :string) => string;',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      output: 'type X = (foo?:string) => string;'
    },
    {
      code: 'type X = (foo?     :string) => string;',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      output: 'type X = (foo?:string) => string;'
    },
    {
      code: 'type X = (foo?:string) => string;',
      errors: [{message: 'There must be a space before "foo" parameter type annotation colon.'}],
      options: ['always'],
      output: 'type X = (foo? :string) => string;'
    },
    {
      code: 'type X = (foo? :?string) => string;',
      errors: [{message: 'There must be no space before "foo" parameter type annotation colon.'}],
      output: 'type X = (foo?:?string) => string;'
    }
  ],
  valid: [
    {
      code: 'type X = (foo:string) => number;'
    },
    {
      code: 'type X = (foo: string) => number;'
    },
    {
      code: 'type X = (foo: ?string) => number;'
    },
    {
      code: 'type X = (foo?: string) => number;'
    },
    {
      code: 'type X = (foo?: ?string) => number;'
    },
    {
      code: 'type X = (foo   ?: string) => number;'
    },
    {
      code: 'type X = (foo? : string) => number',
      options: ['always']
    },
    {
      code: 'type X = (foo? : ?string) => number',
      options: ['always']
    },
    {
      code: 'type X = (number) => string;'
    },
    {
      code: 'type X = (?number) => string;'
    },
    {
      code: 'type X = number => string;'
    },
    {
      code: 'type X = ?number => string;'
    },
    {
      code: 'type X = ({ foo: bar }) => string;'
    },
    {
      code: 'type X = (number) => string;',
      options: ['always']
    },
    {
      code: 'type X = (?number) => string;',
      options: ['always']
    },
    {
      code: 'type X = number => string;',
      options: ['always']
    },
    {
      code: 'type X = ?number => string;',
      options: ['always']
    },
    {
      code: 'type X = ({ foo : bar }) => string;',
      options: ['always']
    }
  ]
};

const CLASS_PROPERTIES = {
  invalid: [
    {
      code: 'class X { foo :string }',
      errors: [{message: 'There must be no space before "foo" class property type annotation colon.'}],
      output: 'class X { foo:string }'
    },
    {
      code: 'class X { foo: string }',
      errors: [{message: 'There must be a space before "foo" class property type annotation colon.'}],
      options: ['always'],
      output: 'class X { foo : string }'
    },
    {
      code: 'class X { foo :?string }',
      errors: [{message: 'There must be no space before "foo" class property type annotation colon.'}],
      output: 'class X { foo:?string }'
    },
    {
      code: 'class X { foo: ?string }',
      errors: [{message: 'There must be a space before "foo" class property type annotation colon.'}],
      options: ['always'],
      output: 'class X { foo : ?string }'
    },
    {
      code: 'class X { static foo : number }',
      errors: [{message: 'There must be no space before "foo" class property type annotation colon.'}],
      output: 'class X { static foo: number }'
    },
    {
      code: 'class X { static foo :number }',
      errors: [{message: 'There must be no space before "foo" class property type annotation colon.'}],
      output: 'class X { static foo:number }'
    },
    {
      code: 'class X { static foo: number }',
      errors: [{message: 'There must be a space before "foo" class property type annotation colon.'}],
      options: ['always'],
      output: 'class X { static foo : number }'
    },
    {
      code: 'class X { static foo:number }',
      errors: [{message: 'There must be a space before "foo" class property type annotation colon.'}],
      options: ['always'],
      output: 'class X { static foo :number }'
    },
    {
      code: 'declare class Foo { static bar :number; }',
      errors: [{message: 'There must be no space before "bar" type annotation colon.'}],
      output: 'declare class Foo { static bar:number; }'
    },
    {
      code: 'declare class Foo { static bar : number; }',
      errors: [{message: 'There must be no space before "bar" type annotation colon.'}],
      output: 'declare class Foo { static bar: number; }'
    },
    {
      code: 'declare class Foo { static bar:number; }',
      errors: [{message: 'There must be a space before "bar" type annotation colon.'}],
      options: ['always'],
      output: 'declare class Foo { static bar :number; }'
    },
    {
      code: 'declare class Foo { static bar: number; }',
      errors: [{message: 'There must be a space before "bar" type annotation colon.'}],
      options: ['always'],
      output: 'declare class Foo { static bar : number; }'
    },
    {
      code: 'class X { +foo: string }',
      errors: [{message: 'There must be a space before "foo" class property type annotation colon.'}],
      options: ['always'],
      output: 'class X { +foo : string }'
    },
    {
      code: 'class X { +foo  : string }',
      errors: [{message: 'There must be 1 space before "foo" class property type annotation colon.'}],
      options: ['always'],
      output: 'class X { +foo : string }'
    },
    {
      code: 'class X { +foo : string }',
      errors: [{message: 'There must be no space before "foo" class property type annotation colon.'}],
      options: ['never'],
      output: 'class X { +foo: string }'
    },
    {
      code: 'class X { static +foo: string }',
      errors: [{message: 'There must be a space before "foo" class property type annotation colon.'}],
      options: ['always'],
      output: 'class X { static +foo : string }'
    },
    {
      code: 'class X { static +foo  : string }',
      errors: [{message: 'There must be 1 space before "foo" class property type annotation colon.'}],
      options: ['always'],
      output: 'class X { static +foo : string }'
    },
    {
      code: 'class X { static +foo : string }',
      errors: [{message: 'There must be no space before "foo" class property type annotation colon.'}],
      options: ['never'],
      output: 'class X { static +foo: string }'
    }
  ],
  valid: [
    {
      code: 'class Foo { bar }'
    },
    {
      code: 'class Foo { bar = 3 }'
    },
    {
      code: 'class Foo { bar: string }'
    },
    {
      code: 'class Foo { bar: ?string }'
    },
    {
      code: 'class Foo { bar:?string }'
    },
    {
      code: 'class Foo { bar : string }',
      options: ['always']
    },
    {
      code: 'class X { static foo:number }'
    },
    {
      code: 'class X { static foo: number }'
    },
    {
      code: 'class X { static foo :number }',
      options: ['always']
    },
    {
      code: 'class X { static foo : number }',
      options: ['always']
    },
    {
      code: 'declare class Foo { static bar:number; }'
    },
    {
      code: 'declare class Foo { static bar :number; }',
      options: ['always']
    },
    {
      code: 'declare class Foo { static bar: number; }'
    },
    {
      code: 'declare class Foo { static bar : number; }',
      options: ['always']
    },
    {
      code: 'class X { +foo: string }'
    },
    {
      code: 'class X { static +foo: string }'
    },
    {
      code: 'class X { +foo : string }',
      options: ['always']
    },
    {
      code: 'class X { static +foo : string }',
      options: ['always']
    }
  ]
};

const OBJECT_TYPE_PROPERTIES = {
  invalid: [
    {
      code: 'type X = { foo : string }',
      errors: [{message: 'There must be no space before "foo" type annotation colon.'}],
      output: 'type X = { foo: string }'
    },
    {
      code: 'type X = { foo : string }',
      errors: [{message: 'There must be no space before "foo" type annotation colon.'}],
      options: ['never'],
      output: 'type X = { foo: string }'
    },
    {
      code: 'type X = { foo: string }',
      errors: [{message: 'There must be a space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { foo : string }'
    },
    {
      code: 'type X = { foo  : string }',
      errors: [{message: 'There must be 1 space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { foo : string }'
    },
    {
      code: 'type X = { foo? : string }',
      errors: [{message: 'There must be no space before "foo" type annotation colon.'}],
      output: 'type X = { foo?: string }'
    },
    {
      code: 'type X = { foo?: string }',
      errors: [{message: 'There must be a space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { foo? : string }'
    },
    {
      code: 'type X = { foo?  : string }',
      errors: [{message: 'There must be 1 space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { foo? : string }'
    },
    {
      code: 'type X = { foo   ?: string }',
      errors: [{message: 'There must be a space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { foo   ? : string }'
    },
    {
      code: 'type X = { +foo: string }',
      errors: [{message: 'There must be a space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { +foo : string }'
    },
    {
      code: 'type X = { +foo  : string }',
      errors: [{message: 'There must be 1 space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { +foo : string }'
    },
    {
      code: 'type X = { +foo : string }',
      errors: [{message: 'There must be no space before "foo" type annotation colon.'}],
      options: ['never'],
      output: 'type X = { +foo: string }'
    },
    {
      code: 'type X = { +foo?: string }',
      errors: [{message: 'There must be a space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { +foo? : string }'
    },
    {
      code: 'type X = { +foo?  : string }',
      errors: [{message: 'There must be 1 space before "foo" type annotation colon.'}],
      options: ['always'],
      output: 'type X = { +foo? : string }'
    },
    {
      code: 'type X = { +foo? : string }',
      errors: [{message: 'There must be no space before "foo" type annotation colon.'}],
      options: ['never'],
      output: 'type X = { +foo?: string }'
    }
  ],
  valid: [
    {
      code: 'type X = { foo: string }'
    },
    {
      code: 'type X = { foo : string }',
      options: ['always']
    },
    {
      code: 'type X = { foo?: string }'
    },
    {
      code: 'type X = { foo   ?: string }'
    },
    {
      code: 'type X = { foo? : string }',
      options: ['always']
    },
    {
      code: 'type X = { +foo: string }'
    },
    {
      code: 'type X = { +foo?: string }'
    },
    {
      code: 'type X = { +foo : string }',
      options: ['always']
    },
    {
      code: 'type X = { +foo? : string }',
      options: ['always']
    }
  ]
};

const OBJECT_TYPE_INDEXERS = {
  invalid: [
    // [id:key]: value
    //    ^
    {
      code: 'type X = { [a: b] : c }',
      errors: [{message: 'There must be a space before type annotation colon.'}],
      options: ['always'],
      output: 'type X = { [a : b] : c }'
    },
    {
      code: 'type X = { [a : b]: c }',
      errors: [{message: 'There must be no space before type annotation colon.'}],
      options: ['never'],
      output: 'type X = { [a: b]: c }'
    },
    {
      code: 'type X = { [a  : b] : c }',
      errors: [{message: 'There must be 1 space before type annotation colon.'}],
      options: ['always'],
      output: 'type X = { [a : b] : c }'
    },
    {
      code: 'type X = { +[a:b] : c }',
      errors: [{message: 'There must be a space before type annotation colon.'}],
      options: ['always'],
      output: 'type X = { +[a :b] : c }'
    },
    {
      code: 'type X = { +[a : b]: c }',
      errors: [{message: 'There must be no space before type annotation colon.'}],
      options: ['never'],
      output: 'type X = { +[a: b]: c }'
    },
    {
      code: 'type X = { +[a  : b] : c }',
      errors: [{message: 'There must be 1 space before type annotation colon.'}],
      options: ['always'],
      output: 'type X = { +[a : b] : c }'
    },

    // [id:key]: value
    //         ^
    {
      code: 'type X = { [a : b]: c }',
      errors: [{message: 'There must be a space before type annotation colon.'}],
      options: ['always'],
      output: 'type X = { [a : b] : c }'
    },
    {
      code: 'type X = { [a: b] : c }',
      errors: [{message: 'There must be no space before type annotation colon.'}],
      options: ['never'],
      output: 'type X = { [a: b]: c }'
    },
    {
      code: 'type X = { [a : b]  : c }',
      errors: [{message: 'There must be 1 space before type annotation colon.'}],
      options: ['always'],
      output: 'type X = { [a : b] : c }'
    },

    // [id:key]: value
    //    ^    ^
    {
      code: 'type X = { [a:b]:c }',
      errors: [
        {message: 'There must be a space before type annotation colon.'},
        {message: 'There must be a space before type annotation colon.'}
      ],
      options: ['always'],
      output: 'type X = { [a :b] :c }'
    },
    {
      code: 'type X = { [a : b] : c }',
      errors: [
        {message: 'There must be no space before type annotation colon.'},
        {message: 'There must be no space before type annotation colon.'}
      ],
      options: ['never'],
      output: 'type X = { [a: b]: c }'
    },
    {
      code: 'type X = { [a  : b]  : c }',
      errors: [
        {message: 'There must be 1 space before type annotation colon.'},
        {message: 'There must be 1 space before type annotation colon.'}
      ],
      options: ['always'],
      output: 'type X = { [a : b] : c }'
    },
    {
      code: 'type X = { [a:(b)]:(c) }',
      errors: [
        {message: 'There must be a space before type annotation colon.'},
        {message: 'There must be a space before type annotation colon.'}
      ],
      options: ['always'],
      output: 'type X = { [a :(b)] :(c) }'
    },
    {
      code: 'type X = { [a : (b)] : (c) }',
      errors: [
        {message: 'There must be no space before type annotation colon.'},
        {message: 'There must be no space before type annotation colon.'}
      ],
      options: ['never'],
      output: 'type X = { [a: (b)]: (c) }'
    }
  ],
  valid: [
    {
      code: 'type X = { [a : b] : c }',
      options: ['always']
    },
    {
      code: 'type X = { [a:b]:c }',
      options: ['never']
    },
    {
      code: 'type X = { [string] : c }',
      options: ['always']
    },
    {
      code: 'type X = { [string]:c }',
      options: ['never']
    },
    {
      code: 'type X = { +[a : b] : c }',
      options: ['always']
    },
    {
      code: 'type X = { +[a:b]:c }',
      options: ['never']
    },
    {
      code: 'type X = { [a : (b)] : (c) }',
      options: ['always']
    },
    {
      code: 'type X = { [a:(b)]:(c) }',
      options: ['never']
    }
  ]
};

const TYPE_CAST_EXPRESSIONS = {
  invalid: [
    {
      code: 'const x = ({} :{})',
      errors: [{message: 'There must be no space before type cast colon.'}],
      options: ['never'],
      output: 'const x = ({}:{})'
    },
    {
      code: 'const x = ({}:{})',
      errors: [{message: 'There must be a space before type cast colon.'}],
      options: ['always'],
      output: 'const x = ({} :{})'
    },
    {
      code: 'const x = ({}  :{})',
      errors: [{message: 'There must be 1 space before type cast colon.'}],
      options: ['always'],
      output: 'const x = ({} :{})'
    },
    {
      code: '((x) : string)',
      errors: [{message: 'There must be no space before type cast colon.'}],
      options: ['never'],
      output: '((x): string)'
    },
    {
      code: '((x): string)',
      errors: [{message: 'There must be a space before type cast colon.'}],
      options: ['always'],
      output: '((x) : string)'
    },
    {
      code: '((x)  : string)',
      errors: [{message: 'There must be 1 space before type cast colon.'}],
      options: ['always'],
      output: '((x) : string)'
    }
  ],
  valid: [
    {
      code: 'const x = ({}:{})',
      options: ['never']
    },
    {
      code: 'const x = ({} :{})',
      options: ['always']
    },
    {
      code: '((x): string)',
      options: ['never']
    },
    {
      code: '((x) : string)',
      options: ['always']
    }
  ]
};

const VARIABLE_EXPRESSIONS = {
  invalid: [
    {
      code: 'const x:number = 7;',
      errors: [{message: 'There must be a space before const type annotation colon.'}],
      options: ['always'],
      output: 'const x :number = 7;'
    },
    {
      code: 'let x:number = 42;',
      errors: [{message: 'There must be a space before let type annotation colon.'}],
      options: ['always'],
      output: 'let x :number = 42;'
    },
    {
      code: 'var x:number = 42;',
      errors: [{message: 'There must be a space before var type annotation colon.'}],
      options: ['always'],
      output: 'var x :number = 42;'
    }
  ],
  valid: [
    {
      code: 'const x :number = 7;',
      options: ['always']
    },
    {
      code: 'let x :number = 42;',
      options: ['always']
    },
    {
      code: 'var x :number = 42;',
      options: ['always']
    }
  ]
};

const ALL = [
  ARROW_FUNCTION_PARAMS,
  ARROW_FUNCTION_RETURN,
  FUNCTION_PARAMS,
  FUNCTION_RETURN,
  FUNCTION_TYPE_PARAMS,
  CLASS_PROPERTIES,
  OBJECT_TYPE_PROPERTIES,
  OBJECT_TYPE_INDEXERS,
  TYPE_CAST_EXPRESSIONS,
  VARIABLE_EXPRESSIONS
];

const MISCONFIGURED = [
  {
    errors: [
      {
        data: 'wherever',
        dataPath: '[0]',
        keyword: 'enum',
        message: 'should be equal to one of the allowed values',
        params: {
          allowedValues: [
            'always',
            'never'
          ]
        },
        parentSchema: {
          enum: [
            'always',
            'never'
          ],
          type: 'string'
        },
        schema: [
          'always',
          'never'
        ],
        schemaPath: '#/items/0/enum'
      }
    ],
    options: ['wherever']
  }
];

export default {
  invalid: _.flatMap(ALL, (rules) => {
    return rules.invalid;
  }),
  misconfigured: MISCONFIGURED,
  valid: _.flatMap(ALL, (rules) => {
    return rules.valid;
  })
};
