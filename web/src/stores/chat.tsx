import * as React from 'react'

export type Chat = {
  question: string
  answer?: string
}
type ChatAction = {
  addQuestion: (question: string) => Promise<string>
}

const chatContext = React.createContext([
  {
    chats: [] as Chat[],
  },
  {} as ChatAction,
] as const)

export const Provider: React.FC = (props) => {
  const [state, setState] = React.useState({
    chats: [] as Chat[],
  })
  const addQuestion: ChatAction['addQuestion'] = async (question) => {
    setState((state) => ({
      ...state,
      chats: [
        ...state.chats.filter((chat) => chat.question !== question),
        { question },
      ],
    }))
    const response = await fetch('http://localhost:8080/chat', {
      method: 'POST',
      body: `
        query {
          askQuestion(question: ${JSON.stringify(question)})
        }
      `,
    }).then((response) => response.json())
    const answer = response.data?.askQuestion ?? undefined
    setState((state) => ({
      ...state,
      chats: state.chats.map((chat) =>
        chat.question === question ? { ...chat, answer } : chat
      ),
    }))
    return answer
  }
  return (
    <chatContext.Provider
      value={[
        state,
        {
          addQuestion,
        },
      ]}
    >
      {props.children}
    </chatContext.Provider>
  )
}
export const useChatState = () => {
  return React.useContext(chatContext)
}
