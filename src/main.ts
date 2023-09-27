import Users from "./Users";

(async ()=>{
    try {
        const usersList = new Users();
    
        console.group('UsersList');
        const allUsers = await usersList.requestAllUsers();
        usersList.processAllUsers(allUsers);
        console.log(usersList.users);
        console.groupEnd();
        
        console.group('SingleUser');
        const singleUser = await usersList.requestSingleUserById(20);
        console.log(singleUser);
        console.groupEnd();
    } catch (error) {
        console.error(error);
    }
})();