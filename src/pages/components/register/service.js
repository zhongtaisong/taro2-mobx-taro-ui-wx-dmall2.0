import axios from '@axios';

const registerUrl = 'users/reg';

class Service {
    registerData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(registerUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        })
    }
}

export default new Service();