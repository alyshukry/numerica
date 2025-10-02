import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Numerica",
    description: "Lightweight number formatting library",
    base: "/numerica/",

    themeConfig: {
        nav: [
            //   { text: "Home", link: "/" },
            //   { text: "Docs", link: "/installation" },
            { text: "GitHub", link: "https://github.com/alyshukry/numerica" }
        ],

        sidebar: [
            {
                text: "Guide",
                items: [
                    { text: "Installation", link: "/installation" }
                ]
            },
            {
                text: "API Reference",
                items: [
                    { text: "convertBase", link: "/api/convert_base" },
                    { text: "spell", link: "/api/spell" },
                    { text: "separate", link: "/api/separate" },
                    { text: "relativeTime", link: "/api/relative_time" },
                    { text: "abbreviate", link: "/api/abbreviate" }
                ]
            }
        ]
    }
})
