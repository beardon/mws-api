mws-api
======

Amazon MWS Node.js modules are a mess. This project is based on multiple projects from [this](https://github.com/eibbors/mws-js/network).

Promise based. Only compatible with Node ^4.0.0. (unless someone adds a babel precompilation step)

Supports throttling and pagification. (NextToken stuff)

Examples
--------

Installation:
```
npm i mws-api -S
```

Initialization:

```javascript
const MWSClient = require('mws-api');
const mws = new MWSClient({
  accessKeyId: 'lol',
  secretAccessKey: 'kek',
  merchantId: 'hue',
  meta: {
    retry: true, // retry requests when throttled
    next: true, // auto-paginate
    limit: Infinity // only get this number of items (NOT the same as MaxRequestsPerPage)
  }
});
```

For other countries, also set the `host` parameter, according to the `MarketPlaceId` you are using, otherwise it leads to `AccessDenied` error. For example:
```javascript
...
const mws = new MWSClient({
  host: 'mws.amazonservices.co.uk', // .de, .es, .fr, .it, etc
  ...
}
```

Usage:

```javascript

mws.Orders.ListOrders({
  MarketplaceId: 'lel',
  MaxResultsPerPage: 10,
  CreatedAfter: new Date(1,1,2015),
  CreatedBefore: new Date(1,2,2015)
})
.then(({ result, metadata }) => {
  // result
});
```

Flat files:

When working with a flat-file response from Amazon, a `parseCSVResult` function is provided as an
option to conviniently post-process the result. Returning a Promise will result in the Promise being resolved.

```javascript
// An example to change the encoding of the raw response
const iconv = require('iconv-lite');
const MWSClient = require('mws-api');
const mws = new MWSClient({
  accessKeyId: 'lol',
  secretAccessKey: 'kek',
  merchantId: 'hue',
  meta: {
    parseCSVResult: (data) => iconv.encode(data, 'utf-8').toString()
  }
});
```
