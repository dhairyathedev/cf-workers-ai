import { Hono } from 'hono';

type Env = {
	AI: any

}


const app = new Hono<{ Bindings: Env }>()

app.get("/", async c => {
	const content = c.req.query('query') || "What is the origin of the phrase Hello World?"
	const ai = c.env.AI;
	const messages = [
		{
			role: 'system', content: 'You are a friendly assistant.'
		},
		{
			role: 'user', content
		}
	]
	const inputs = { messages }

	const stream = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", inputs)
	return c.json(stream);

})

export default app;
