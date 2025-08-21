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