export default {
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
        },
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
            code: '({ lorem, ipsum, dolor }: SomeType) => {}'
        },
        {
            code: '(foo: { a: string, b: number }) => {}'
        },
        {
            code: '({ a, b }: ?{ a: string, b: number }) => {}'
        },
        {
            code: 'function x({ a, b }: { a: string, b: number }) {}'
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
        },
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
        }
    ]
};
