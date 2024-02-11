const users = [
    { id: 1, name: 'Maximo' },
    { id: 2, name: 'Montserrat' },
    { id: 3, name: 'Victor' },
    { id: 4, name: 'Carlos' },
    { id: 5, name: 'Vicky' },
];

function sendResponse(code, body = null, msg = "") {
    const response = {
        code,
        body,
        msg
    };

    switch (code) {
        case 200:
            response.msg = 'Ok';
            break;
        case 201:
            response.msg = 'Created';
            break;
        case 400:
            response.msg = 'Bad Request';
            break;
        case 404:
            response.msg = 'Not Found';
            break;
        case 500:
            response.msg = 'Internal Server Error';
            break;
        default:
            response.msg = 'Unknown status code';
    }

    return response;
}

function getUser(username) {
    try {
        if (!username) {
            throw "Endpoint not valid";
        }

        const user = users.find(function (u) {
            return u.name === username;
        });

        return user ? sendResponse(200, user) : sendResponse(404, null, 'User not found');
    } catch (error) {
        return sendResponse(500, null, error);
    }
}

function getUsers() {
    return sendResponse(200, users);
}

function addUser(newUser) {
    try {
        const addedUser = { ...newUser, id: users.length + 1 };
        users.push(addedUser);

        return sendResponse(201, { addedUser, users });
    } catch (error) {
        return sendResponse(500, null, error);
    }
}

function removeUserByIndex(index) {
    try {
        if (index < 1 || index > users.length) {
            throw "Endpoint not valid";
        }

        const deletedUser = users.splice(index - 1, 1)[0];
        return sendResponse(200, { deletedUser, users });
    } catch (error) {
        return sendResponse(500, null, error);
    }
}

function removeLastUser() {
    try {
        if (users.length === 0) {
            throw 'No users found';
        }

        const deletedUser = users.pop();
        return sendResponse(200, { deletedUser, users });
    } catch (error) {
        return sendResponse(404, null, error);
    }
}

function removeFirstUser() {
    try {
        if (users.length === 0) {
            throw 'No users found';
        }

        const deletedUser = users.shift();
        return sendResponse(200, { deletedUser, users });
    } catch (error) {
        return sendResponse(404, null, error);
    }
}

function updateUserByIndex(index, newValue) {
    try {
        if (index < 1 || index > users.length) {
            throw "Endpoint not valid";
        }

        users[index - 1] = { ...users[index - 1], ...newValue };
        return sendResponse(200, { updatedUser: users[index - 1], users });
    } catch (error) {
        return sendResponse(500, null, error);
    }
}

function getUsersSize() {
    return sendResponse(200, users.length);
}


console.log(getUser("Maximo"));
console.log(getUsers());
console.log(addUser({ name: "Messi" }));
console.log(removeUserByIndex(2));
console.log(removeLastUser());
console.log(removeFirstUser());
console.log(updateUserByIndex(1, { name: "Ronaldo" }));
console.log(getUsersSize());
