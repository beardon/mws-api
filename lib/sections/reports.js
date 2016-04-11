'use strict';

const _ = require('lodash');
const Enum = require('../enum');

const requestDefaults = {
    name: 'Reports',
    group: 'Reports & Report Scheduling',
    path: '/',
    version: '2009-01-01',
    legacy: true
};

const enums = {
    Schedules() {
        return new Enum(['_15_MINUTES_', '_30_MINUTES_', '_1_HOUR_', '_2_HOURS_', '_4_HOURS_', '_8_HOURS_', '_12_HOURS_', '_72_HOURS_', '_1_DAY_', '_2_DAYS_', '_7_DAYS_', '_14_DAYS_', '_15_DAYS_', '_30_DAYS_', '_NEVER_']);
    },
    ReportProcessingStatuses() {
        return new Enum(['_SUBMITTED_', '_IN_PROGRESS_', '_CANCELLED_', '_DONE_', '_DONE_NO_DATA_']);
    },
    ReportOptions() {
        return new Enum(['ShowSalesChannel=true']);
    }
};

const requests = {
    GetReport: {
        params: {
            ReportId: { name: 'ReportId', required: true }
        }
    },
    GetReportCount: {
        params: {
            ReportTypeList: { name: 'ReportTypeList.Type',  list:  true},
            Acknowledged: { name: 'Acknowledged', type: 'Boolean' },
            AvailableFromDate: { name: 'AvailableFromDate', type: 'Timestamp' },
            AvailableToDate: { name: 'AvailableToDate', type: 'Timestamp' }
        }
    },

    GetReportList: {
        params: {
            MaxCount: { name: 'MaxCount'  },
            ReportTypeList: { name: 'ReportTypeList.Type',  list:  true},
            Acknowledged: { name: 'Acknowledged', type: 'Boolean' },
            AvailableFromDate: { name: 'AvailableFromDate', type: 'Timestamp' },
            AvailableToDate: { name: 'AvailableToDate', type: 'Timestamp' },
            ReportRequestIdList: { name: 'ReportRequestIdList.Id', list: true }
        }
    },

    GetReportListByNextToken: {
        params: {
            NextToken: { name: 'NextToken', required: true }
        }
    },

    GetReportRequestCount: {
        params: {
            RequestedFromDate: { name: 'RequestedFromDate', type: 'Timestamp' },
            RequestedToDate: { name: 'RequestedToDate', type: 'Timestamp' },
            ReportTypeList: { name: 'ReportTypeList.Type', list: true },
            ReportProcessingStatusList: { name: 'ReportProcessingStatusList.Status', list: true, type: 'reports.ReportProcessingStatuses' }
        }
    },

    GetReportRequestList: {
        params: {
            MaxCount: { name: 'MaxCount' },
            RequestedFromDate: { name: 'RequestedFromDate', type: 'Timestamp' },
            RequestedToDate: { name: 'RequestedToDate', type: 'Timestamp' },
            ReportRequestIdList: { name: 'ReportRequestIdList.Id', list: true },
            ReportTypeList: { name: 'ReportTypeList.Type', list: true },
            ReportProcessingStatuses: { name: 'ReportProcessingStatusList.Status', list: true, type: 'reports.ReportProcessingStatuses' }
        }
    },

    GetReportRequestListByNextToken: {
        params: {
            NextToken: { name: 'NextToken', required: true }
        }
    },

    CancelReportRequests: {
        params: {
            RequestedFromDate: { name: 'RequestedFromDate', type: 'Timestamp' },
            RequestedToDate: { name: 'RequestedToDate', type: 'Timestamp' },
            ReportRequestIdList: { name: 'ReportRequestIdList.Id', list: true },
            ReportTypeList: { name: 'ReportTypeList.Type', list: true },
            ReportProcessingStatusList: { name: 'ReportProcessingStatusList.Status', list: true, type: 'reports.ReportProcessingStatuses' }
        }
    },

    RequestReport: {
        params: {
            ReportType: { name: 'ReportType', required: true },
            MarketplaceIdList: { name: 'MarketplaceIdList.Id', list: true, required: false },
            StartDate: { name: 'StartDate', type: 'Timestamp' },
            EndDate: { name: 'EndDate', type: 'Timestamp' },
            ReportOptions: { name: 'ReportOptions', type: 'reports.ReportOptions' }
        }
    },

    ManageReportSchedule: {
        params: {
            ReportType: { name: 'ReportType', required: true },
            Schedule: { name: 'Schedule', type: 'reports.Schedules', required: true },
            ScheduleDate: { name: 'ScheduleDate', type: 'Timestamp' }
        }
    },

    GetReportScheduleList: {
        params: {
            ReportTypeList: { name: 'ReportTypeList.Type', list: true }
        }
    },

    GetReportScheduleListByNextToken: {
        params: {
            NextToken: { name: 'NextToken', required: true }
        }
    },

    GetReportScheduleCount: {
        params: {
            ReportTypeList: { name: 'ReportTypeList.Type', list: true }
        }
    },

    UpdateReportAcknowledgements: {
        params: {
            ReportIdList: { name: 'ReportIdList.Id', list: true, required: true },
            Acknowledged: { name: 'Acknowledged', type: 'Boolean' }
        }
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests
};
