export default {
  invalid: [
    {
      code: `type INode = {||};
type Identifier = {|
  ...INode,
  +aaa: string,
|};`,
      errors: [{
        message: 'Flow type with spread property and all readonly properties must be wrapped in \'$ReadOnly<…>\' to prevent accidental loss of readonly-ness.',
      }],
    },
    {
      code: `type INode = {||};
type Identifier = {|
  ...INode,
  +aaa: string,
  +bbb: string,
|};`,
      errors: [{
        message: 'Flow type with spread property and all readonly properties must be wrapped in \'$ReadOnly<…>\' to prevent accidental loss of readonly-ness.',
      }],
    },
  ],

  valid: [
    // Object with spread operator:
    {
      code: `type INode = {||};
type Identifier = {|
  ...INode,
  name: string,
|};`,
    },
    {
      code: `type INode = {||};
type Identifier = {|
  ...INode,
  name: string, // writable on purpose
  +surname: string,
|};`,
    },

    // Object without spread operator:
    {
      code: `type Identifier = {|
  +name: string,
|};`,
    },

    // Read-only object with spread:
    {
      code: `type INode = {||};
type Identifier = $ReadOnly<{|
  ...INode,
  +name: string,
|}>;`,
    },
    {
      code: `type INode = {||};
type Identifier = $ReadOnly<{|
  ...INode,
  name: string, // writable on purpose
|}>;`,
    },

    // Write-only object with spread:
    {
      code: `type INode = {||};
type Identifier = $ReadOnly<{|
  ...INode,
  -name: string,
|}>;`,
    },
  ],
};
