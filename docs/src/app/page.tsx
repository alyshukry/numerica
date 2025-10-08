"use client"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        fetch("./api/docs.json")
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }, []);

    return (<p>hello</p>);
}
