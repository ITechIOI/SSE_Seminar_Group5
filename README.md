# SSE_Seminar_Group5

Basic demo of how SSE works (Server-sent-event)

## Install environment

### Client
 1. Use the command `cd client` to navigate to the client folder.
 2. Open the index.html file in your browser to test the client-side implementation.

### Server
 1. Use the command `cd server` to navigate to the client folder.
 2. Use the command `npm install` to install dependencies
 3. Run the following command to start the server in development mode: `npm run start:dev`. This will start the server on http://localhost:3002 by default.

## How It Works

### Frontend (HTML & JavaScript)

 - The client uses EventSource to establish an SSE connection.

 - The client listens for events and displays messages in real time.

 - It also handles:
    - Automatic reconnection with Last-Event-ID.
    - Manual connection closing.

### Backend (NestJS)

 - The server listens for connections on http://localhost:3002/api/events.

 - Each event includes:
    - `id`: Unique identifier for the event.
    - `type`: Event type (customEvent).
    - `data`: Data sent with the event.
    - `retry`: Time in milliseconds for client retries.

## Troubleshooting

### Common Issues and Fix
1. Events not received on client:

   - Ensure the server is running by checking http://localhost:3002/api/events.

2. Port conflict:
    - If port 3002 is in use, you can change it in src/main.ts:

    ``` typescript
    await app.listen(3002);
    ```

3. Missing dependencies: 

    - If you encounter module errors, ensure dependencies are installed by running

    ```bash
    npm install
    ```

## License

This project is licensed under the MIT License.

## Author

