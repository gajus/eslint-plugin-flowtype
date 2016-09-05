const OBJECT_TYPE_ANNOTATION = {
  invalid: [
    {
      code: 'type X = { foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = { foo: string }'
    },
    {
      code: 'type X = { foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = { foo: string }'
    },
    {
      code: 'type X = { foo: string; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = { foo: string }'
    },
    {
      code: 'type X = {\nfoo: string,\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = {\nfoo: string\n}'
    },
    {
      code: 'type X = { foo: string }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { foo: string, }'
    },
    {
      code: 'type X = {\nfoo: string\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = {\nfoo: string,\n}'
    },
    {
      code: 'type X = { foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = { foo: string }'
    },
    {
      code: 'type X = {\nfoo: string\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = {\nfoo: string,\n}'
    },
    {
      code: 'type X = { foo: string; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = { foo: string }'
    }
  ],
  valid: [
    {
      code: 'type X = { foo: string }'
    },
    {
      code: 'type X = { foo: string }',
      options: ['never']
    },
    {
      code: 'type X = { foo: string, }',
      options: ['always']
    },
    {
      code: 'type X = { foo: string; }',
      options: ['always']
    },
    {
      code: 'type X = {\nfoo: string\n}',
      options: ['never']
    },
    {
      code: 'type X = {\nfoo: string,\n}',
      options: ['always']
    },
    {
      code: 'type X = { foo: string }',
      options: ['always-multiline']
    },
    {
      code: 'type X = {\nfoo: string,\n}',
      options: ['always-multiline']
    },
    {
      code: 'type X = {\nfoo: string;\n}',
      options: ['always-multiline']
    },
    {
      code: 'type X = { foo: string }',
      options: ['only-multiline']
    },
    {
      code: 'type X = {\nfoo: string\n}',
      options: ['only-multiline']
    },
    {
      code: 'type X = {\nfoo: string,\n}',
      options: ['only-multiline']
    },
    {
      code: 'type X = {\nfoo: string;\n}',
      options: ['only-multiline']
    }
  ]
};

const TUPLE_TYPE_ANNOTATION = {
  invalid: [
    {
      code: 'type X = [string, number,]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = [string, number]'
    },
    {
      code: 'type X = [string, number,]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = [string, number]'
    },
    {
      code: 'type X = [\nstring,\nnumber,\n]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = [\nstring,\nnumber\n]'
    },
    {
      code: 'type X = [string, number]',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = [string, number,]'
    },
    {
      code: 'type X = [\nstring,\nnumber\n]',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = [\nstring,\nnumber,\n]'
    },
    {
      code: 'type X = [string, number,]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = [string, number]'
    },
    {
      code: 'type X = [\nfoo, string\n]',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = [\nfoo, string,\n]'
    },
    {
      code: 'type X = [ number, string, ]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = [ number, string ]'
    }
  ],
  valid: [
    {
      code: 'type X = [string, number]'
    },
    {
      code: 'type X = [string, number]',
      options: ['never']
    },
    {
      code: 'type X = [\nstring,\nnumber\n]',
      options: ['never']
    },
    {
      code: 'type X = [string, number,]',
      options: ['always']
    },
    {
      code: 'type X = [\nstring,\nnumber,\n]',
      options: ['always']
    },
    {
      code: 'type X = [ foo, string ]',
      options: ['always-multiline']
    },
    {
      code: 'type X = [\nfoo, string,\n]',
      options: ['always-multiline']
    },
    {
      code: 'type X = [ number, string ]',
      options: ['only-multiline']
    },
    {
      code: 'type X = [\nnumber,\nstring\n]',
      options: ['only-multiline']
    },
    {
      code: 'type X = [\nnumber,\nstring,\n]',
      options: ['only-multiline']
    }
  ]
};

export default {
  invalid: [
    ...OBJECT_TYPE_ANNOTATION.invalid,
    ...TUPLE_TYPE_ANNOTATION.invalid
  ],
  valid: [
    ...OBJECT_TYPE_ANNOTATION.valid,
    ...TUPLE_TYPE_ANNOTATION.valid
  ]
};
