export default {
  invalid: [
    {
      code: 'type foo = { [string]: number };',
      errors: [
        {message: 'All indexers must be declared with key name.'},
      ],
      output: 'type foo = { [key: string]: number };',
    },
  ],
  valid: [
    {
      code: 'type foo = { [key: string]: number };',
      errors: [],
    },
    {
      code: 'type foo = { [key: string]: number };',
      errors: [],
      options: ['never'],
    },
    {
      code: 'type foo = { [string]: number };',
      errors: [],
      options: ['never'],
    },
  ],
};
