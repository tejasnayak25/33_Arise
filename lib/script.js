export const analyse = async function analyse(url) {
    fetch("/api/check-sql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    }).then(res => res.json())
    .then(res => {
        // let img = new Image();
        // img.src = URL.createObjectURL(res);
        // document.body.appendChild(img);
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}

export const loadMeta = function loadMeta(url) {
    return new Promise((resolve, reject) => {
        fetch("/api/get-meta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            resolve(data);
        }).catch((error) => {
            console.log(error);
            resolve(null);
        });
    });
}

export const loadScreenshot = function loadScreenshot(url) {
    return new Promise((resolve, reject) => {
        fetch("/api/get-screenshot", {
            method: "POST",
            headers: {
                "Content-Type": "image/png",
            },
            body: JSON.stringify({ url }),
        }).then((response) => response.blob())
        .then((data) => {
            let burl = URL.createObjectURL(data);
            resolve(burl);
        }).catch((error) => {
            console.log(error);
            resolve(null);
        });
    });
}

export const loadDetails = function loadDetails(url) {
    return new Promise((resolve, reject) => {
        fetch("/api/get-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        }).then((response) => response.json())
        .then((data) => {
            resolve(data);
        }).catch((error) => {
            console.log(error);
            resolve(null);
        });
    });
}