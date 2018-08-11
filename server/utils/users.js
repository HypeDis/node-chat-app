class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        //return user that was removed
        let removedUser = this.users.filter((user) => user.id === id)[0];
        console.log(removedUser);
        let userIndex;
        if (removedUser) {
            // userIndex = this.users.findIndex((i) => i.id === id);
            // this.users.splice(userIndex, 1);    //my code

            this.users = this.users.filter((user) => { //teachers code
                return user.id !== id;
            });
        } else {
            return undefined;
        }
        //findIndex is used when searching for a key in a object array
        // console.log(userIndex);



        return removedUser;

    }
    getUser(id) {
        return this.users.filter((user) => {
            return user.id === id;
        })[0];


    }
    getUserList(room) {
        //return array of all users in a specific room
        let users = this.users.filter((user) => user.room === room); //create an array with every user that is in a particular room
        let namesArray = users.map((user) => user.name); //create an array that only has the name of each user in the room. 

        return namesArray;
    }
}

module.exports = { Users };