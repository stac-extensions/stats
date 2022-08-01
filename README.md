# Stats Extension Specification

- **Title:** Stats
- **Identifier:** <https://stac-extensions.github.io/stats/v0.2.0-dev/schema.json>
- **Scope:** Catalog, Collection
- **Extension [Maturity
  Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):**
  Proposal
- **Owner**: @tschaub

This document explains the Stats Extension to the [SpatioTemporal Asset
Catalog](https://github.com/radiantearth/stac-spec) (STAC) specification.

Catalogs and collections using this extension include additional information summarizing the resource types included.
Top-level catalogs can report counts of child catalogs, collections, or items and can include information on the
versions, extensions, and asset types (in the case of items) used by those resources.
 
- Examples:
  - [Catalog with all stats](examples/catalog-with-all-stats/catalog.json): Shows the basic usage of the extension in a
    STAC Item
  - [Collection with item stats](examples/catalog-with-no-stats/collection.json): Shows the basic usage of the extension
    in a STAC Collection
- [JSON Schema](json-schema/schema.json)
- [Changelog](./CHANGELOG.md)

## Top-Level Catalog or Collection Fields

| Field Name           | Type                           | Description |
| -------------------- | ------------------------------ | ----------- |
| stats                | [Stats Object](#stats-object)  | (**REQUIRED**) A lookup of stats. |

### Stats Object

The stats object includes information about the resources included in a catalog or collection.

| Field Name  | Type   | Description |
| ----------- | ------ | ----------- |
| catalogs    | object | Stats for child catalogs. |
| collections | object | Stats for child collections. |
| items       | object | Stats for items linked to by a catalog or collection. |

## Contributing

All contributions are subject to the [STAC Specification Code of
Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md). For contributions, please follow the
[STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md)
Instructions for running tests are copied here for convenience.

### Running tests

The same checks that run as checks on PR's are part of the repository and can be run locally to verify that changes are
valid. To run tests locally, you'll need `npm`, which is a standard part of any [node.js
installation](https://nodejs.org/en/download/).

First you'll need to install everything with npm once. Just navigate to the root of this repository and on your command
line run:
```bash
npm install
```

Then to check markdown formatting and test the examples against the JSON schema, you can run:
```bash
npm test
```

This will spit out the same texts that you see online, and you can then go and fix your markdown or examples.

If the tests reveal formatting problems with the examples, you can fix them with:
```bash
npm run format-examples
```
