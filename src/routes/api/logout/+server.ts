import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('session', { path: '/' });
	return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
};
