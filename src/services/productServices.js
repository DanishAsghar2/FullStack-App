const getAll = () => {
    return fetch("https://danishasgharbackend.glitch.me/products")
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
