
Of course. I will format the Preliminary Design Review (PDR) for the Endeavor AI Order Entry UI as a Markdown (`.md`) document, which you can easily copy and export for use in Notion.

This format uses standard Markdown tables and headers for structure, which aligns well with Notion's ingestion and database features (e.g., in a "Prompt Engineering" or "Product Documentation" database).

---

# Endeavor AI Order Entry UI: Preliminary Design Review (PDR)

Version: 1.0

Date: 2025-10-25

Scope: Order Entry UI - Concise Requirements

## 1. Project Summary

The goal of this PDR is to establish the preliminary technical and functional design for the updated Endeavor AI Order Entry UI. This ensures all stated requirements, particularly around inventory, pricing, fulfillment, and system integrations, can be met before detailed design and development commence.

|**Property**|**Value**|**Notes**|
|---|---|---|
|**Project Name**|Endeavor AI Order Entry UI Update|Updated interface for order placement and modification.|
|**Primary Goal**|Consolidate core order entry functionality (Inventory, Pricing, Fulfillment) and enforce key business rules (PO Validation, Pricing).|-|
|**Key Success Metric**|15% reduction in Order Entry errors (manual pricing, inventory allocation, PO issues) within 3 months of Phase 2 rollout.|Measure of operational efficiency improvement.|
|**Key Stakeholders**|Sales, Fulfillment/Warehouse, Finance, IT/Development.|-|

## 2. High-Level Architecture & Integrations

The new Order Entry UI will serve as a modern **Front-End Layer** communicating with multiple back-end systems via a **Centralized Order Service API**.

|**System/Interface**|**Purpose**|**Data Flow**|
|---|---|---|
|**ERP/MRP** (Source of Truth)|Inventory, Customer Pricing Records, Customer IDs, Payment Terms, CRC/POP Code.|Read/Write (Order creation)|
|**PowerBI API**|Real-time retrieval of **NOD Minimum Price**.|Read-Only|
|**DS Integration API** (If Available)|**Freight Calculation** service.|Read/Call|
|**Order Service API** (New)|Manages complex business logic (Line Splitting, PO Validation, Order State transitions, Accessorials logic).|Orchestration/Logic|
|**Perfection System**|Order Hold/Recall messaging.|Write/Messaging|

## 3. Functional Requirements and Design Intent

### A. Core Order Entry (Inventory, Pricing, Adjustments)

|**Requirement**|**Design Intent / Technical Notes**|**Related System**|
|---|---|---|
|**Context Display** (Order Source, Time, Contact)|Read-only fields populated upon order initiation for internal tracking.|Order Service/ERP|
|**Multi-Warehouse Inventory**|Display real-time stock levels for all warehouses for a given line item.|ERP API|
|**Line Splitting** & Auto-Order|Allow user to allocate a quantity to a different warehouse/location. The Order Service API must auto-create a separate, linked PO/Order with its own `ship-via`, etc.|Order Service/ERP|
|**Honor Customer Pricing/Breaks**|Default pricing must reflect customer-specific records.|ERP API|
|**Price Override** (w/ Code)|A required field for an **Override Code** must be captured and logged when a price is manually changed.|UI / Order Service|
|**Show NOD Minimum Price**|Display real-time minimum price sourced from the PowerBI API.|PowerBI API|
|**Dated Billing**|UI field/selector for specifying the date for billing (Requires **Clarification** - see Section 5).|UI / Order Service|
|**Promo Codes** (Price/Free Goods)|Input field for promo code, with Order Service API handling validation and calculating the price impact or adding free goods line items.|Order Service|
|**Order/Line Discounts**|Dedicated fields for applying discounts at the header or line level.|UI / Order Service|
|**Alternate Ship-To** (Customer's Customer)|Allow temporary or one-off change of ship-to address for the current order.|UI / Order Service|
|**Notes** (Line & PO Levels)|Text input fields to capture detailed notes for fulfillment and planning.|ERP / Order Service|

### B. Fulfillment, Validation, and State Management

|**Requirement**|**Design Intent / Technical Notes**|**Phase**|
|---|---|---|
|**Ship-Via Options**|Dropdown/Selection for OT, WC, PD, CC.|P1|
|**Accessorials** (Hazmat, Liftgate)|Conditional UI to select accessorials. Requires an **Approver Name** field to be filled for tracking. Supports 3rd-party billing flag.|P1|
|**PO Field Entry & Validation**|PO is a required text field. New logic in Order Service API to perform **customer-specific validation** rules.|**P1**|
|**Choose Freight Override Code**|Required selection when calculated freight is below the minimum threshold.|**P1**|
|**Calculate Freight**|Order Service calls the DS integration API (if available) to calculate and apply freight cost.|P1|
|**Warehouse Notes**|Field for notes specific to the warehouse/fulfillment team.|**P1**|
|**Order State Management**|UI button/action to **Place on Hold** (not PI) and a separate **Recall** action to finalize.|P1|
|**Convert Order $\leftrightarrow$ Quote**|Button/Action to toggle the order's status type in the system.|P1|

### C. Display-Only (Read-Only) Fields

|**Requirement**|**Source System**|**Phase**|
|---|---|---|
|**Customer $\#$** (Bill-to, Ship-to, Servicing Location)|ERP|P1|
|**Payment Terms**|ERP/API (If available)|**P1** (API-gated)|
|**CRC / POP Code**|ERP/API (If available)|**P1** (API-gated)|
|**Freight-Prepaid Minimum** (Dashboard Display)|New API|**P2** (Dashboard)|

## 4. Phasing and Implementation Strategy

|**Phase**|**Core Functional Focus**|**Key Dependencies**|**Status**|
|---|---|---|---|
|**Phase 1**|**Functional Parity + Business Rules Enforcement.** Includes all core Order Entry, Fulfillment logic, and the new **PO Validation** and **Warehouse Notes** functionality. API integration for P1 display-only fields is critical.|Availability of ERP Customer Data APIs; Finalized PO Validation Rules.|Allocated|
|**Phase 2**|**Operational Dashboard Integration.** Focus on displaying the **Freight-Prepaid Minimum** on a dashboard view for sales/operations teams.|Availability of the Freight-Prepaid Minimum API.|Allocated|

## 5. Open Issues and Risks (PDR Review Items)

| **ID**      | **Type**          | **Description**                                                                                                                                          | **Proposed Resolution / Action Item**                                                                                                          | **Owner**  |
| ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **OIR-001** | **Clarification** | Define the exact process and system impact of **"Dated billing."** Is this a change to the invoice date, payment due date, or a special customer term?   | Schedule working session with Finance and Billing teams.                                                                                       | PM/Finance |
| **OIR-002** | **Risk**          | The new APIs for **Payment Terms** and **CRC/POP Code** are flagged as "if API available." Lack of API will prevent P1 delivery of these display fields. | Develop UI logic to gracefully degrade (e.g., hide or show "Data Unavailable") and prioritize API development/integration in a parallel track. | Tech Lead  |
| **OIR-003** | **Architecture**  | Confirm the system responsible for managing and distributing the **customer-specific PO Validation** rules to the Order Service API.                     | Document data flow and source system (likely ERP or a new Master Data Service).                                                                | Tech Lead  |
| **OIR-004** | **Scope**         | Confirm if **Alternate Ship-to** needs persistent storage (i.e., saving the new address to the customer record) or if it is only for the single order.   | Clarify with Sales/Operations stakeholders. Defaulting to single-order only for PDR.                                                           | PM         |