'use strict';

const expect = require('chai').expect;

const Feeds = require('../feeds');

describe('xml', () => {
    describe('Feeds', () => {
        describe('_POST_ORDER_ACKNOWLEDGEMENT_DATA_', () => {
            it('should handle 0 items with basic data', () => {
                const FeedContent = Feeds._POST_ORDER_ACKNOWLEDGEMENT_DATA_({
                    MessageID: 1,
                    AmazonOrderID: '123-4567890-1234567',
                    MerchantOrderID: '12345',
                    StatusCode: 'Success',
                    MerchantIdentifier: '67890'
                });
                const xml = '<?xml version="1.0" encoding="iso-8859-1"?><AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="amzn-envelope.xsd"><Header><DocumentVersion>1.01</DocumentVersion><MerchantIdentifier>67890</MerchantIdentifier></Header><MessageType>OrderAcknowledgement</MessageType><Message><MessageID>1</MessageID><OrderAcknowledgement><AmazonOrderID>123-4567890-1234567</AmazonOrderID><MerchantOrderID>12345</MerchantOrderID><StatusCode>Success</StatusCode></OrderAcknowledgement></Message></AmazonEnvelope>'

                expect(FeedContent).to.equal(xml);
            });

            it('should handle 1 item with basic data', () => {
                const FeedContent = Feeds._POST_ORDER_ACKNOWLEDGEMENT_DATA_({
                    MessageID: 1,
                    AmazonOrderID: '123-4567890-1234567',
                    MerchantOrderID: '12345',
                    StatusCode: 'Success',
                    MerchantIdentifier: '67890',
                    Item: {
                        AmazonOrderItemCode: '12345',
                        MerchantOrderItemID: '54321'
                    }
                });
                const xml = '<?xml version="1.0" encoding="iso-8859-1"?><AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="amzn-envelope.xsd"><Header><DocumentVersion>1.01</DocumentVersion><MerchantIdentifier>67890</MerchantIdentifier></Header><MessageType>OrderAcknowledgement</MessageType><Message><MessageID>1</MessageID><OrderAcknowledgement><AmazonOrderID>123-4567890-1234567</AmazonOrderID><MerchantOrderID>12345</MerchantOrderID><StatusCode>Success</StatusCode><Item><AmazonOrderItemCode>12345</AmazonOrderItemCode><MerchantOrderItemID>54321</MerchantOrderItemID></Item></OrderAcknowledgement></Message></AmazonEnvelope>'

                expect(FeedContent).to.equal(xml);
            });
        });

        describe('_POST_ORDER_FULFILLMENT_DATA_', () => {
            it('should handle a single tracking number', () => {
                const FeedContent = Feeds._POST_ORDER_FULFILLMENT_DATA_({
                    MessageID: 1,
                    MerchantOrderID: 1234567,
                    MerchantFulfillmentID: 1234567,
                    FulfillmentDate: '2002-05-01T15:36:33-08:00',
                    CarrierCode: 'UPS',
                    ShippingMethod: 'Second Day',
                    ShipperTrackingNumber: '1234567890'
                });
                const xml = '<?xml version="1.0" encoding="iso-8859-1"?><AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="amzn-envelope.xsd"><Header><DocumentVersion>1.01</DocumentVersion></Header><MessageType>OrderFulfillment</MessageType><Message><MessageID>1</MessageID><OrderFulfillment><MerchantOrderID>1234567</MerchantOrderID><MerchantFulfillmentID>1234567</MerchantFulfillmentID><FulfillmentDate>2002-05-01T15:36:33-08:00</FulfillmentDate><FulfillmentData><CarrierCode>UPS</CarrierCode><ShippingMethod>Second Day</ShippingMethod><ShipperTrackingNumber>1234567890</ShipperTrackingNumber></FulfillmentData></OrderFulfillment></Message></AmazonEnvelope>'

                expect(FeedContent).to.equal(xml);
            });

            it('should handle a single tracking number as an array', () => {
                const FeedContent = Feeds._POST_ORDER_FULFILLMENT_DATA_({
                    MessageID: 1,
                    MerchantOrderID: 1234567,
                    MerchantFulfillmentID: 1234567,
                    FulfillmentDate: '2002-05-01T15:36:33-08:00',
                    CarrierCode: 'UPS',
                    ShippingMethod: 'Second Day',
                    ShipperTrackingNumber: ['1234567890']
                });
                const xml = '<?xml version="1.0" encoding="iso-8859-1"?><AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="amzn-envelope.xsd"><Header><DocumentVersion>1.01</DocumentVersion></Header><MessageType>OrderFulfillment</MessageType><Message><MessageID>1</MessageID><OrderFulfillment><MerchantOrderID>1234567</MerchantOrderID><MerchantFulfillmentID>1234567</MerchantFulfillmentID><FulfillmentDate>2002-05-01T15:36:33-08:00</FulfillmentDate><FulfillmentData><CarrierCode>UPS</CarrierCode><ShippingMethod>Second Day</ShippingMethod><ShipperTrackingNumber>1234567890</ShipperTrackingNumber></FulfillmentData></OrderFulfillment></Message></AmazonEnvelope>'

                expect(FeedContent).to.equal(xml);
            });

            it('should handle multiple tracking numbers', () => {
                const FeedContent = Feeds._POST_ORDER_FULFILLMENT_DATA_({
                    MessageID: 1,
                    MerchantOrderID: 1234567,
                    MerchantFulfillmentID: 1234567,
                    FulfillmentDate: '2002-05-01T15:36:33-08:00',
                    CarrierCode: 'UPS',
                    ShippingMethod: 'Second Day',
                    ShipperTrackingNumber: ['1234567890', '1234567899']
                });
                const xml = '<?xml version="1.0" encoding="iso-8859-1"?><AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="amzn-envelope.xsd"><Header><DocumentVersion>1.01</DocumentVersion></Header><MessageType>OrderFulfillment</MessageType><Message><MessageID>1</MessageID><OrderFulfillment><MerchantOrderID>1234567</MerchantOrderID><MerchantFulfillmentID>1234567</MerchantFulfillmentID><FulfillmentDate>2002-05-01T15:36:33-08:00</FulfillmentDate><FulfillmentData><CarrierCode>UPS</CarrierCode><ShippingMethod>Second Day</ShippingMethod><ShipperTrackingNumber>1234567890</ShipperTrackingNumber><ShipperTrackingNumber>1234567899</ShipperTrackingNumber></FulfillmentData></OrderFulfillment></Message></AmazonEnvelope>'

                expect(FeedContent).to.equal(xml);
            });
        });
    });
});


