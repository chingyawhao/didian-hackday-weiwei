import * as OpenAI from 'openai'

import * as datum from './data.json'

const openai = new OpenAI.OpenAIApi(
  new OpenAI.Configuration({
    apiKey: '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',
  })
)

export default {
  askQuestion: async ({ histories }) => {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: 'You are a property agent selling Mori Residence.',
        },
        ...datum.map((data) => ({
          role: 'system' as const,
          content: [data.prompt, data.completion].join('. '),
        })),
        ...histories,
      ],
    })
    console.log(response.data.choices)
    return response.data.choices[0]?.message.content ?? ''
  },
}
