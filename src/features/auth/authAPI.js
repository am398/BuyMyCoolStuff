
export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        resolve({ data });
    });
}

export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: { 'content-type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.text();
                reject(error);
            }
        } catch (error) {
            reject(error);
        }

    });
}

export function checkAuth() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/auth/check');
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.text();
                reject(error);
            }
        } catch (error) {
            reject(error);
        }

    });
}


export function signOut(userId) {
    return new Promise(async (resolve, reject) => {
        // try {
        //     const response = await fetch('/auth/logout');
        //     if (response.ok) {
        //         resolve({ data: 'success' });
        //     } else {
        //         const error = await response.text();
        //         reject(error);
        //     }
        // } catch (error) {
        //     console.log(error)
        //     reject(error);
        // }
        resolve({ data: 'success' });
    });
}


export function resetPasswordRequest(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/auth/reset-password-request', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'content-type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.text();
                reject(error);
            }
        } catch (error) {
            reject(error);
        }

    });
}

export function resetPassword(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.text();
                reject(error);
            }
        } catch (error) {
            reject(error);
        }

    });
}


export function checkUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
        const { email, password } = loginInfo;
        const response = await fetch('http://localhost:8080/users?email=' + email);
        const data = await response.json();
        console.log(data);
        if (data.length) {
            if (data[0].password === password) {
                resolve({ data: data[0] });
            } else {
                reject({ message: 'Password is incorrect' });
            }
        }
        else {
            reject({ message: 'User not found' });
        }

    })

}