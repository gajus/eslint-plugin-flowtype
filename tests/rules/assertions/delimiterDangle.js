const OBJECT_TYPE_ANNOTATION = {
  invalid: [
    {
      code: 'type X = { foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = { foo: string }',
    },
    {
      code: 'type X = { foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = { foo: string }',
    },
    {
      code: 'type X = { foo: string; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = { foo: string }',
    },
    {
      code: 'type X = {\nfoo: string,\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = {\nfoo: string\n}',
    },
    {
      code: 'type X = { foo: string }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { foo: string, }',
    },
    {
      code: 'type X = {\nfoo: string\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = {\nfoo: string,\n}',
    },
    {
      code: 'type X = { foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = { foo: string }',
    },
    {
      code: 'type X = {\nfoo: string\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = {\nfoo: string,\n}',
    },
    {
      code: 'type X = { foo: string; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = { foo: string }',
    },

    // interface override
    {
      code: 'interface X { foo: string; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always', 'never'],
      output: 'interface X { foo: string }',
    },

    // Only indexers...
    {
      code: 'type X = { [key: string]: number, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = { [key: string]: number }',
    },
    {
      code: 'type X = { [key: string]: number }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { [key: string]: number, }',
    },
    {
      code: 'type X = { [key: string]: number, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = { [key: string]: number }',
    },
    {
      code: 'type X = {\n[key: string]: number\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = {\n[key: string]: number,\n}',
    },
    {
      code: 'type X = { [key: string]: number; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = { [key: string]: number }',
    },

    // Indexer, Prop...
    {
      code: 'type X = { [key: string]: number, foo: string, }',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 35,
        line: 1,
        message: 'Unexpected trailing delimiter',
      }],
      options: ['never'],
      output: 'type X = { [key: string]: number, foo: string }',
    },
    {
      code: 'type X = {\n[key: string]: number,\nfoo: string,\n}',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 1,
        line: 3,
        message: 'Unexpected trailing delimiter',
      }],
      options: ['never'],
      output: 'type X = {\n[key: string]: number,\nfoo: string\n}',
    },
    {
      code: 'type X = {\n[key: string]: number,\naReallyLongPropertyNameHere: string,\n}',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 1,
        line: 3,
        message: 'Unexpected trailing delimiter',
      }],
      options: ['never'],
      output: 'type X = {\n[key: string]: number,\naReallyLongPropertyNameHere: string\n}',
    },
    {
      code: 'type X = { [key: string]: number, foo: string }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { [key: string]: number, foo: string, }',
    },
    {
      code: 'type X = {\n[key: string]: number;\nfoo: string\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = {\n[key: string]: number;\nfoo: string,\n}',
    },
    {
      code: 'type X = { [key: string]: number, foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = { [key: string]: number, foo: string }',
    },
    {
      code: 'type X = {\n[key: string]: number,\nfoo: string\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = {\n[key: string]: number,\nfoo: string,\n}',
    },
    {
      code: 'type X = { [key: string]: number, foo: string, }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = { [key: string]: number, foo: string }',
    },

    // Prop, Indexer...
    {
      code: 'type X = { foo: string, [key: string]: number, }',
      errors: [{
        // be sure it's reporting the indexer, not the prop
        column: 25,
        line: 1,
        message: 'Unexpected trailing delimiter',
      }],
      options: ['never'],
      output: 'type X = { foo: string, [key: string]: number }',
    },
    {
      code: 'type X = {\nfoo: string,\n[key: string]: number,\n}',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 1,
        line: 3,
        message: 'Unexpected trailing delimiter',
      }],
      options: ['never'],
      output: 'type X = {\nfoo: string,\n[key: string]: number\n}',
    },
    {
      code: 'type X = {\naReallyLongPropertyNameHere: string,\n[key: string]: number,\n}',
      errors: [{
        // be sure it's reporting the prop, not the indexer
        column: 1,
        line: 3,
        message: 'Unexpected trailing delimiter',
      }],
      options: ['never'],
      output: 'type X = {\naReallyLongPropertyNameHere: string,\n[key: string]: number\n}',
    },
    {
      code: 'type X = { foo: string, [key: string]: number }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { foo: string, [key: string]: number, }',
    },
    {
      code: 'type X = { foo: string; [key: string]: number }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = { foo: string; [key: string]: number, }',
    },
    {
      code: 'type X = { foo: string, [key: string]: number; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = { foo: string, [key: string]: number }',
    },
    {
      code: 'type X = {\nfoo: string,\n[key: string]: number\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = {\nfoo: string,\n[key: string]: number,\n}',
    },
    {
      code: 'type X = { foo: string, [key: string]: number; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = { foo: string, [key: string]: number }',
    },

    // Inexact object notation
    {
      code: 'type X = { ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = { ... }',
    },
    {
      code: 'type X = { ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = { ... }',
    },
    {
      code: 'type X = { ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = { ... }',
    },
    {
      code: 'type X = { ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = { ... }',
    },
    {
      code: 'type X = { ... }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always'],
      output: 'type X = { ..., }',
    },
    {
      code: 'type X = { ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = { ... }',
    },
    {
      code: 'type X = { ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = { ... }',
    },
    {
      code: 'type X = { ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'only-multiline'],
      output: 'type X = { ... }',
    },
    {
      code: 'type X = { ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'only-multiline'],
      output: 'type X = { ... }',
    },
    {
      code: 'type X = {\n...,\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = {\n...\n}',
    },
    {
      code: 'type X = {\n...;\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = {\n...\n}',
    },
    {
      code: 'type X = {\n...,\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = {\n...\n}',
    },
    {
      code: 'type X = {\n...;\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = {\n...\n}',
    },
    {
      code: 'type X = {\n...\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always'],
      output: 'type X = {\n...,\n}',
    },
    {
      code: 'type X = {\n...\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = {\n...,\n}',
    },
    {
      code: 'type X = { foo: string, ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = { foo: string, ... }',
    },
    {
      code: 'type X = { foo: string; ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = { foo: string; ... }',
    },
    {
      code: 'type X = { foo: string, ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = { foo: string, ... }',
    },
    {
      code: 'type X = { foo: string; ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = { foo: string; ... }',
    },
    {
      code: 'type X = { foo: string, ... }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always'],
      output: 'type X = { foo: string, ..., }',
    },
    {
      code: 'type X = { foo: string, ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = { foo: string, ... }',
    },
    {
      code: 'type X = { foo: string; ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = { foo: string; ... }',
    },
    {
      code: 'type X = { foo: string, ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'only-multiline'],
      output: 'type X = { foo: string, ... }',
    },
    {
      code: 'type X = { foo: string; ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'only-multiline'],
      output: 'type X = { foo: string; ... }',
    },
    {
      code: 'type X = {\nfoo: string,\n...,\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = {\nfoo: string,\n...\n}',
    },
    {
      code: 'type X = {\nfoo: string;\n...;\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = {\nfoo: string;\n...\n}',
    },
    {
      code: 'type X = {\nfoo: string,\n...,\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = {\nfoo: string,\n...\n}',
    },
    {
      code: 'type X = {\nfoo: string;\n...;\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = {\nfoo: string;\n...\n}',
    },
    {
      code: 'type X = {\nfoo: string,\n...\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always'],
      output: 'type X = {\nfoo: string,\n...,\n}',
    },
    {
      code: 'type X = {\nfoo: string,\n...\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = {\nfoo: string,\n...,\n}',
    },

    {
      code: 'type X = { [key: string]: number, ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = { [key: string]: number, ... }',
    },
    {
      code: 'type X = { [key: string]: number; ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = { [key: string]: number; ... }',
    },
    {
      code: 'type X = { [key: string]: number, ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = { [key: string]: number, ... }',
    },
    {
      code: 'type X = { [key: string]: number; ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = { [key: string]: number; ... }',
    },
    {
      code: 'type X = { [key: string]: number, ... }',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always'],
      output: 'type X = { [key: string]: number, ..., }',
    },
    {
      code: 'type X = { [key: string]: number, ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = { [key: string]: number, ... }',
    },
    {
      code: 'type X = { [key: string]: number; ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = { [key: string]: number; ... }',
    },
    {
      code: 'type X = { [key: string]: number, ..., }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'only-multiline'],
      output: 'type X = { [key: string]: number, ... }',
    },
    {
      code: 'type X = { [key: string]: number; ...; }',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'only-multiline'],
      output: 'type X = { [key: string]: number; ... }',
    },
    {
      code: 'type X = {\n[key: string]: number,\n...,\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = {\n[key: string]: number,\n...\n}',
    },
    {
      code: 'type X = {\n[key: string]: number;\n...;\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = {\n[key: string]: number;\n...\n}',
    },
    {
      code: 'type X = {\n[key: string]: number,\n...,\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = {\n[key: string]: number,\n...\n}',
    },
    {
      code: 'type X = {\n[key: string]: number;\n...;\n}',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never', 'never', 'never'],
      output: 'type X = {\n[key: string]: number;\n...\n}',
    },
    {
      code: 'type X = {\n[key: string]: number,\n...\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always'],
      output: 'type X = {\n[key: string]: number,\n...,\n}',
    },
    {
      code: 'type X = {\n[key: string]: number,\n...\n}',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['never', 'never', 'always-multiline'],
      output: 'type X = {\n[key: string]: number,\n...,\n}',
    },
  ],
  valid: [
    {
      code: 'type X = { foo: string }',
    },
    {
      code: 'type X = { foo: string }',
      options: ['never'],
    },
    {
      code: 'type X = { foo: string, }',
      options: ['always'],
    },
    {
      code: 'type X = { foo: string; }',
      options: ['always'],
    },
    {
      code: 'type X = {\nfoo: string\n}',
      options: ['never'],
    },
    {
      code: 'type X = {\nfoo: string,\n}',
      options: ['always'],
    },
    {
      code: 'type X = { foo: string }',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {\nfoo: string,\n}',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {\nfoo: string;\n}',
      options: ['always-multiline'],
    },
    {
      code: 'type X = { foo: string }',
      options: ['only-multiline'],
    },
    {
      code: 'type X = {\nfoo: string\n}',
      options: ['only-multiline'],
    },
    {
      code: 'type X = {\nfoo: string,\n}',
      options: ['only-multiline'],
    },
    {
      code: 'type X = {\nfoo: string;\n}',
      options: ['only-multiline'],
    },

    // interface override
    {
      code: 'interface X { foo: string; }',
      options: ['never', 'always'],
    },

    // Empty...
    {
      code: 'type X = {}',
      options: ['never'],
    },
    {
      code: 'type X = {}',
      options: ['always'],
    },
    {
      code: 'type X = {}',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {}',
      options: ['only-multiline'],
    },

    // Only indexers...
    {
      code: 'type X = { [key: string]: number }',
      options: ['never'],
    },
    {
      code: 'type X = { [key: string]: number, }',
      options: ['always'],
    },
    {
      code: 'type X = { [key: string]: number; }',
      options: ['always'],
    },
    {
      code: 'type X = { [key: string]: number }',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number,\n}',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number,\n}',
      options: ['only-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number\n}',
      options: ['only-multiline'],
    },
    {
      code: 'type X = { [key: string]: number }',
      options: ['only-multiline'],
    },

    // Indexer, Prop...
    {
      code: 'type X = { [key: string]: number, foo: string }',
      options: ['never'],
    },
    {
      code: 'type X = { [key: string]: number, foo: string, }',
      options: ['always'],
    },
    {
      code: 'type X = { [key: string]: number; foo: string; }',
      options: ['always'],
    },
    {
      code: 'type X = { [key: string]: number, foo: string }',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number,\nfoo: string,\n}',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number,\nfoo: string,\n}',
      options: ['only-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number;\nfoo: string\n}',
      options: ['only-multiline'],
    },
    {
      code: 'type X = { [key: string]: number, foo: string }',
      options: ['only-multiline'],
    },

    // Prop, Indexer...
    {
      code: 'type X = { foo: string, [key: string]: number }',
      options: ['never'],
    },
    {
      code: 'type X = { foo: string, [key: string]: number, }',
      options: ['always'],
    },
    {
      code: 'type X = { foo: string; [key: string]: number; }',
      options: ['always'],
    },
    {
      code: 'type X = { foo: string, [key: string]: number }',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {\nfoo: string,\n[key: string]: number,\n}',
      options: ['always-multiline'],
    },
    {
      code: 'type X = {\nfoo: string,\n[key: string]: number,\n}',
      options: ['only-multiline'],
    },
    {
      code: 'type X = {\nfoo: string;\n[key: string]: number\n}',
      options: ['only-multiline'],
    },
    {
      code: 'type X = { foo: string, [key: string]: number }',
      options: ['only-multiline'],
    },

    // Inexact object notation
    {
      code: 'type X = { ... }',
    },
    {
      code: 'type X = { ... }',
      options: ['never', 'never', 'never'],
    },
    {
      code: 'type X = { ..., }',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = { ... }',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = { ... }',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\n...\n}',
    },
    {
      code: 'type X = {\n...\n}',
      options: ['never', 'never', 'never'],
    },
    {
      code: 'type X = {\n...,\n }',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = {\n...;\n }',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = {\n...,\n}',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = {\n...;\n}',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = {\n...\n}',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\n...,\n}',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\n...;\n}',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = { foo: string, ... }',
    },
    {
      code: 'type X = { foo: string, ... }',
      options: ['never', 'never', 'never'],
    },
    {
      code: 'type X = { foo: string, ..., }',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = { foo: string; ...; }',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = { foo: string, ... }',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = { foo: string, ... }',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\nfoo: string,\n...\n}',
    },
    {
      code: 'type X = {\nfoo: string,\n...\n}',
      options: ['never', 'never', 'never'],
    },
    {
      code: 'type X = {\nfoo: string,\n...,\n}',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = {\nfoo: string;\n...;\n}',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = {\nfoo: string,\n...,\n}',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = {\nfoo: string;\n...;\n}',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = {\nfoo: string,\n...\n}',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\nfoo: string,\n...,\n}',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\nfoo: string,\n...;\n}',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = { [key: string]: number, ... }',
      options: ['never', 'never', 'never'],
    },
    {
      code: 'type X = { [key: string]: number, ..., }',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = { [key: string]: number; ...; }',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = { [key: string]: number, ... }',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = { [key: string]: number, ... }',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number,\n...\n}',
      options: ['never', 'never', 'never'],
    },
    {
      code: 'type X = {\n[key: string]: number,\n...,\n}',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = {\n[key: string]: number;\n...;\n}',
      options: ['never', 'never', 'always'],
    },
    {
      code: 'type X = {\n[key: string]: number,\n...,\n}',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number;\n...;\n}',
      options: ['never', 'never', 'always-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number,\n...\n}',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number,\n...,\n}',
      options: ['never', 'never', 'only-multiline'],
    },
    {
      code: 'type X = {\n[key: string]: number;\n...;\n}',
      options: ['never', 'never', 'only-multiline'],
    },
  ],
};

