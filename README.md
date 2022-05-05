# SSSF-project

This is backend for [ChatApp](https://tommiov@media-server-tommi.northeurope.cloudapp.azure.com)

All queries except register and login require token. You can get it by creating a new user and logging in. Attach bearer token you got when you logged in to all other queries.

## Example queries

### Create a new user

```
mutation {
    registerUser( username: "TestUser", password: "pwd123") {
        id,
        username
    }
}
```

### Login

```
{
    login( username: "TestUser", password: "pwd123") {
        id,
        username,
        token
    }
}
```

### Get id and username of the user which has logged in

```
{
    getLoggedInUser {
        id,
        username
    }
}
```

### Get user by user id

```
{
    getUserById(id: "someUserId"){
        id,
        username,
    }
}
```

### Get user by username

```
{
    getUserByUsername(username: "someUsername"){
        id,
        username,
    }
}
```

### Get all users

```
{
    getAllUsers{
        id,
        username,
    }
}
```

### Create a new chat thread

```
mutation {
    createChatThread(name: "someName", private: true) {
        id,
        name,
        private,
        creator {
            id,
            username
        }
    }
}
```

### Modify a chat thread (Only creator of the chat thread can do this)

```
mutation {
    modifyChatThread(id: "someChatThreadId", name: "modifiedName", private: false) {
        id,
        name,
        private,
        creator {
            id,
            username
        }
    }
}
```

### Delete a chat thread (Only creator of the chat thread can do this)

```
mutation {
    deleteChatThread(id: "someChatThreadId") {
        id
    }
}
```

### Create a new chatting instance (Join a chat thread) (If the thread is private only a user who is included in the thread can do this)

```
mutation {
    createChatting(thread: "someThreadId", user: "someUserID") {
        thread {
            id,
            name
        },
        user {
            id,
            username
        }
    }
}
```

### Delete a chatting instance (Leave chat thread)

```
mutation {
    deleteChatting(thread: "someThreadId") {
        id
    }
}
```

### Get chat threads by user id

```
{
    getChatThreadsByUserId {
        id,
        thread {
            id,
            name,
            private,
            creator {
                username
            }
        }
    }
}
```

### Get all public chat threads

```
{
    getPublicChatThreads {
        id,
        name,
        private
        creator {
            username
        }
    }
}
```

### Get users by chat thread id (You can only get users from threads you are included in)

```
{
    getUsersByThreadId(id: "someThreadId") {
        id,
        user {
            id,
            username
        }
    }
}
```

### Post a new message (You can only post messages to threads you are included in)

```
mutation {
    postMessage(contents: "Something", timestamp: "someTimestamp", thread: "thisThreadsId") {
        id,
        contents,
        thread {
            id,
            name
        },
        user {
            id,
            username
        }
    }
}
```

### Delete a new message (Only user that posted the message can delete it)

```
mutation {
    deleteMessage(id: "someMessageId") {
        id,
        contents,
        thread {
            id,
            name
        },
        user {
            id,
            username
        }
    }
}
```

### Get messages by thread id (If you do not want limit result use messageLimit: 0) (Only users who are included in this thread can do this)

```
{
    getMessagesByThreadId(id: "someThreadId", messageLimit: 0) {
        id,
        contents,
        timestamp,
        status,
        thread {
            id,
            name
        },
        user {
            id,
            username
        }
    }
}
```

### Get last message by thread id (Only users who are included in this thread can do this)

```
{
    getLastMessageByThreadId(id: "someThreadId") {
        id,
        contents,
        timestamp,
        status,
        thread {
            id,
            name
        },
        user {
            id,
            username
        }
    }
}
```
