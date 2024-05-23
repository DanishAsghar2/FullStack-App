const getAll = (id) => {
    return fetch("http://localhost:3000/billing/user/" + id)
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

const getOne = (id) => {
    return fetch("http://localhost:3000/billing/" + id)
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

const deleteBilling = (id) => {
    return fetch("http://localhost:3000/billing/" + id, {
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

const create = (card_number, expiry_date, cvv, first_name, last_name, addline1, addline2, townorcity, 
postcode, phone, country, user_id) => {
    return fetch("http://localhost:3000/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "card_number":card_number,
            "expiry_date":expiry_date,
            "cvv":cvv,
            "first_name":first_name,
            "last_name": last_name,
            "addline1": addline1,
            "addline2": addline2,
            "townorcity": townorcity,
            "postcode": postcode,
            "phone": phone,
            "country": country,
            "user_id": user_id
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
        localStorage.setItem("billing_id", resJson.billing_id);
        return resJson
    })
    .catch((error) => {
        console.log("err", error)
        return Promise.reject(error)
    })
}

export const billingService = {
    getAll,
    getOne,
    deleteBilling,
    create
}
