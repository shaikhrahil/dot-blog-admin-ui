import {createContext} from 'react'
import shortid from 'shortid'

export const ModalContext = createContext<{id: string}>({id: shortid()})
