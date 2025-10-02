import type { Business } from '../lookup/[id]/+server';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[\s-]+/g, '-');
}

export const load: PageServerLoad = async function ({ fetch, params }) {
	// Call the lookup endpoint to get the business details
	let id;

	if (params.id.substring(0, 2) === 'PR') {
		id = params.id;
	} else {
		const idParts = params.id.split('-');
		id = 'PR' + idParts[idParts.length - 1];
	}

	const url = `/restaurant/lookup/${id}`;

	const response = await fetch(url);

	const { business } = (await response.json()) as { business: Business };

	// Call fritter endpoint to find a match for the business
	const searchTerms = [business.zip_code, business.name];
	const search = encodeURIComponent(searchTerms.join(' '));

	const fritterResponse = await fetch(
		`https://api.fritter.dev/api/restaurants?city=seattle&state=WA&search=${search}`,
		{
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': env.FRITTER_API_KEY
			}
		}
	);

	const fritter = (await fritterResponse.json()) as any;
	const fritterId = fritter[0].id.split('-')[1];
	// Rebuild the url and redirect the customer
	throw redirect(301, `https://bitekarma.com/wa/seattle/${slugify(business.name)}-${fritterId}`);
};
