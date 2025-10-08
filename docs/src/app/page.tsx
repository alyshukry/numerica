"use client"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        fetch("./api/docs.json")
            .then(res => res.json())
            .then(data => {
                data.forEach((symbol: { name: any; description: any; }) => {
                console.log(symbol.name, symbol.description)
            })
            })
            .catch(err => console.error(err));
    }, []);

    return (<p>hello</p>);
}
