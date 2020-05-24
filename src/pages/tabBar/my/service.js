import axios from '@axios';
// 查询 - 个人资料
const selectUserInfoUrl = 'users/select/uname';
// 退出登录
const logoutUrl = `users/logout`;

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
    
    logoutData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(logoutUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();