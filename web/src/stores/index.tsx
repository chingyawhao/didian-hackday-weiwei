import * as React from 'react'
import { Provider as ScreenProvider } from './screen'
import { Provider as ChatProvider } from './chat'

const providers = [ScreenProvider, ChatProvider]
const Provider: React.FC = (props) => {
  return providers.reduce(
    (child, Provider) => <Provider>{child}</Provider>,
    <>{props.children}</>
  )
}
export default Provider
