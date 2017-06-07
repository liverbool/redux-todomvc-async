import request from 'superagent'

export default class ApiClient {
    static endpoint

    constructor(dispatch, endpoint) {
        this.dispatch = dispatch
        ApiClient.endpoint = endpoint;
    }

    callback(action, data, snapshort) {
        return (err, res) => {
            if (err) {
                data._snapshort = snapshort
                return this.dispatch({
                    type: `${action}_FAIL`,
                    data,
                    snapshort,
                    err
                })
            }

            let _json
            let _snapshort

            if (res.req.method === 'PATCH' || res.req.method === 'DELETE') {
                _json = data
                _snapshort = JSON.parse(JSON.stringify(data))
            } else {
                _json = JSON.parse(res.text);
                _snapshort = JSON.parse(res.text)
            }

            if ((typeof _json === "object" && !Array.isArray(_json) && _json !== null)) {
                _json._snapshort = _snapshort
            } else if (Array.isArray(_json)) {
                _json.forEach((item) => {
                    if (typeof item === 'object') {
                        item._snapshort = JSON.parse(JSON.stringify(item))
                    }
                })
            }

            this.dispatch({
                type: `${action}_DONE`,
                data: _json,
                _snapshort
            })
        }
    }

    exec(method, path, action, data) {
        data = data || {}
        const snapshort = data._snapshort
        delete data._snapshort

        return request[method](`${ApiClient.endpoint}${path}`)
            .set('Content-Type', 'application/json')
            .send(data)
            .end(this.callback(action, data, snapshort))
    }

    get(path, action, data = null) {
        let reg = request.get(`${ApiClient.endpoint}${path}`)

        data && reg.query(data)

        return reg.end(this.callback(action, data))
    }

    put(path, action, data) {
        return this.exec('put', ...arguments)
    }

    post(path, action, data) {
        return this.exec('post', ...arguments)
    }

    patch(path, action, data) {
        return this.exec('patch', ...arguments)
    }

    del(path, action, data) {
        return this.exec('del', ...arguments)
    }
}
