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
versions, extensions, and asset types (in the case of items) used by those resources.  Collections or sub-catalogs
can also report statistics on child resources instead of having this reported at the top level.
 
- Examples:
  - [Catalog with all stats](examples/catalog-with-all-stats/catalog.json): Shows the usage of the extension in a
    top-level Catalog
  - [Collection with item stats](examples/catalog-with-no-stats/collection.json): Shows the usage of the extension
    in a Collection (instead of at the top-level Catalog)
- [JSON Schema](json-schema/schema.json)
- [Changelog](./CHANGELOG.md)

## Top-Level Catalog or Collection Fields

| Field Name           | Type                                     | Description                                  |
| -------------------- | ---------------------------------------- | -------------------------------------------- |
| stats:catalogs       | [Catalogs Stats](#catalogs-stats)        | A lookup of stats for all child catalogs.    |
| stats:collections    | [Collections Stats](#collections-stats)  | A lookup of stats for all child collections. |
| stats:items          | [Items Stats](#items-stats)              | A lookup of stats for all child items.       |

### Catalogs Stats

Information about the resources included in all child catalogs.

| Field Name  | Type   | Description |
| ----------- | ------ | ----------- |
| count       | number | **REQUIRED.** The count of all child catalogs. |
| versions    | object | A lookup of counts for all versions. Keys are version identifiers, and values are integer counts. |
| extensions  | object | A lookup of counts for all extensions. Keys are extension identifiers, and values are integer counts. |
| conformance | object | A lookup of counts for STAC API conformance classes. Keys are conformance URIs, and values are integer counts. |

Example `stats:catalogs` that might be found in a top-level catalog with three child sub-catalogs.

```json
{
  "stats:catalogs": {
    "count": 3,
    "versions": {
      "1.0.0": 1,
      "1.0.0-beta.2": 2
    }
  }
}
```

### Collections Stats

Information about the resources included in all child collections.

| Field Name  | Type   | Description |
| ----------- | ------ | ----------- |
| count       | number | **REQUIRED.** The count of all child collections. |
| versions    | object | A lookup of counts for all versions. Keys are version identifiers, and values are integer counts. |
| extensions  | object | A lookup of counts for all extensions. Keys are extension identifiers, and values are integer counts. |

Example `stats:collections` that might be found in a top-level catalog with four child collections (two of which use an extension).

```json
{
  "stats:collections": {
    "count": 4,
    "versions": {
      "1.0.0": 4
    },
    "extensions": {
      "https://stac-extensions.github.io/eo/v1.0.0/schema.json": 2
    }
  }
}
```

### Items Stats

Information about the resources included in all child items.

| Field Name  | Type   | Description |
| ----------- | ------ | ----------- |
| count       | number | **REQUIRED.** The count of all child items. |
| versions    | object | A lookup of counts for all versions. Keys are version identifiers, and values are integer counts. |
| extensions  | object | A lookup of counts for all extensions. Keys are extension identifiers, and values are integer counts. |
| assets      | object | A lookup of counts for all assets. Keys are asset types, and values are integer counts. |

Example `stats:items` that might be found in a collection with 100 items.

```json
{
  "stats:items": {
    "count": 100,
    "versions": {
      "1.0.0-beta.2": 20,
      "1.0.0": 80
    },
    "extensions": {
      "https://stac-extensions.github.io/eo/v1.0.0/schema.json": 80,
      "https://stac-extensions.github.io/raster/v1.0.0/schema.json": 50
    },
    "assets": {
      "image/jpeg": 20,
      "image/png": 30,
      "image/tiff; application=geotiff; profile=cloud-optimized": 50
    }
  }
}
```

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
