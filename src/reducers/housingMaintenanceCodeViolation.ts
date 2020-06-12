import { THousingMaintenanceCodeViolation } from './types';

export const reduceHousingMaintenanceCodeViolation = (
    violationObj: any
): THousingMaintenanceCodeViolation => ({
    apartment: violationObj.apartment,
    story: violationObj.story,
    inspectionDate: violationObj.inspectiondate,
    originalCertifyByDate: violationObj.originalcertifybydate,
    originalCorrectByDate: violationObj.originalcorrectbydate,
    orderNumber: violationObj.ordernumber,
    novDescription: violationObj.novdescription,
    novIssuedDate: violationObj.novissueddate,
    currentStatus: violationObj.currentstatus,
    communityBoard: violationObj.communityboard,
    newCertifyByDate: violationObj.newcertifybydate,
    newCorrectByDate: violationObj.newcorrectbydate,
    violationStatus: violationObj.violationstatus,
});
