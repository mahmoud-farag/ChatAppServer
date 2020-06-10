
const users = [];

//this method will return two values {error || user}
const addUser = ({ id, name, room }) => {


    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    /*
      find method retrun 1-  undefiend if element not exist.
                         2- true if element is exist.
    */
    const found = users.find(user => user.name === name && user.room === room);
    if (found)
        return { error: 'this user in the db' };


    let user = { id, name, room };
    users.push(user);
    return { user };

};

//this methd will return two values{error || removedUser}
const removeUser = (id) => {

    /*
    findIndex method return 1-  -1 if element not exist.
                            2- the index of the element if it's exist.
  */
    let index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        // return the removed user if it's exist.
        let removedUser = users.splice(index, 1)[0];
        return removedUser;
    } else {

        return { err: `this user of id: ${id} not exist.` };
    }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);


module.exports = { addUser, removeUser, getUser, getUsersInRoom };