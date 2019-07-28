export default {
  invalid: [
    {
      code: 'type T = *;',
      errors: [{message: 'Unexpected use of existential type (*).'}],
    },
    {
      code: 'type T = U<*, *>;',
      errors: [
        {column: 12,
          message: 'Unexpected use of existential type (*).'},
        {column: 15,
          message: 'Unexpected use of existential type (*).'},
      ],
    },
    {
      code: 'const f: (*) => null = () => null;',
      errors: [{message: 'Unexpected use of existential type (*).'}],
    },
  ],
  valid: [
    {
      code: 'type T = string | null',
    },
  ],
};

