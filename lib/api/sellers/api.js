import { STRING } from '../../types';

const required = true;

export const GetServiceStatus = {};

export const ListMarketplaceParticipations = {};

export const ListMarketplaceParticipationsByNextToken = {
    params: {
        NextToken: { required, type: STRING }
    }
};
