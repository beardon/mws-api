'use strict';

const Type = require('../../types');

const required = true;
const list = true;

const CancelReportRequests = {
    params: {
        RequestedFromDate: { type: Type.DATETIME },
        RequestedToDate: { type: Type.DATETIME },
        ReportRequestIdList: { name: 'ReportRequestIdList.Id', list },
        ReportTypeList: { name: 'ReportTypeList.Type', list },
        ReportProcessingStatusList: { name: 'ReportProcessingStatusList.Status', list, type: 'reports.ReportProcessingStatuses' }
    }
};

const GetReport = {
    params: {
        ReportId: { required }
    }
};

const GetReportCount = {
    params: {
        ReportTypeList: { name: 'ReportTypeList.Type', list },
        Acknowledged: { type: Type.BOOLEAN },
        AvailableFromDate: { type: Type.DATETIME },
        AvailableToDate: { type: Type.DATETIME }
    }
};

const GetReportList = {
    params: {
        MaxCount: {},
        ReportTypeList: { name: 'ReportTypeList.Type', list },
        Acknowledged: { type: Type.BOOLEAN },
        AvailableFromDate: { type: Type.DATETIME },
        AvailableToDate: { type: Type.DATETIME },
        ReportRequestIdList: { name: 'ReportRequestIdList.Id', list }
    }
};

const GetReportListByNextToken = {
    params: {
        NextToken: { required }
    }
};

const GetReportRequestCount = {
    params: {
        RequestedFromDate: { type: Type.DATETIME },
        RequestedToDate: { type: Type.DATETIME },
        ReportTypeList: { name: 'ReportTypeList.Type', list },
        ReportProcessingStatusList: { name: 'ReportProcessingStatusList.Status', list, type: 'reports.ReportProcessingStatuses' }
    }
};

const GetReportRequestList = {
    params: {
        MaxCount: {},
        RequestedFromDate: { type: Type.DATETIME },
        RequestedToDate: { type: Type.DATETIME },
        ReportRequestIdList: { name: 'ReportRequestIdList.Id', list },
        ReportTypeList: { name: 'ReportTypeList.Type', list },
        ReportProcessingStatuses: { name: 'ReportProcessingStatusList.Status', list, type: 'reports.ReportProcessingStatuses' }
    }
};

const GetReportRequestListByNextToken = {
    params: {
        NextToken: { required }
    }
};

const GetReportScheduleCount = {
    params: {
        ReportTypeList: { name: 'ReportTypeList.Type', list }
    }
};

const GetReportScheduleList = {
    params: {
        ReportTypeList: { name: 'ReportTypeList.Type', list }
    }
};

const GetReportScheduleListByNextToken = {
    params: {
        NextToken: { required }
    }
};

const ManageReportSchedule = {
    params: {
        ReportType: { required },
        Schedule: { type: 'reports.Schedules', required },
        ScheduleDate: { type: Type.DATETIME }
    }
};

const RequestReport = {
    params: {
        ReportType: { required, type: Type.REPORT_TYPE },
        MarketplaceIdList: { name: 'MarketplaceIdList.Id', type: Type.LIST(Type.MARKETPLACE_ID) },
        StartDate: { type: Type.DATETIME },
        EndDate: { type: Type.DATETIME },
        ReportOptions: { type: Type.REPORT_OPTIONS }
    },
    validate() {
        // TODO
        return true;
    }
};

const UpdateReportAcknowledgements = {
    params: {
        ReportIdList: { name: 'ReportIdList.Id', list, required },
        Acknowledged: { type: Type.BOOLEAN }
    }
};

module.exports = {
    CancelReportRequests,
    GetReport,
    GetReportCount,
    GetReportList,
    GetReportListByNextToken,
    GetReportRequestCount,
    GetReportRequestList,
    GetReportRequestListByNextToken,
    GetReportScheduleCount,
    GetReportScheduleList,
    GetReportScheduleListByNextToken,
    ManageReportSchedule,
    RequestReport,
    UpdateReportAcknowledgements
};
