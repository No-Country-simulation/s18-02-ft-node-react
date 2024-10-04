import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        // Obtener el usuario en base a las credenciales y retornar el objeto de usuario o perfil necesario
        // API auth/login POST
        return null
      }
    })
  ]
})
