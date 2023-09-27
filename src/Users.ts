import { User } from "./types";

class Users {
    /**
     * Como en el ejercicio anterior se cumple con el principio de responsabilidad única, 
     * se utiliza un Map para facilitar las busquedas y la eficiencia de ésta. 
     */

    private _users = new Map<number, User>();

    constructor() { }

    async requestAllUsers() {
        try {
            const apiUsers = await fetch('https://dummyjson.com/users');
            if(!apiUsers.ok){
                throw `request rejected with status ${apiUsers.status}`;
            }
            const jsonRes = await apiUsers.json();
            return jsonRes.users;
        } catch (error) {
            throw `Could not get all users, ${error}`;
        }
    }

    processAllUsers(jsonUsers: User[]) {
        for (const user of Object.values(jsonUsers)) {
            const newUser: User = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,
                email: user.email
            }

            this._users.set(user.id,newUser);
        }
    }

    requestSingleUserById(id:number){
        return new Promise<User>((res,rej)=>{
            fetch(`https://dummyjson.com/users/${id}`)
            .then(async (res) => {
                if(!res.ok)
                    rej(`HTTP error with code status ${res.status}`);
                return await res.json();
            })
            .then(user => {
                const newUser: User = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    gender: user.gender,
                    email: user.email
                };
                res(newUser);
            })
            .catch(err => rej(err));
        });
    }

    get users(){
        return this._users;
    }
}

export default Users;