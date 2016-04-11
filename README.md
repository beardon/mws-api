mws-api
======

Amazon MWS Node.js modules are a mess. This project is based on multiple projects from [this](https://github.com/eibbors/mws-js/network).

Promise based. Only compatible with Node ^4.0.0. (unless someone adds a babel precompilation step)

Supports throttling and pagification. (NextToken stuff)

Examples
--------

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

Usage:

```javascript

mws.Feeds.ListOrders({
  MarketplaceId: 'lel',
  MaxResultsPerPage: 10,
  CreatedAfter: new Date(1,1,2015),
  CreatedBefore: new Date(1,2,2015)
})
.then(({ result, metadata }) => {
  // result
});
```
