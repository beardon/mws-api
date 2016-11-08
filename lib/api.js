import createFeeds from './api/feeds';
import createFinances from './api/finances';
import createFulfillmentInboundShipment from './api/fulfillment/inbound';
import createFulfillmentInventory from './api/fulfillment/inventory';
import createFulfillmentOutboundShipment from './api/fulfillment/outbound';
import createMerchantFulfillment from './api/merchant';
import createOrders from './api/orders';
import createProducts from './api/products';
import createRecommendations from './api/recommendations';
import createReports from './api/reports';
import createSellers from './api/sellers';
import createSubscriptions from './api/subscriptions';

export default (client) => ({
    Feeds: createFeeds(client),
    Finances: createFinances(client),
    FulfillmentInboundShipment: createFulfillmentInboundShipment(client),
    FulfillmentInventory: createFulfillmentInventory(client),
    FulfillmentOutboundShipment: createFulfillmentOutboundShipment(client),
    MerchantFulfillment: createMerchantFulfillment(client),
    Orders: createOrders(client),
    Products: createProducts(client),
    Recommendations: createRecommendations(client),
    Reports: createReports(client),
    Sellers: createSellers(client),
    Subscriptions: createSubscriptions(client)
});
