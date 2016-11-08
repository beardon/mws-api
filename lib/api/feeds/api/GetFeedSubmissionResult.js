import {
    STRING
} from '../../../types';

const required = true;

export default {
    params: {
        FeedSubmissionId: { required, type: STRING }
    },
    basePath: 'AmazonEnvelope.Message',
    data: 'ProcessingReport'
};
