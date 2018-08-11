const expect = require('expect');
const { Users } = require('./users.js');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: 2,
            name: 'Jen',
            room: 'React Course'
        }, {
            id: 3,
            name: 'Julie',
            room: 'Node Course'
        }]
    });

    it('should add new users', () => {
        let users = new Users();
        let user = {
            id: 'mark123',
            name: 'Mark',
            room: 'bbbbc'
        }

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual(expect.arrayContaining([user]));


    });

    it('should remove a user', () => {
        let removedUser = users.removeUser(1);

        expect(removedUser.id).toEqual(1);
        expect(users.users).toEqual(expect.not.objectContaining(removedUser));

    });

    it('should not remove a user', () => {
        let removedUser = users.removeUser(15);

        expect(removedUser).toBeFalsy();

        expect(users.users.length).toEqual(3);

    });

    it('should find user', () => {
        let userID = 1;
        let user = users.getUser(userID);
        console.log(user);
        expect(user.id).toEqual(userID);

    });

    it('should not find user', () => {
        let userID = 99;
        let user = users.getUser(userID);


        expect(user).toBeFalsy();
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });

});