"use client"

import { useEffect } from "react"

export const Protection = () => {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent F12
            if (e.key === "F12" || e.keyCode === 123) {
                e.preventDefault()
            }
            // Prevent Ctrl+Shift+I, Ctrl+Shift+J, posssible Ctrl+Shift+C
            if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
                e.preventDefault()
            }
            // Prevent Ctrl+U
            if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
                e.preventDefault()
            }
        }

        document.addEventListener("contextmenu", handleContextMenu)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return null
}
