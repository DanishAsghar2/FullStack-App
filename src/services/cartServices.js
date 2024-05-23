const getAll = (id) => {
    return fetch("http://localhost:3000/cart/user/" + id)
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

const removeItem = (id) => {
    return fetch("http://localhost:3000/cart/" + id, {
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

const addItem = (fragrance_id, price, user_id, quantity) => {
    return fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "fragrance_id":fragrance_id,
            "price":price,
            "user_id":user_id,
            "quantity":quantity
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

export const cartService = {
    getAll,
    removeItem,
    addItem
}