export default {
  invalid: [
    {
      code: 'import type {A, B} from \'a\';',
      errors: [{message: 'Unexpected "import type"'}],
      output: 'import {type A, type B} from \'a\';'
    },
    {
      code: 'import type {A, B} from \'a\';',
      errors: [{message: 'Unexpected "import type"'}],
      options: ['identifier'],
      output: 'import {type A, type B} from \'a\';'
    },
    {
      code: 'import type {A, B as C} from \'a\';',
      errors: [{message: 'Unexpected "import type"'}],
      options: ['identifier'],
      output: 'import {type A, type B as C} from \'a\';'
    },
    {
      code: 'import type A from \'a\';',
      errors: [{message: 'Unexpected "import type"'}],
      options: ['identifier'],
      output: 'import {type default as A} from \'a\';'
    },
    {
      code: 'import {type A, type B} from \'a\';',
      errors: [
        {message: 'Unexpected type import'},
        {message: 'Unexpected type import'}
      ],
      options: ['declaration']
    }
  ],
  valid: [
    {
      code: 'import {type A, type B} from \'a\';'
    },
    {
      code: 'import {type A, type B} from \'a\';',
      options: ['identifier']
    },
    {
      code: 'import type {A, B} from \'a\';',
      options: ['declaration']
    },
    {
      code: 'import typeof * as A from \'a\';',
      options: ['identifier']
    },
    {
      code: 'import type A from \'a\';',
      options: ['identifier', {ignoreTypeDefault: true}]
    },
    {
      code: 'declare module "m" { import type A from \'a\'; }',
      options: ['identifier']
    }
  ]
};

