import {
    CATEGORY_QUERY,
    ENUM,
    LIST,
    MARKETPLACE_ID,
    STRING
} from '../../types';

import { RecommendationCategory } from './enums';

const isArray = true;
const required = true;

export const GetLastUpdatedTimeForRecommendations = {
    params: {
        MarketplaceId: { required, type: MARKETPLACE_ID }
    }
};

export const ListRecommendations = {
    params: {
        MarketplaceId: { required, type: MARKETPLACE_ID },
        RecommendationCategory: { type: ENUM(RecommendationCategory) },
        CategoryQueryList: { name: 'CategoryQueryList.CategoryQuery', type: LIST(CATEGORY_QUERY) } // TODO
    },
    data: 'ListRecommendationsResult.ListingQualityRecommendations',
    isArray
};

export const ListRecommendationsByNextToken = {
    params: {
        NextToken: { required, type: STRING }
    },
    data: 'ListRecommendationsByNextTokenResult.SelectionRecommendations',
    isArray
};
