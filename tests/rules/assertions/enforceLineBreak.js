export default {
  invalid: [
    {
      code: 'type baz = 6;\nconst hi = 2;',
      errors: [{
        message: 'New line required below type declaration',
      }],
      output: 'type baz = 6;\n\nconst hi = 2;',
    },
    {
      code: 'const foo = 6;\ntype hi = 2;\n',
      errors: [
        {message: 'New line required above type declaration'},
      ],
      output: 'const foo = 6;\n\ntype hi = 2;\n',
    },
    {
      code: 'const som = "jes";\n// a comment\ntype fed = "hed";\n',
      errors: [
        {message: 'New line required above type declaration'},
      ],
      output: 'const som = "jes";\n\n// a comment\ntype fed = "hed";\n',
    },
    {
      code: 'type som = "jes";\n// a comment\nconst fed = "hed";\n',
      errors: [
        {message: 'New line required below type declaration'},
      ],
      output: 'type som = "jes";\n\n// a comment\nconst fed = "hed";\n',
    },
    {
      code: 'type hello = 34;\nconst som = "jes";\ntype fed = "hed";\n',
      errors: [
        {message: 'New line required below type declaration'},
        {message: 'New line required above type declaration'},
      ],
      output: 'type hello = 34;\n\nconst som = "jes";\n\ntype fed = "hed";\n',
    },
  ],
  valid: [
    {
      code: 'type gjs = 6;',
    },
    {
      code: 'type gjs = 6;\n\ntype hi = 2;\n',
    },
    {
      code:
`type X = 4;

const red = "serpent";
console.log("hello");

// number or string
type Y = string | number;

// resting + sleep
type snooze = "dreaming" | "";`,
    },
    {
      code:
`type Props = {
  accountBalance: string | number,
  accountNumber: string | number,
};`,
    },
    {
      code:
`const x = 4;
const y = 489;

// Some Comment
type Props = {
  accountBalance: string | number,
  accountNumber: string | number,
};

type RoadT = "grass" | "gravel" | "cement";`,
    },
  ],
};
