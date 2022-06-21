```mermaid
erDiagram
    Client{
        string email PK
        string ownerName
        string resturantName
        string resturantAddress
        string phoneNo
        string resturantPhoneNo
        date onBoardDate
        string password
        boolean passwordExpired
        date lastLogin 
        boolean active
        string accountStatus
    }
```

```mermaid
flowchart TD
    A[PASSWORD_NOT_SET] --> B[ACTIVATE_ACCOUNT]
```