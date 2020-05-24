import axios from '@axios';
// 查询商品
const productsUrl = 'comment/select/products';
// 提交评价
const addcommentsUrl = 'comment/add';

class Service {

    productsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(productsUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    addcommentsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addcommentsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();