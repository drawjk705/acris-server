import { BOROUGHS_BY_NAME, Borough } from '../reducers/constants';
import {
    stringifyClauses,
    submitQuery,
    createClause,
    ClauseSeparator,
} from './utils';
import { RESOURCES } from './constants';
import {
    TAddress,
    TDateBetween,
    ViolationCurrentStatus,
    ViolationStatus,
} from '../reducers/types';

const propertyTypeCache: { [key: string]: string } = {};

type BoroughBlockLotProps = {
    borough: Borough;
    block: number;
    lot: number;
};

type getPropertyProps = {
    streetNumber: string;
    streetName: string;
} & BoroughBlockLotProps;

export const Property = {
    getProperty: ({
        streetNumber,
        streetName,
        borough,
        block,
        lot,
    }: getPropertyProps) => {
        const query = stringifyClauses(
            [
                createClause.withStringValue({ street_number: streetNumber }),
                createClause.withStringValue({ street_name: streetName }),
                createClause.withNumberValue({
                    borough: BOROUGHS_BY_NAME[borough],
                }),
                createClause.withNumberValue({ block }),
                createClause.withNumberValue({ lot }),
            ],
            ClauseSeparator.AND
        );

        return submitQuery(RESOURCES.RealPropertyLegals, {
            where: query,
        });
    },

    getPropertyTypeData: async ({ propertyType }: { propertyType: string }) => {
        if (propertyTypeCache[propertyType]) {
            return propertyTypeCache[propertyType];
        }
        const query = createClause.withStringValue({
            property_type: propertyType,
        });

        const result = await submitQuery(RESOURCES.PropertyTypeCodes, {
            where: query,
        });

        if (!result.length) {
            return {};
        }
        propertyTypeCache[propertyType] = result[0];
        return result[0];
    },
};

export type getPartiesProps = {
    documentId: string;
    name: string;
    address: Partial<TAddress>;
};
export const Party = {
    getParties: async ({
        documentId,
        name,
        address: { addressLineOne, addressLineTwo, city, state, zipCode } = {},
    }: Partial<getPartiesProps>) => {
        const query = stringifyClauses(
            [
                createClause.withStringValue({ name }),
                createClause.withStringValue({ address_1: addressLineOne }),
                createClause.withStringValue({ address_2: addressLineTwo }),
                createClause.withStringValue({ city }),
                createClause.withStringValue({ state }),
                createClause.withStringValue({ zip: zipCode }),
                createClause.withStringValue({ document_id: documentId }),
            ],
            ClauseSeparator.AND
        );

        return submitQuery(RESOURCES.RealPropertyParties, {
            where: query,
        });
    },
};

type getHousingMaintenanceCodeViolationsProps = {
    orderNumber: string;
    inspectionDateBetween: TDateBetween;
    currentStatus: ViolationCurrentStatus;
    violationStatus: ViolationStatus;
    apartment: string;
    story: string;
} & BoroughBlockLotProps;
export const HousingMaintenanceCodeViolation = {
    getHousingMaintenanceCodeViolations: async ({
        borough,
        block,
        lot,
        orderNumber,
        inspectionDateBetween,
        currentStatus,
        violationStatus,
        apartment,
        story,
    }: getHousingMaintenanceCodeViolationsProps) => {
        const query = stringifyClauses(
            [
                createClause.withNumberValue({
                    boroid: BOROUGHS_BY_NAME[borough],
                }),
                createClause.withNumberValue({ block }),
                createClause.withNumberValue({ lot }),
                createClause.withStringValue({ ordernumber: orderNumber }),
                createClause.withStringValue({ currentstatus: currentStatus }),
                createClause.withStringValue({
                    violationstatus: violationStatus,
                }),
                createClause.withStringValue({ apartment }),
                createClause.withStringValue({ story }),
            ],
            ClauseSeparator.AND
        );
        return submitQuery(RESOURCES.HousingMaintenanceCodeViolation, {
            where: query,
        });
    },
};

export const Document = {
    getDocumentById: async (id: string) => {
        const query = createClause.withStringValue({ document_id: id });

        return submitQuery(RESOURCES.RealPropertyMaster, {
            where: query,
        });
    },
};

export const HpdJurisdictionData = {
    getHpdJurisdictionData: async ({
        borough,
        block,
        lot,
    }: BoroughBlockLotProps) => {
        const query = stringifyClauses(
            [
                createClause.withNumberValue({
                    boroid: BOROUGHS_BY_NAME[borough],
                }),
                createClause.withNumberValue({ block }),
                createClause.withNumberValue({ lot }),
            ],
            ClauseSeparator.AND
        );

        return submitQuery(RESOURCES.BuildingsSubjectToHpdJurisdiction, {
            where: query,
        });
    },
};

type getRegistrationContactsProps = {
    registrationId: number;
};
export const RegistrationContacts = {
    getRegistrationContacts: async ({
        registrationId,
    }: getRegistrationContactsProps) => {
        const query = createClause.withNumberValue({
            registrationid: registrationId,
        });

        return submitQuery(RESOURCES.RegistrationContacts, { where: query });
    },
};
