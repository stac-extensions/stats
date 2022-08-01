const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

function validate(fixture) {
  return `npx stac-node-validator ./test/fixtures/${fixture} --lint --verbose --schemaMap https://stac-extensions.github.io/stats/v0.2.0/schema.json=./json-schema/schema.json`;
}

const validCases = [
  'valid/catalog.json',
  'valid/empty-catalog.json',
  'valid/catalog-without-stats.json',
  'valid/collection.json',
];

describe('valid cases', () => {
  for (const c of validCases) {
    test(c, async () => {
      await exec(validate(c));
    });
  }
});

const invalidCases = {
  'invalid/bad-count.json': '/stats:items/count',
  'invalid/bad-extensions.json': '/stats:collections/extensions/example',
  'invalid/extra-items-stats.json': 'must NOT have additional properties',
  'invalid/missing-stats.json': 'must match a schema in anyOf',
  'invalid/extra-stats.json': 'must NOT have additional properties',
};

describe('invalid cases', () => {
  for (const c in invalidCases) {
    test(c, async () => {
      await expect(() => exec(validate(c))).rejects.toThrow(invalidCases[c]);
    });
  }
});
