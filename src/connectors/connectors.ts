import { Borough } from '../reducers/constants';
import {
    submitQuery,
    ClauseSeparator,
    ClauseRelationship,
    createClause,
} from './utils';
import { RESOURCES } from './constants';
import {
    TAddress,
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
        const query = createClause()
            .addStringSubclause({
                street_number: streetNumber,
            })
            .addStringSubclause({ street_name: streetName })
            .addNumberSubclause({ borough })
            .addNumberSubclause({ block })
            .addNumberSubclause({ lot })
            .stringifyClauses(ClauseSeparator.AND);

        return submitQuery(RESOURCES.RealPropertyLegals, {
            where: query,
        });
    },

    getPropertyTypeData: async ({ propertyType }: { propertyType: string }) => {
        if (propertyTypeCache[propertyType]) {
            return propertyTypeCache[propertyType];
        }
        const query = createClause()
            .addStringSubclause({
                property_type: propertyType,
            })
            .stringifyClauses();

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
        const query = createClause()
            .addStringSubclause({ name })
            .addStringSubclause({ address_1: addressLineOne })
            .addStringSubclause({ address_2: addressLineTwo })
            .addStringSubclause({ city })
            .addStringSubclause({ state })
            .addStringSubclause({ zip: zipCode })
            .addStringSubclause({ document_id: documentId })
            .stringifyClauses(ClauseSeparator.AND);

        return submitQuery(RESOURCES.RealPropertyParties, {
            where: query,
        });
    },
};

type getHousingMaintenanceCodeViolationsProps = {
    orderNumber: string;
    inspectionDateBefore: Date | undefined;
    inspectionDateAfter: Date | undefined;
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
        inspectionDateBefore,
        inspectionDateAfter,
        currentStatus,
        violationStatus,
        apartment,
        story,
    }: Partial<getHousingMaintenanceCodeViolationsProps>) => {
        const query = createClause()
            .addNumberSubclause({
                boroid: borough,
            })
            .addNumberSubclause({ block })
            .addNumberSubclause({ lot })
            .addStringSubclause({ ordernumber: orderNumber })
            .addStringSubclause({ currentstatus: currentStatus })
            .addStringSubclause({
                violationstatus: violationStatus,
            })
            .addStringSubclause({ apartment })
            .addStringSubclause({ story })
            .addDateSubclause(
                { inspectiondate: inspectionDateBefore },
                { relationship: ClauseRelationship.LESS_THAN }
            )
            .addDateSubclause(
                {
                    inspectiondate: inspectionDateAfter,
                },
                { relationship: ClauseRelationship.GREATER_THAN }
            )
            .stringifyClauses(ClauseSeparator.AND);

        return submitQuery(RESOURCES.HousingMaintenanceCodeViolation, {
            where: query,
        });
    },
};

export const Document = {
    getDocumentById: async (id: string) => {
        const query = createClause()
            .addStringSubclause({ document_id: id })
            .stringifyClauses();

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
    }: Partial<BoroughBlockLotProps>) => {
        const query = createClause()
            .addNumberSubclause({
                boroid: borough,
            })
            .addNumberSubclause({ block })
            .addNumberSubclause({ lot })
            .stringifyClauses(ClauseSeparator.AND);

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
        const query = createClause()
            .addNumberSubclause({ registrationid: registrationId })
            .stringifyClauses();

        return submitQuery(RESOURCES.RegistrationContacts, { where: query });
    },
};
