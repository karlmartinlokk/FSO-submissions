# Exercise 0.4: New note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST request at https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: status code 302 (URL redirect)
    deactivate server

    Note left of server: Appending new note to notes is a server-side action, hence it doesnt have a separate arrow

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" },... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes, including the new note

```
    
