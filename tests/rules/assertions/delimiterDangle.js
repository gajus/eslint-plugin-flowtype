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
    },

    // Only indexers...
    {
      code: 'type X = { [key: string]: number, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = { [key: string]: number }'
    },
    {
      code: 'type X = { [key: string]: number }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { [key: string]: number, }'
    },
    {
      code: 'type X = { [key: string]: number, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = { [key: string]: number }'
    },
    {
      code: 'type X = {\n[key: string]: number\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = {\n[key: string]: number,\n}'
    },
    {
      code: 'type X = { [key: string]: number; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = { [key: string]: number }'
    },

    // Indexer, Prop...
    {
      code: 'type X = { [key: string]: number, foo: string, }',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 35,
        line: 1,
        message: 'Unexpected trailing delimiter'
      }],
      options: ['never'],
      output: 'type X = { [key: string]: number, foo: string }'
    },
    {
      code: 'type X = {\n[key: string]: number,\nfoo: string,\n}',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 1,
        line: 3,
        message: 'Unexpected trailing delimiter'
      }],
      options: ['never'],
      output: 'type X = {\n[key: string]: number,\nfoo: string\n}'
    },
    {
      code: 'type X = {\n[key: string]: number,\naReallyLongPropertyNameHere: string,\n}',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 1,
        line: 3,
        message: 'Unexpected trailing delimiter'
      }],
      options: ['never'],
      output: 'type X = {\n[key: string]: number,\naReallyLongPropertyNameHere: string\n}'
    },
    {
      code: 'type X = { [key: string]: number, foo: string }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { [key: string]: number, foo: string, }'
    },
    {
      code: 'type X = {\n[key: string]: number;\nfoo: string\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = {\n[key: string]: number;\nfoo: string,\n}'
    },
    {
      code: 'type X = { [key: string]: number, foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = { [key: string]: number, foo: string }'
    },
    {
      code: 'type X = {\n[key: string]: number,\nfoo: string\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = {\n[key: string]: number,\nfoo: string,\n}'
    },
    {
      code: 'type X = { [key: string]: number, foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = { [key: string]: number, foo: string }'
    },

    // Prop, Indexer...
    {
      code: 'type X = { foo: string, [key: string]: number, }',
      errors: [{
        // be sure it's reporting the indexer, not the prop
        column: 25,
        line: 1,
        message: 'Unexpected trailing delimiter'
      }],
      options: ['never'],
      output: 'type X = { foo: string, [key: string]: number }'
    },
    {
      code: 'type X = {\nfoo: string,\n[key: string]: number,\n}',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 1,
        line: 3,
        message: 'Unexpected trailing delimiter'
      }],
      options: ['never'],
      output: 'type X = {\nfoo: string,\n[key: string]: number\n}'
    },
    {
      code: 'type X = {\naReallyLongPropertyNameHere: string,\n[key: string]: number,\n}',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 1,
        line: 3,
        message: 'Unexpected trailing delimiter'
      }],
      options: ['never'],
      output: 'type X = {\naReallyLongPropertyNameHere: string,\n[key: string]: number\n}'
    },
    {
      code: 'type X = { foo: string, [key: string]: number }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { foo: string, [key: string]: number, }'
    },
    {
      code: 'type X = { foo: string; [key: string]: number }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { foo: string; [key: string]: number, }'
    },
    {
      code: 'type X = { foo: string, [key: string]: number; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = { foo: string, [key: string]: number }'
    },
    {
      code: 'type X = {\nfoo: string,\n[key: string]: number\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = {\nfoo: string,\n[key: string]: number,\n}'
    },
    {
      code: 'type X = { foo: string, [key: string]: number; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = { foo: string, [key: string]: number }'
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
    },

    // Empty...
    {
      code: 'type X = {}',
      options: ['never']
    },
    {
      code: 'type X = {}',
      options: ['always']
    },
    {
      code: 'type X = {}',
      options: ['always-multiline']
    },
    {
      code: 'type X = {}',
      options: ['only-multiline']
    },

    // Only indexers...
    {
      code: 'type X = { [key: string]: number }',
      options: ['never']
    },
    {
      code: 'type X = { [key: string]: number, }',
      options: ['always']
    },
    {
      code: 'type X = { [key: string]: number; }',
      options: ['always']
    },
    {
      code: 'type X = { [key: string]: number }',
      options: ['always-multiline']
    },
    {
      code: 'type X = {\n[key: string]: number,\n}',
      options: ['always-multiline']
    },
    {
      code: 'type X = {\n[key: string]: number,\n}',
      options: ['only-multiline']
    },
    {
      code: 'type X = {\n[key: string]: number\n}',
      options: ['only-multiline']
    },
    {
      code: 'type X = { [key: string]: number }',
      options: ['only-multiline']
    },

    // Indexer, Prop...
    {
      code: 'type X = { [key: string]: number, foo: string }',
      options: ['never']
    },
    {
      code: 'type X = { [key: string]: number, foo: string, }',
      options: ['always']
    },
    {
      code: 'type X = { [key: string]: number; foo: string; }',
      options: ['always']
    },
    {
      code: 'type X = { [key: string]: number, foo: string }',
      options: ['always-multiline']
    },
    {
      code: 'type X = {\n[key: string]: number,\nfoo: string,\n}',
      options: ['always-multiline']
    },
    {
      code: 'type X = {\n[key: string]: number,\nfoo: string,\n}',
      options: ['only-multiline']
    },
    {
      code: 'type X = {\n[key: string]: number;\nfoo: string\n}',
      options: ['only-multiline']
    },
    {
      code: 'type X = { [key: string]: number, foo: string }',
      options: ['only-multiline']
    },

    // Prop, Indexer...
    {
      code: 'type X = { foo: string, [key: string]: number }',
      options: ['never']
    },
    {
      code: 'type X = { foo: string, [key: string]: number, }',
      options: ['always']
    },
    {
      code: 'type X = { foo: string; [key: string]: number; }',
      options: ['always']
    },
    {
      code: 'type X = { foo: string, [key: string]: number }',
      options: ['always-multiline']
    },
    {
      code: 'type X = {\nfoo: string,\n[key: string]: number,\n}',
      options: ['always-multiline']
    },
    {
      code: 'type X = {\nfoo: string,\n[key: string]: number,\n}',
      options: ['only-multiline']
    },
    {
      code: 'type X = {\nfoo: string;\n[key: string]: number\n}',
      options: ['only-multiline']
    },
    {
      code: 'type X = { foo: string, [key: string]: number }',
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
    },
    {
      code: 'type X = []',
      options: ['never']
    },
    {
      code: 'type X = []',
      options: ['always']
    },
    {
      code: 'type X = []',
      options: ['always-multiline']
    },
    {
      code: 'type X = []',
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
