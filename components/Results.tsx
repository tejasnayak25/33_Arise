import { useEffect } from "react";

function loadMeta(url: string) {
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

export default function Results({ url } : { url: any }) {
    useEffect(() => {
        if(url) {
            loadMeta(url).then(data => {
                console.log(data);
            });
        }
    }, [ url ]);
    return (
        <div id="results" className="w-full">
            Output
        </div>
    );
}