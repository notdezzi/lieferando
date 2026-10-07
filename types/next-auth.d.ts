import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        type?: string | null
    }

    interface Session {
        user: {
            id?: string
            type?: string | null
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        type?: string | null
    }
}
