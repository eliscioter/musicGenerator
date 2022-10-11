export interface Data {
    snippet: {
        title: string
        thumbnail: {
            def: {
                url: string
                width: number
                height: number
            },
            medium: {
                url: string
                width: number
                height: number
            }
            high: {
                url: string
                width: number
                height: number
            },
            standard?: {
                url: string
                width: number
                height: number
            }
            maxres?: {
                url: string
                width: number
                height: number
            }
        }
    },
    player: {
        embedHtml: string
    }
}