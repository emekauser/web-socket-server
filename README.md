# web-socket-server
A small websockets app for sharing arbitrary messages with all other users with mongodb as database

# How to use

1. Clone the repo and cd into the folder
2. ``` npm install ```
3. ``` npm start  ```

# End points
1. get_all_messages GET
2. get_active_users GET

# Socket Event
1. ```start```   for handshake
2. ```error ```  for error
3. ```message```  for message
4. ```disconnect```  for disconnectd client
