import Cookies from "js-cookie"
import { useLayoutEffect, useState } from "react"

export const useTheme = () => {
    const [theme, setTheme] = useState(Cookies.get('data-theme') || 'dark')

    useLayoutEffect(() => {
        console.log(theme);
        document.documentElement.setAttribute('data-theme', theme)
        Cookies.set('data-theme', theme)
    },[theme])
    return{theme, setTheme}
}