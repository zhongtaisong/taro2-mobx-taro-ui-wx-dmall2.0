import axios from '@axios';
// 查询当前商品评价
const selcommentsUrl = 'comment/select/pid';

class Service {

    selcommentsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selcommentsUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default new Service();