import { createContext, useReducer, useContext, PropsWithChildren } from 'react'
import { reducer, type WhatsAppDispatchAction, type WhatsAppState } from '../reducer'

export type WhatsAppWindowContext = {
  isOpen: boolean
  isDelay: boolean
  isNotification: boolean
  dispatch: React.Dispatch<WhatsAppDispatchAction>
  open: () => void
  close: () => void
  delay: () => void
  notification: () => void
}

export const MISSING_WHATSAPP_PROVIDER = 'You forgot to wrap your app in <WhatsAppWindowContextProvider>'

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const WhatsAppWindowContext = createContext<WhatsAppWindowContext>({
  get isOpen(): never {
    throw new Error(MISSING_WHATSAPP_PROVIDER)
  },
  get isDelay(): never {
    throw new Error(MISSING_WHATSAPP_PROVIDER)
  },
  get isNotification(): never {
    throw new Error(MISSING_WHATSAPP_PROVIDER)
  },
  dispatch: (action: WhatsAppDispatchAction) => {
    throw new Error(MISSING_WHATSAPP_PROVIDER)
  },
  open: () => {
    throw new Error(MISSING_WHATSAPP_PROVIDER)
  },
  close: () => {
    throw new Error(MISSING_WHATSAPP_PROVIDER)
  },
  delay: () => {
    throw new Error(MISSING_WHATSAPP_PROVIDER)
  },
  notification: () => {
    throw new Error(MISSING_WHATSAPP_PROVIDER)
  }
})

export interface WhatsAppWindowContextProviderProps {
  intialState?: Partial<WhatsAppState>
}

export const WhatsAppWindowContextProvider = ({
  children,
  intialState = {}
}: PropsWithChildren<WhatsAppWindowContextProviderProps>) => {
  const {
    isOpen: intialIsOpen = false,
    isDelay: initialIsDelay = true,
    isNotification: initialIsNotification = false
  } = intialState

  const [{ isOpen, isDelay, isNotification }, dispatch] = useReducer(reducer, {
    isOpen: intialIsOpen,
    isDelay: initialIsDelay,
    isNotification: initialIsNotification
  })

  const open = () => dispatch({ type: 'open' })
  const close = () => dispatch({ type: 'close' })
  const delay = () => dispatch({ type: 'delay' })
  const notification = () => dispatch({ type: 'notification' })

  return (
    <WhatsAppWindowContext.Provider
      value={{
        isOpen,
        isDelay,
        isNotification,
        dispatch,
        open,
        close,
        delay,
        notification
      }}
    >
      {children}
    </WhatsAppWindowContext.Provider>
  )
}

export const useWhatsAppWindow = () => useContext(WhatsAppWindowContext)
