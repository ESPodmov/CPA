export type RouteType = { [route: string]: { path: string } }


export const routes: RouteType = {
    register: {
        path: "/register"
    },
    login: {
        path: "/login"
    },
    profile: {
        path: "/profile"
    },
    news: {
        path: "/news"
    },
    news_item: {
        path: "/news/:pk"
    },
    support: {
        path: "/support"
    },
    home: {
        path: "/home"
    },
    reports: {
        path: "/reports"
    },
    unload: {
        path: "/unloadings",
    },
    offers: {
        path: "/offers"
    },
    offer: {
        path: "/offer/:pk"
    },
    my_links: {
        path: "/my_links"
    },


}
