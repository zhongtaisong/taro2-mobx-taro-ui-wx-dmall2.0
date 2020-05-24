import axios from '@axios';
// 查询 - 个人资料
const selectUserInfoUrl = 'users/select/uname';
// 修改 - 个人资料
const updateUserInfoUrl = 'users/update';

class Service {

    selectUserInfoData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectUserInfoUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    updateUserInfoData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateUserInfoUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();