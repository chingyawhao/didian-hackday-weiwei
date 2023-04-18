import * as OpenAI from 'openai'

const openai = new OpenAI.OpenAIApi(
  new OpenAI.Configuration({
    apiKey: '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',
  })
)

export default {
  askQuestion: async ({ question }) => {
    const response = await openai.createCompletion({
      model: 'davinci:ft-didian-2023-04-18-03-06-30',
      temperature: 0.2,
      prompt: `You're a property agent selling Mori Residences. ${question}`,
    })
    console.log(response.data)
    return response.data.choices[0].text ?? ''
  },
}
