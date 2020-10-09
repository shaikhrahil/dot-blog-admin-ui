import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {useAuth0} from '@auth0/auth0-react'
import React, {ReactElement} from 'react'

interface Props {
  children: ReactElement
}

const uri = process.env.REACT_APP_SERVER_URL

export function ApolloWrapper({children}: Props): ReactElement {
  const httpLink = createHttpLink({uri})
  const {isAuthenticated, getAccessTokenSilently} = useAuth0()

  const authLink = setContext(async (_, {headers}) => {
    let token = ''
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : '',
      },
    }
  })
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
