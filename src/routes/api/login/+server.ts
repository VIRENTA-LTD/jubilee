import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const users = [{ email: 'admin@example.com', password: 'password' }];

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = await request.json();
	const user = users.find((u) => u.email === email && u.password === password);

	if (user) {
		cookies.set('session', 'logged-in', { path: '/' });
		return json({ status: 'success' }, { status: 200 });
	} else {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}
};
