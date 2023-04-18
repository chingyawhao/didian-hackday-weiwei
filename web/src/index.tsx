import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blueGrey, grey } from '@mui/material/colors'

import Provider from './stores'
import ChatPage from './components/chat-page'

const theme = createTheme({
  palette: {
    primary: {
      light: blueGrey[200],
      main: blueGrey[400],
      dark: blueGrey[600],
    },
    secondary: {
      light: grey[200],
      main: grey[400],
      dark: grey[600],
    },
    background: {
      default: 'rgb(255, 255, 255)',
    },
  },
})

ReactDOM.render(
  <Provider>
    <ThemeProvider theme={theme}>
      <ChatPage />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
