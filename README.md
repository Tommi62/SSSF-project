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

### Create a new chatting instance (Join a chat thread)

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

### Get users by chat thread id

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

### Post a new message

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
