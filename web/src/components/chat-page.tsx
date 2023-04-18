import * as React from 'react'
import {
  useTheme,
  Box,
  Grid,
  Paper,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import { useChatState } from '../stores/chat'

const ChatPage = () => {
  const theme = useTheme()
  const [add, setAdd] = React.useState('')
  const [{ chats }, { addQuestion }] = useChatState()

  React.useEffect(() => {
    const body = document.querySelector('body')
    if (body) {
      body.style.background = theme.palette.background.default
    }
  })

  const changeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAdd(event.target.value)
  }
  const pressInput = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.keyCode === 13 && add !== '') {
      setAdd('')
      addQuestion(add)
    }
  }
  const addTodoInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAdd('')
    addQuestion(add)
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Grid
        container
        direction="column"
        sx={(theme) => ({
          width: '100%',
          maxWidth: '680px',
          padding: '32px',
          [theme.breakpoints.down('sm')]: {
            padding: '16px',
          },
        })}
      >
        <Grid container justifyContent="center">
          <Paper
            sx={{
              width: '100%',
            }}
          >
            <List>
              {chats.map((chat) => (
                <ListItem key={chat.question + chat.answer}>
                  <ListItemText
                    primary={chat.question}
                    secondary={chat.answer}
                  />
                </ListItem>
              ))}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '0 8px 0 16px',
                }}
              >
                <InputBase
                  value={add}
                  onChange={changeInput}
                  onKeyDown={pressInput}
                  placeholder="Ask a question here..."
                  fullWidth
                />
                <IconButton
                  component="button"
                  disabled={add === ''}
                  onClick={addTodoInput}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChatPage
