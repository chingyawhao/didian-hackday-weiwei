import * as React from 'react'

export type ScreenType = 'xl-desktop' | 'lg-desktop' | 'md-desktop' | 'sm-tablet' | 'xs-phone'

const trackScreenType = () => {
  const width = window.innerWidth
  const type:ScreenType = width >= 1920? 'xl-desktop'
    : width >= 1280? 'lg-desktop'
    : width >= 960? 'md-desktop'
    : width >= 600? 'sm-tablet'
    : 'xs-phone'
  return type
}
const screenContext = React.createContext([{
  type: trackScreenType()
}] as const)

export const Provider:React.FC = (props) => {
  const [state, setState] = React.useState({
    type: trackScreenType()
  })
  React.useEffect(() => {
    const listenResize = () => {
      const type = trackScreenType()
      if(state.type !== type) {
        setState(state => ({...state, type}))
      }
    }
    window.addEventListener('resize', listenResize)
    return () => {
      window.removeEventListener('resize', listenResize)
    }
  }, [state.type])
  return (
    <screenContext.Provider value={[state]}>
      {props.children}
    </screenContext.Provider>
  )
}
export const useScreenState = () => {
  return React.useContext(screenContext)
}