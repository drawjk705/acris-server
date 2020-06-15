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

type BbleProps = {
    bble: string;
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
            .addScalarSubclause({
                street_number: streetNumber,
            })
            .addScalarSubclause({ street_name: streetName })
            .addScalarSubclause({ borough })
            .addScalarSubclause({ block })
            .addScalarSubclause({ lot })
            .stringifyClauses();

        return submitQuery(RESOURCES.RealPropertyLegals, {
            where: query,
        });
    },

    getPropertyTypeData: async ({ propertyType }: { propertyType: string }) => {
        if (propertyTypeCache[propertyType]) {
            return propertyTypeCache[propertyType];
        }
        const query = createClause()
            .addScalarSubclause({
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
            .addScalarSubclause({ name })
            .addScalarSubclause({ address_1: addressLineOne })
            .addScalarSubclause({ address_2: addressLineTwo })
            .addScalarSubclause({ city })
            .addScalarSubclause({ state })
            .addScalarSubclause({ zip: zipCode })
            .addScalarSubclause({ document_id: documentId })
            .stringifyClauses();

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
            .addScalarSubclause({
                boroid: borough,
            })
            .addScalarSubclause({ block })
            .addScalarSubclause({ lot })
            .addScalarSubclause({ ordernumber: orderNumber })
            .addScalarSubclause({ currentstatus: currentStatus })
            .addScalarSubclause({
                violationstatus: violationStatus,
            })
            .addScalarSubclause({ apartment })
            .addScalarSubclause({ story })
            .addDateSubclause(
                { inspectiondate: inspectionDateBefore },
                ClauseRelationship.LESS_THAN
            )
            .addDateSubclause(
                {
                    inspectiondate: inspectionDateAfter,
                },
                ClauseRelationship.GREATER_THAN
            )
            .stringifyClauses();

        return submitQuery(RESOURCES.HousingMaintenanceCodeViolation, {
            where: query,
        });
    },
};

export const Document = {
    getDocumentById: async (id: string) => {
        const query = createClause()
            .addScalarSubclause({ document_id: id })
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
            .addScalarSubclause({
                boroid: borough,
            })
            .addScalarSubclause({ block })
            .addScalarSubclause({ lot })
            .stringifyClauses();

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
            .addScalarSubclause({ registrationid: registrationId })
            .stringifyClauses();

        return submitQuery(RESOURCES.RegistrationContacts, { where: query });
    },
};

export const ValuationAndAssessmentData = {
    getValuationAndAssessmentData: async ({
        bble,
        borough,
        block,
        lot,
    }: BbleProps & BoroughBlockLotProps) => {
        const bbleSubclause = createClause()
            .addScalarSubclause({ bble })
            .stringifyClauses();

        const boroughBlockLotSubclause = createClause()
            .addScalarSubclause({ boro: borough })
            .addScalarSubclause({ block })
            .addScalarSubclause({ lot })
            .stringifyClauses();

        const query = createClause([
            bbleSubclause,
            boroughBlockLotSubclause,
        ]).stringifyClauses({
            separator: ClauseSeparator.OR,
            withParentheses: true,
        });

        return submitQuery(RESOURCES.PropertyValuationAndAssessmentData, {
            where: query,
        });
    },
};

export const TaxClassData = {
    getTaxClassData: ({ borough, block, lot }: BoroughBlockLotProps) => {
        const query = createClause()
            .addScalarSubclause({ boro: borough })
            .addScalarSubclause({ block })
            .addScalarSubclause({ lot })
            .stringifyClauses();

        return submitQuery(RESOURCES.PropertyTaxClassData, { where: query });
    },
};
