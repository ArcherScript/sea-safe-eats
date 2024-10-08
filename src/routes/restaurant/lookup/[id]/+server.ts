import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { FoodEstablishmentInspections } from '$lib/types/FoodEstablishmentInspection.js';

export type Inspection = {
	business_name: string;
	closed_business: boolean;
	date: string;
	result: string;
	score: string;
	serial_num: string;
	type: string;
	violations: Violation[];
};

type Violation = {
	description: string;
	points: string;
	record_id: string;
	type: string;
	date: string;
};

export type Business = {
	business_id: string;
	address: string;
	city: string;
	grade: string;
	name: string;
	phone: string;
	program_identifier: string;
	inspections: Inspection[];
	zip_code: string;
	latest_inspection?: Inspection;
	risk_category: string | undefined;
};

function toTitleCase(str: string) {
	return str
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

function adaptDataToBusiness(data: FoodEstablishmentInspections): Business {
	const businessData = data[0]; // Grab the first business from the list

	// Create a map to collect inspections with their respective violations
	const inspectionsMap = new Map<string, Inspection>();

	for (const item of data) {
		if (!item.inspection_date) continue;
		if (item.inspection_type && !item.inspection_type.includes('Routine')) continue;

		// If the inspection date is not already in the map, create a new inspection entry
		if (!inspectionsMap.has(item.inspection_date)) {
			inspectionsMap.set(item.inspection_date, {
				business_name: item.inspection_business_name ?? '',
				closed_business: item.inspection_closed_business ?? false,
				date: item.inspection_date,
				result: item.inspection_result ?? '',
				score: item.inspection_score ?? '',
				serial_num: item.inspection_serial_num ?? '',
				type: item.inspection_type ?? '',
				violations: []
			});
		}

		// If the violation points are greater than 0, add a violation to the respective inspection
		if (parseInt(item.violation_points) > 0) {
			let record_id = '';
			let description = '';

			// Older violations don't have violation numbers
			if (item.violation_description.includes(' - ')) {
				const splitDescription = (item.violation_description ?? '').split(' - ');

				record_id = splitDescription[0];
				description = splitDescription[1];
			} else {
				record_id = '';
				description = item.violation_description;
			}

			const violation: Violation = {
				description,
				points: item.violation_points,
				record_id,
				type: item.violation_type,
				date: item.inspection_date
			};
			inspectionsMap.get(item.inspection_date)?.violations.push(violation);
		}
	}
	// Convert the inspections map to an array
	const inspections = Array.from(inspectionsMap.values());

	const latest_inspection =
		inspections.length > 0 ? inspections.reduce((a, b) => (a.date > b.date ? a : b)) : undefined;

	// The risk category is separated by " - " in the business description
	const risk_category = businessData.description.split(' - ')[1] ?? undefined;

	return {
		business_id: businessData.business_id,
		address: businessData.address,
		city: businessData.city,
		grade: businessData.grade,
		name: toTitleCase(businessData.program_identifier),
		phone: businessData.phone,
		program_identifier: businessData.program_identifier,
		zip_code: businessData.zip_code,
		risk_category,
		latest_inspection,
		inspections
	};
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }: { params: { id: string } }) {
	const url = `https://data.kingcounty.gov/resource/f29f-zza5.json?business_id=${params.id}`;

	if (!env.APPLICATION_SECRET) {
		throw new Error('APPLICATION_SECRET is not defined');
	}

	const headers: HeadersInit = new Headers();
	headers.set('Content-Type', 'application/json');
	headers.set('X-App-Token', env.APPLICATION_SECRET);

	const options: RequestInit = {
		method: 'GET',
		headers
	};

	const response = await fetch(url, options);

	const inspectionData = (await response.json()) as FoodEstablishmentInspections;

	return json({
		business: adaptDataToBusiness(inspectionData)
	});
}
