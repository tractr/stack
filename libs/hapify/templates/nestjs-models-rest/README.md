# Hapify - NestJS Models REST

This package contains the hapify templates to generate nestjs REST API.

## Installation

```sh
npm install @trxn/hapify-templates-nestjs-models --save-dev
```

## Usage

In your `package.json`:

```javascript
{
  "name": "my-library",
  "version": "1.0.0",
  "hapify": { "extends": ["@trxn/hapify-templates-nestjs-models"] }
}
```

If you would like to extend or modify these properties, create a `.hapifyrc.js`
file in your projects root directory and export your desired modifications.

```javascript
module.exports = {
  extends: ['hapify-templates-nestjs-models'],
};
```

Or you can create a `.hapifyrc.json` file in your projects root directory.

```javascript
{ "extends": [ '@trxn/hapify-templates-nestjs-models' ] }
```
