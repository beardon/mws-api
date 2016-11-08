import { expect } from 'chai';

import signify from '../signify';

describe('api request signing', function () {
    it('should sign requests correctly', function () {
        const host = 'mws.amazonservices.com';
        const path = '/Orders/2013-09-01';
        const data = {
            'MarketplaceId.Id.1': 'lel',
            Action: 'ListOrders',
            Version: '2013-09-01',
            Timestamp: '2016-11-09T18:18:21.195Z',
            AWSAccessKeyId: 'lol',
            SellerId: 'hue',
            MWSAuthToken: undefined
        };

        const secretAccessKey = 'kek';

        const signature = 'Wuq+FQTUgn20pQUwn+mYNyE1GB8U/0yiT3PiVPHQT4o=';

        expect(signify(host, path, data, secretAccessKey).Signature).to.equal(signature)
    });
});
