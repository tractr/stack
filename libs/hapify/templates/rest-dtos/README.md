# Hapify - Templates for models rest dtos

This package contains the hapify templates to generate REST dtos classes.

## Installation

```sh
npm install @trxn/hapify-templates-rest-dtos --save-dev
```

## Usage

In your `package.json`:

```javascript
{
  "name": "my-library",
  "version": "0.0.1",
  "hapify": { "extends": ["@trxn/hapify-templates-rest-dtos"] }
}
```

If you would like to extend or modify these properties, create a `.hapifyrc.js`
file in your projects root directory and export your desired modifications.

```javascript
module.exports = {
  extends: ['hapify-templates-rest-dtos'],
};
```

Or you can create a `.hapifyrc.json` file in your projects root directory.

```javascript
{ "extends": [ '@trxn/hapify-templates-rest-dtos' ] }
```
