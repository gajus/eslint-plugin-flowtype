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
    },
    {
      code: 'import {A, type B} from \'a\';',
      errors: [
        {message: 'Unexpected type import'}
      ],
      options: ['declaration']
    },
    {
      code: 'import {type A, type B} from \'a\';',
      errors: [
        {message: 'Unexpected type import'}
      ],
      options: ['prefer-declaration'],
      output: 'import type {A, B} from \'a\';'
    },
    {
      code: 'import {type A as A2, type B} from \'a\';',
      errors: [
        {message: 'Unexpected type import'}
      ],
      options: ['prefer-declaration'],
      output: 'import type {A as A2, B} from \'a\';'
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
      code: 'import {A, type B} from \'a\';',
      options: ['prefer-declaration']
    },
    {
      code: 'import A, {type B} from \'a\';',
      options: ['prefer-declaration']
    },
    {
      code: 'import {A, type B as B2} from \'a\';',
      options: ['prefer-declaration']
    },
    {
      code: 'import type A, * as B from \'a\';',
      options: ['prefer-declaration']
    }
  ]
};

