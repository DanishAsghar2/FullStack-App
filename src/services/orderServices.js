const getAll = (id) => {
    return fetch("http://localhost:3000/orders/user/" + id)
    .then((response) => {
        if(response.status === 200) {
            return response.json();
        }
        else {
            throw "something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("err", error)
    })
}

const getByOrderNumber = (num) => {
    return fetch("http://localhost:3000/orders/order/" + num)
    .then((response) => {
        if(response.status === 200) {
            return response.json();
        }
        else {
            throw "something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("err", error)
    })
}

const deleteOrder = (id) => {
    return fetch("http://localhost:3000/orders/" + id, {
        method: "DELETE",
    })
    .then((response) => {
        if(response.status === 200) {
            return "item removed"
        }
        else if (response.status === 401) {
            throw "unauthorised"
        }
        else if (response.status === 404) {
            throw "not found"
        }
        else {
            throw "something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("err", error)
        return Promise.reject(error)
    })
}

const create = (fragrance_id, delivery_id, billing_id, user_id, order_num) => {
    return fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "fragrance_id":fragrance_id,
            "delivery_id":delivery_id,
            "billing_id":billing_id,
            "user_id":user_id,
            "order_num":order_num
        })
    })
    .then((response) => {
        if(response.status === 201) {
            return response.json();
        }
        else if (response.status === 401) {
            throw "unauthorised"
        }
        else if (response.status === 404) {
            throw "not found"
        }
        else {
            throw "something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("err", error)
        return Promise.reject(error)
    })
}

export const ordersService = {
    getAll,
    getByOrderNumber,
    deleteOrder,
    create
}