import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async function ({ fetch, url }) {
	const target = new URL('https://bitekarma.com/wa/seattle/search');
	target.searchParams.set('q', url.searchParams.get('q') ?? '');
	throw redirect(301, target.toString());
};
