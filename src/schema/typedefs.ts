import { gql } from 'apollo-server';

export const typeDefs = gql`
    # QUERY
    type Query {
        property(
            documentId: String
            streetName: String
            streetNumber: String
            boroughBlockLot: BoroughBlockLotInput
        ): [Property]!
        document(documentId: String!): Document
        parties(name: String, address: AddressInput): [Party]!
        housingMaintenanceCodeViolations(
            boroughBlockLot: BoroughBlockLotInput!
        ): [HousingMaintenanceCodeViolation]!
    }

    # OBJECTS

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/8h5j-fqxa
    """
    type Property {
        bble: ID!
        borough: Borough!
        block: Int!
        lot: Int!
        propertyType: PropertyType
        streetNumber: String
        streetName: String
        unit: String
        documents(documentIds: [String]): [Document]!
        housingMaintenanceCodeViolations(
            orderNumber: String
            inspectionDateBefore: DateTime
            inspectionDateAfter: DateTime
            currentStatus: ViolationCurrentStatus
            violationStatus: ViolationStatus
            apartment: String
            story: String
        ): [HousingMaintenanceCodeViolation]!
        hpdJurisdictionData: HpdJurisdictionData
        valuationAndAssessmentData: [ValuationAndAssessmentData]!
        taxClassData: [TaxClassData]!
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/94g4-w6xz
    """
    type PropertyType {
        recordType: String
        propertyType: String
        description: String
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/kj4p-ruqc
    """
    type HpdJurisdictionData {
        registrationId: Int
        buildingId: Int
        communityBoardId: Int
        managementProgram: String
        numberOfLegalStories: Int
        numberOfApartments: Int
        numberOfRooms: Int
        lifecycleStage: String
        recordStatusId: Int
        recordStatus: HpdJurisdictionRecordStatus
        registrationContacts: [RegistrationContacts]!
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/feu5-w2e2
    """
    type RegistrationContacts {
        type: String
        contactDescription: String
        corporationName: String
        title: String
        firstName: String
        middleInitial: String
        lastName: String
        businessAddress: Address
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/yjxr-fw8i
    """
    type ValuationAndAssessmentData {
        numberOfStories: Int
        marketValue: Int
        actualLandValue: Int
        actualTotalValue: Int
        actualExemptLandValue: Int
        actualExemptLandTotal: Int
        exceptionCodeOne: Int
        transitionalLandValue: Int
        transitionalTotalValue: Int
        transitionalExemptionLandValue: Int
        transitionalExemptionLandTotal: Int
        assessmentYear: String
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/8y4t-faws
    """
    type TaxClassData {
        assessmentAndExemptionValuations: AssessmentAndExemptionValuations
        zoningCode: String
        dimensions: Dimensions
        hasExtension: Boolean
        storyCount: Int
        unitCount: Int
        coopApartmentCount: Int
        coopIdNumber: Int
        buildingConstructionYear: String
    }

    type Dimensions {
        lotFrontageFeet: Int
        lotDepthFeet: Int
        buildingFrontageFeet: Int
        buildingDepthFeet: Int
        totalLandAreaFeet: Int
        grossSquarefootage: Int
        hotelAreaGrossSquarefootage: Int
        officeAreaGrossSquarefootage: Int
        residentialAreaGrossSquarefootage: Int
        retailAreaGrossSquarefootage: Int
        loftAreaGrossSquarefootage: Int
        factoryAreaGrossSquarefootage: Int
        warehouseAreaGrossSquarefootage: Int
        storageAreaGrossSquarefootage: Int
        garageAreaGrossSquarefootage: Int
        otherAreaGrossSquarefootage: Int
    }

    type AssessmentAndExemptionValuations {
        market: AssessmentAndExemptionValuation
        actual: AssessmentAndExemptionValuation
        transitional: AssessmentAndExemptionValuation
        taxable: AssessmentAndExemptionValuation
        tentativeMarket: AssessmentAndExemptionValuation
        tentativeActual: AssessmentAndExemptionValuation
        tentativeTransitional: AssessmentAndExemptionValuation
        tentativeTaxable: AssessmentAndExemptionValuation
        changeByNoticeMarket: AssessmentAndExemptionValuation
        changeByNoticeActual: AssessmentAndExemptionValuation
        changeByNoticeTransitional: AssessmentAndExemptionValuation
        changeByNoticeTaxable: AssessmentAndExemptionValuation
        finalMarket: AssessmentAndExemptionValuation
        finalActual: AssessmentAndExemptionValuation
        finalTransitional: AssessmentAndExemptionValuation
        finalTaxable: AssessmentAndExemptionValuation
        currentMarket: AssessmentAndExemptionValuation
        currentActual: AssessmentAndExemptionValuation
        currentTransitional: AssessmentAndExemptionValuation
        currentTaxable: AssessmentAndExemptionValuation
    }

    type AssessmentAndExemptionValuation {
        assessment: Valuation
        exemption: Valuation
    }

    type Valuation {
        landValue: Int
        totalValue: Int
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/bnx9-e6tj
    """
    type Document {
        id: ID!
        crfn: String
        type: DocumentType!
        dateOnDocument: DateTime
        legalDateRecorded: DateTime
        dateModified: DateTime
        goodThroughDate: DateTime
        amount: String
        parties(name: String, address: AddressInput): [Party!]
    }

    """
    https://data.cityofnewyork.us/resource/7isb-wh4c.json
    """
    type DocumentType {
        typeId: ID!
        documentType: String
        classCodeDescription: String
        partyOneType: String
        partyTwoType: String
        partyThreeType: String
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/636b-3b5g
    """
    type Party {
        partyType: String
        documentId: String
        name: String
        address: Address
        document: Document
    }

    type Address {
        addressLineOne: String
        addressLineTwo: String
        city: String
        state: String
        zipCode: String
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/wvxf-dwi5
    """
    type HousingMaintenanceCodeViolation {
        apartment: String
        story: String
        inspectionDate: String
        originalCertifyByDate: DateTime
        originalCorrectByDate: DateTime
        newCertifyByDate: DateTime
        newCorrectByDate: DateTime
        orderNumber: String
        novDescription: String
        novIssuedDate: DateTime
        currentStatus: ViolationCurrentStatus
        communityBoard: String
        violationStatus: ViolationStatus
    }

    # INPUTS
    input AddressInput {
        addressLineOne: String
        addressLineTwo: String
        city: String
        state: String
        zipCode: String
    }

    input BoroughBlockLotInput {
        borough: Borough
        block: Int
        lot: Int
    }

    # ENUMS
    enum Borough {
        MANHATTAN
        BRONX
        BROOKLYN
        QUEENS
        STATEN_ISLAND
    }

    enum ViolationCurrentStatus {
        CERTIFICATION_POSTPONMENT_DENIED
        CERTIFICATION_POSTPONMENT_GRANTED
        CIV14_MAILED
        COMPLIED_IN_ACCESS_AREA
        DEFECT_LETTER_ISSUED
        FALSE_CERTIFICATION
        FIRST_NO_ACCESS_TO_RE_INSPECT_VIOLATION
        INFO_NOV_SENT_OUT
        INVALID_CERTIFICATION
        NOT_COMPLIED_WITH
        NOTICE_OF_ISSUANCE_SENT_TO_TENANT
        NOV_CERTIFIED_LATE
        NOV_CERTIFIED_ON_TIME
        NOV_SENT_OUT
        SECOND_NO_ACCESS_TO_RE_INSPECT_VIOLATION
        VIOLATION_CLOSED
        VIOLATION_DISMISSED
        VIOLATION_OPEN
        VIOLATION_REOPEN
        VIOLATION_WILL_BE_REINSPECTED
    }

    enum ViolationStatus {
        Open
        Close
    }

    enum HpdJurisdictionRecordStatus {
        Active
        Inactive
        Pending
    }

    # scalars
    scalar DateTime
`;
