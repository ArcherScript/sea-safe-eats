<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import SeattleSkyline from '$lib/assets/SeattleSkyline.svelte';
	import Stars from '$lib/assets/Stars.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { SpaceNeedle } from '$lib/components/icons';

	const title = 'Seattle Safe Eats';
	const description =
		"Explore Seattle's restaurant food safety inspections with ease. Get detailed insights into violations, inspection dates, and safety ratings to make informed dining decisions.";
	const url = 'https://www.seattlesafeeats.com/';
	const image = `https://pub-b8e099feb55c4c2798b6a2442f0c9f20.r2.dev/og-undefined.png?version=${new Date().toLocaleDateString()}`;
	const ogDescription = "Explore Seattle's restaurant food safety inspections with ease";
</script>

<MetaTags {title} {description} {url} {image} {ogDescription} />

<div class="flex justify-center flex-col w-full h-full">
	<div class="top-2 right-4 fixed"><ThemeToggle /></div>
	<div class="flex mx-auto justify-center items-center flex-col gap-6">
		<SpaceNeedle fill="currentColor" width="180" height="180" />
		<h1 class="text-6xl text-center">Seattle<br />Safe{' '}Eats</h1>
		<div class="md:max-w-96 w-full px-8">
			<Search />
		</div>
	</div>
	<div class="stars-container opacity-25">
		<Stars svgGProps="fill-base-content" />
	</div>
	<div class="skyline-container opacity-25">
		<SeattleSkyline svgGProps="fill-base-content" />
		<!-- negative margin because the bottom of the skyline has a gap that we are covering --->
		<div class="bg-base-content h-20 -mt-1" />
	</div>
</div>

<style>
	.skyline-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: auto;
		z-index: -1;
	}

	.stars-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
</style>
