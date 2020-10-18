import {ApolloClient, ApolloProvider, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {useAuth0} from '@auth0/auth0-react'
import React, {ReactElement} from 'react'
import {cache} from 'utils'

interface Props {
  children: ReactElement
}

const uri = `${process.env.REACT_APP_SERVER_URL}/blog`

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

  // const defaultOptions: DefaultOptions = {
  //   watchQuery: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'ignore',
  //   },
  //   query: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'all',
  //   },
  // }

  const client = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
    // defaultOptions,
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
