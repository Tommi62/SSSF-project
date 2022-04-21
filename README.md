# SSSF-project

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

### Create a new chat thread

```
mutation {
    createChatThread(name: "Thread name", private: true) {
        id,
        name
    }
}
```

### Create a new chatting instance

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

### Get chat thread by user id

```
{
    getChatThreadsByUserId(id: "yourUserId") {
        id,
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

### Post a new message

```
mutation {
    postMessage(contents: "Something", timestamp: "someTimestamp", thread: "thisThreadsId", user: "youUserId") {
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

### Get messages by thread id

```
{
    getMessagesByThreadId(id: "someThreadId") {
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

### Get all public chat threads

```
{
    getPublicChatThreads {
        id,
        name,
        private
    }
}
```
