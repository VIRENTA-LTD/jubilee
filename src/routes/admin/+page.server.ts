import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	const session = cookies.get('session');

	if (!session) {
		throw redirect(302, '/login');
	}
};