const TUPLE_TYPE_ANNOTATION = {
  invalid: [
    {
      code: 'type X = [string, number,]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      output: 'type X = [string, number]',
    },
    {
      code: 'type X = [string, number,]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = [string, number]',
    },
    {
      code: 'type X = [\nstring,\nnumber,\n]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['never'],
      output: 'type X = [\nstring,\nnumber\n]',
    },
    {
      code: 'type X = [string, number]',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = [string, number,]',
    },
    {
      code: 'type X = [\nstring,\nnumber\n]',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always'],
      output: 'type X = [\nstring,\nnumber,\n]',
    },
    {
      code: 'type X = [string, number,]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = [string, number]',
    },
    {
      code: 'type X = [\nfoo, string\n]',
      errors: [{message: 'Missing trailing delimiter'}],
      options: ['always-multiline'],
      output: 'type X = [\nfoo, string,\n]',
    },
    {
      code: 'type X = [ number, string, ]',
      errors: [{message: 'Unexpected trailing delimiter'}],
      options: ['only-multiline'],
      output: 'type X = [ number, string ]',
    },
  ],
  valid: [
    {
      code: 'type X = [string, number]',
    },
    {
      code: 'type X = [string, number]',
      options: ['never'],
    },
    {
      code: 'type X = [\nstring,\nnumber\n]',
      options: ['never'],
    },
    {
      code: 'type X = [string, number,]',
      options: ['always'],
    },
    {
      code: 'type X = [\nstring,\nnumber,\n]',
      options: ['always'],
    },
    {
      code: 'type X = [ foo, string ]',
      options: ['always-multiline'],
    },
    {
      code: 'type X = [\nfoo, string,\n]',
      options: ['always-multiline'],
    },
    {
      code: 'type X = [ number, string ]',
      options: ['only-multiline'],
    },
    {
      code: 'type X = [\nnumber,\nstring\n]',
      options: ['only-multiline'],
    },
    {
      code: 'type X = [\nnumber,\nstring,\n]',
      options: ['only-multiline'],
    },
    {
      code: 'type X = []',
      options: ['never'],
    },
    {
      code: 'type X = []',
      options: ['always'],
    },
    {
      code: 'type X = []',
      options: ['always-multiline'],
    },
    {
      code: 'type X = []',
      options: ['only-multiline'],
    },
  ],
};

const MISCONFIGURED = [
  {
    errors: [
      {
        data: 'occasionally',
        dataPath: '[0]',
        keyword: 'enum',
        message: 'must be equal to one of the allowed values',
        params: {
          allowedValues: [
            'always',
            'always-multiline',
            'only-multiline',
            'never',
          ],
        },
        parentSchema: {
          enum: [
            'always',
            'always-multiline',
            'only-multiline',
            'never',
          ],
          type: 'string',
        },
        schema: [
          'always',
          'always-multiline',
          'only-multiline',
          'never',
        ],
        schemaPath: '#/items/0/enum',

      },
    ],
    options: ['occasionally'],
  },
];

export default {
  invalid: [
    ...OBJECT_TYPE_ANNOTATION.invalid,
    ...TUPLE_TYPE_ANNOTATION.invalid,
  ],
  misconfigured: MISCONFIGURED,
  valid: [
    ...OBJECT_TYPE_ANNOTATION.valid,
    ...TUPLE_TYPE_ANNOTATION.valid,
  ],
};
