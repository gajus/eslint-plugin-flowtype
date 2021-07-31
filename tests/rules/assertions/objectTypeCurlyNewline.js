export default {
  invalid: [
    // Never
    {
      code: 'type obj = { "foo": "bar"\n}',
      errors: [
        {message: 'There should not be a newline before closing curly brace'},
      ],
      options: ['never'],

      // output: 'type obj = {"foo": "bar"}',
    },
    {
      code: 'type obj = {\n"foo": "bar" }',
      errors: [
        {message: 'There should not be a newline after opening curly brace'},
      ],
      options: ['never'],

      // output: 'type obj = {"foo": "bar"}',
    },
    {
      code: 'type obj = {\n"foo": "bar"\n}',
      errors: [
        {message: 'There should not be a newline after opening curly brace'},
        {message: 'There should not be a newline before closing curly brace'},
      ],
      options: ['never'],

      // output: 'type obj = {"foo": "bar"}',
    },

    // Always
    {
      code: 'type obj = {"foo": "bar"\n}',
      errors: [
        {message: 'There should be a newline after opening curly brace'},
      ],
      options: ['always'],
      output: 'type obj = {\n"foo": "bar"\n}',
    },
    {
      code: 'type obj = {\n"foo": "bar"}',
      errors: [
        {message: 'There should be a newline before closing curly brace'},
      ],
      options: ['always'],
      output: 'type obj = {\n"foo": "bar"\n}',
    },
    {
      code: 'type obj = {"foo": "bar"}',
      errors: [
        {message: 'There should be a newline after opening curly brace'},
        {message: 'There should be a newline before closing curly brace'},
      ],
      options: ['always'],
      output: 'type obj = {\n"foo": "bar"\n}',
    },

    // Multiline
    {
      code: 'type obj = { "foo": "bar"\n}',
      errors: [
        {message: 'There should be a newline after opening curly brace'},
      ],
      options: ['multiline'],
      output: 'type obj = {\n "foo": "bar"\n}',
    },
    {
      code: 'type obj = {\n"foo": "bar"}',
      errors: [
        {message: 'There should be a newline before closing curly brace'},
      ],
      options: ['multiline'],
      output: 'type obj = {\n"foo": "bar"\n}',
    },
  ],
  valid: [
    {
      code: 'type obj = { test: a }',
      options: ['never'],
    },
    {
      code: 'type obj = {\ntest: a\n}',
      options: ['always'],
    },
    {
      code: 'type obj = { test: a }',
      options: ['multiline'],
    },
    {
      code: 'type obj = {\ntest: a\n}',
      options: ['multiline'],
    },
  ],
};
