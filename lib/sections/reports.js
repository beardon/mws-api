'use strict';

const _ = require('lodash');
const Enum = require('../enum');
const Type = require('../types');

const list = true;
const required = true;

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
            ReportId: { required }
        }
    },

    GetReportCount: {
        params: {
            ReportTypeList: { name: 'ReportTypeList.Type', list },
            Acknowledged: { type: Type.BOOLEAN },
            AvailableFromDate: { type: Type.TIMESTAMP },
            AvailableToDate: { type: Type.TIMESTAMP }
        }
    },

    GetReportList: {
        params: {
            MaxCount: {},
            ReportTypeList: { name: 'ReportTypeList.Type', list },
            Acknowledged: { type: Type.BOOLEAN },
            AvailableFromDate: { type: Type.TIMESTAMP },
            AvailableToDate: { type: Type.TIMESTAMP },
            ReportRequestIdList: { name: 'ReportRequestIdList.Id', list }
        }
    },

    GetReportListByNextToken: {
        params: {
            NextToken: { required }
        }
    },

    GetReportRequestCount: {
        params: {
            RequestedFromDate: { type: Type.TIMESTAMP },
            RequestedToDate: { type: Type.TIMESTAMP },
            ReportTypeList: { name: 'ReportTypeList.Type', list },
            ReportProcessingStatusList: { name: 'ReportProcessingStatusList.Status', list, type: 'reports.ReportProcessingStatuses' }
        }
    },

    GetReportRequestList: {
        params: {
            MaxCount: {},
            RequestedFromDate: { type: Type.TIMESTAMP },
            RequestedToDate: { type: Type.TIMESTAMP },
            ReportRequestIdList: { name: 'ReportRequestIdList.Id', list },
            ReportTypeList: { name: 'ReportTypeList.Type', list },
            ReportProcessingStatuses: { name: 'ReportProcessingStatusList.Status', list, type: 'reports.ReportProcessingStatuses' }
        }
    },

    GetReportRequestListByNextToken: {
        params: {
            NextToken: { required }
        }
    },

    CancelReportRequests: {
        params: {
            RequestedFromDate: { type: Type.TIMESTAMP },
            RequestedToDate: { type: Type.TIMESTAMP },
            ReportRequestIdList: { name: 'ReportRequestIdList.Id', list },
            ReportTypeList: { name: 'ReportTypeList.Type', list },
            ReportProcessingStatusList: { name: 'ReportProcessingStatusList.Status', list, type: 'reports.ReportProcessingStatuses' }
        }
    },

    RequestReport: {
        params: {
            ReportType: { required },
            MarketplaceIdList: { name: 'MarketplaceIdList.Id', list },
            StartDate: { type: Type.TIMESTAMP },
            EndDate: { type: Type.TIMESTAMP },
            ReportOptions: { type: 'reports.ReportOptions' }
        }
    },

    ManageReportSchedule: {
        params: {
            ReportType: { required },
            Schedule: { type: 'reports.Schedules', required },
            ScheduleDate: { type: Type.TIMESTAMP }
        }
    },

    GetReportScheduleList: {
        params: {
            ReportTypeList: { name: 'ReportTypeList.Type', list }
        }
    },

    GetReportScheduleListByNextToken: {
        params: {
            NextToken: { required }
        }
    },

    GetReportScheduleCount: {
        params: {
            ReportTypeList: { name: 'ReportTypeList.Type', list }
        }
    },

    UpdateReportAcknowledgements: {
        params: {
            ReportIdList: { name: 'ReportIdList.Id', list, required },
            Acknowledged: { type: Type.BOOLEAN }
        }
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests
};
