import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    // Load saved login from localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem("musicPlayerUser")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    // Save user when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("musicPlayerUser", JSON.stringify(user))
        } else {
            localStorage.removeItem("musicPlayerUser")
        }
    }, [user])

    const login = (username, password, role) => {

        const newUser = {
            username: username,
            role: role
        }

        setUser(newUser)

        return true
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context
}