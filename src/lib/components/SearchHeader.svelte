<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { SpaceNeedle } from '$lib/components/icons';
	import ThemeToggle from './ThemeToggle.svelte';
	let search = '';

	function navigateSearch() {
		if (search.length < 3) return;
		window.location.href = `/search?q=${encodeURI(search.replace(/[^a-zA-Z0-9 ]/g, ''))}`;
	}
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-neutral-content/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container grid grid-cols-3 h-14 items-center w-full">
		<div class="flex justify-start">
			<a href="/" class="pr-2 md:pr-6 flex items-center">
				<SpaceNeedle fill="currentColor" width="36" height="36" />
				<span class="hidden md:inline-block md:text-2xl"> Seattle Safe Eats </span>
			</a>
		</div>
		<form class="mx-auto w-full" on:submit|preventDefault={navigateSearch} action=".">
			<label class="input input-bordered input-ghost flex items-center gap-2">
				<input
					type="search"
					class="grow"
					placeholder="Search for a restaurant"
					bind:value={search}
				/>
				{#if search.length === 0}
					<Search size="24" />
				{/if}
			</label>
		</form>

		<div class="flex justify-end">
			<ThemeToggle />
		</div>
	</div>
</header>

<style>
	input::placeholder {
		opacity: 0.9;
	}
</style>
