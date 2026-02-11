# Functional Requirements

## 1 Purpose
Provide council/admin staff with a secure, centralized, offline system to search and retrieve relevant case documents, spreadsheets, and financial information. The system will eliminate manual cross-referencing, reduce, errors, and allow fast answers to queries. 

## 2 Scope
**Ingest & Index**
PDFs, DOCX, Excel Spreadsheet, CSVs and Case Notes.

**Support**
 - Semantic Search (find relevant info even with typos or inconsistent wording)
 - Keyword Search (optional hybrid mode)
 
 **Provide**
 - Quick filtering by case number, date, fund type, parties, or document type
 - Optional summarization or fund entitlement calculation.
 - Secure internal system (no external cloud services)

## 3 User Role
|Role	| Permissions |
|--|--|
| Admin / Staff | Search all documents, view fund information, summarize cases. |
| Manager / Supervisor | All Admin permissions + configure system, manage users |
| Developer / IT | Full access for maintenance, ingestion and development. |



## 4 Functional Requirements

### 4.1 Document Ingestion
-   System must ingest:
    
    -   PDFs, DOCX, Excel, CSV, plain text.
        
    -   Case notes stored as documents or in internal DBs.
        
-   System must extract:
    
    -   Text content, metadata (case number, date, parties, fund type).
        
-   System must chunk long documents for efficient semantic search.
    
-   System must handle batch ingestion for multiple files simultaneously.

### 4.2 Semantic Search
-   Users can query using natural language.
    
-   System must:
    
    -   Return relevant documents/chunks even with typos, synonyms, or varied phrasing.
        
    -   Rank results by relevance score.
        
-   Queries can be filtered by metadata (case number, date range, fund type, parties).

### 4.3 Keyword / Hybrid Search
-   Users can optionally search via keywords.
    
-   System can combine **keyword + semantic search** for higher accuracy.
    
-   Search results must display:
    
    -   Document snippet containing match.
        
    -   Metadata (case number, date, parties, fund type).

### 4.4 Fund Entitlement / Calculation
-   System must identify fund type and entitlement:
    
    -   2k fund, 3k fund, or other types.
        
-   System must summarize documents to indicate **eligibility or allocation**.
    
-   Admins can review and verify calculated entitlements.


### 4.5 Summarization (Optional)
-   System may generate concise summaries of retrieved documents.
    
-   Summaries should highlight:
    
    -   Key actions (e.g., purchase requests).
        
    -   Financial allocations.
        
    -   Relevant case details.


### 4.6 Error Handling
-   System must log all errors consistently.
    
-   Use centralized error enum (`CouncilSearchError`) to:
    
    -   Capture file errors (missing or unreadable).
        
    -   Ingestion failures.
        
    -   Embedding/vector store failures.
        
    -   Search/query failures.
        
-   Users must see **meaningful error messages** (e.g., “File not found” or “No results found”).

### 4.7 Security

-   System must run **offline / on-premise**.
    
-   Data at rest must be encrypted (AES-256).
    
-   API must implement TLS for internal network communication.
    
-   Role-based access must be enforced.

### 4.8 Performance
-   Semantic search must return top 10 results within **5 seconds** for standard datasets (~10,000 docs).
    
-   Ingestion of new batch of documents must not block queries.
    
-   System must scale to tens of thousands of documents.

### 4.9 Logging and Audit
-   All user queries, errors, and document changes must be logged.
    
-   Logs must include timestamp, user ID, and action performed.

## 5 Non Functional Requirements
-   **Platform:** Linux / Windows server.
    
-   **Language:** Rust (for ingestion, embedding, vector search, API).
    
-   **Vector Store:** Qdrant, FAISS, or Tantivy.
    
-   **Embedding Models:** rust-bert / llama-rs (local offline).
    
-   **Web API Framework:** Actix-Web or Axum.
    
-   **Documentation:** Markdown docs for developers and users.

### Assumptions and Constraints

-   All sensitive documents **cannot leave the local network**.
    
-   Historical inconsistencies (missing metadata, typos, multiple spreadsheets) may affect search accuracy.
    
-   Summarization / fund calculation accuracy depends on the **quality of documents**.

### Future Enhancements
-   Advanced NLP reasoning for ambiguous cases.
    
-   Integration with structured databases or council ERP systems.
    
-   Automatic update / ingestion of daily spreadsheets.
