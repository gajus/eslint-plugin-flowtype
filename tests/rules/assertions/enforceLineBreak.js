export default {
  invalid: [
    {
      code: '\ntype baz = 6;\nconst hi = 2;\n',
      errors: [{
        message: 'Please enter a line below type declaration',
      }],
      output: '\ntype baz = 6;\n\nconst hi = 2;\n',
    },
    {
      code: 'type foo = 6;\ntype hi = 2;\n',
      errors: [{
        message: 'Please enter a line above type declaration',
      }],
      output: 'type foo = 6;\n\ntype hi = 2;\n',
    },
    {
      code: 'type res = 6;\ntype rod = 2;\n',
      errors: [{
        message: 'Please enter a line above type declaration',
      }],
      output: 'type res = 6;\n\ntype rod = 2;\n',
    },
    {
      code: 'const som = "jes";\n// a comment\ntype fed = "hed";',
      errors: [
        {message: 'Please enter a line above type declaration'},
        {message: 'Please enter a line below type declaration'},
      ],
      output: 'const som = "jes";\n\n// a comment\ntype fed = "hed";\n',
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
type snooze = "dreaming" | "";
`,
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

// Some Comment
type Props = {
  accountBalance: string | number,
  accountNumber: string | number,
};

type RoadT = "grass" | "gravel" | "cement";

`,
    },
  ],
};
