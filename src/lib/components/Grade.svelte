<script lang="ts">
	import GradeDial from './GradeDial.svelte';

	export let grade: string | undefined;
	export let withLabel: boolean = false;
	export let withDescription: boolean = false;
	export let withDial: boolean = false;
</script>

<div class="flex items-center gap-2 font-bold m-2">
	{#if grade === '1'}
		<div class="flex gap-2 items-center">
			<img
				class="rounded-full w-16 mx-auto"
				alt="Smiley face representing excellent rating"
				src={'https://pub-b8e099feb55c4c2798b6a2442f0c9f20.r2.dev/excellent.png'}
			/>
			{#if withLabel}
				<span>Excellent</span>
			{/if}
		</div>
		{#if withDial}
			<div class="w-32 mr-10">
				<GradeDial {grade} />
			</div>
		{/if}
		{#if withDescription}
			The restaurant has had no or minor unsafe food handling practices over the last four
			inspections.
		{/if}
	{:else if grade === '2'}
		<div class="flex gap-2 items-center">
			<img
				class="rounded-full w-16 mx-auto"
				alt="Smiley face representing good rating"
				src={'https://pub-b8e099feb55c4c2798b6a2442f0c9f20.r2.dev/good.png'}
			/>
			{#if withLabel}
				<span>Good</span>
			{/if}
		</div>
		{#if withDial}
			<div class="w-32 mr-10">
				<GradeDial {grade} />
			</div>
		{/if}
		{#if withDescription}
			The restaurant has had a few unsafe food handling practices over the last four inspections.
		{/if}
	{:else if grade === '3'}
		<div class="flex gap-2 items-center">
			<img
				class="rounded-full w-16 mx-auto"
				alt="Smiley face representing okay rating"
				src={'https://pub-b8e099feb55c4c2798b6a2442f0c9f20.r2.dev/okay.png'}
			/>
			{#if withLabel}
				<span>Okay</span>
			{/if}
		</div>
		{#if withDial}
			<div class="w-32 mr-10">
				<GradeDial {grade} />
			</div>
		{/if}
		{#if withDescription}
			The restaurant has had several unsafe food handling practices over the last four inspections.
		{/if}
	{:else if grade === '4'}
		<div class="flex gap-2 items-center">
			<img
				class="rounded-full w-16 mx-auto"
				alt="Smiley face representing needs to improve rating"
				src={'https://pub-b8e099feb55c4c2798b6a2442f0c9f20.r2.dev/needstoimprove.png'}
			/>
			{#if withLabel}
				<span>Needs To Improve</span>
			{/if}
		</div>
		{#if withDial}
			<div class="w-32 mr-10">
				<GradeDial {grade} />
			</div>
		{/if}
		{#if withDescription}
			This restaurant was either closed by Public Health - Seattle & King County within the last
			year or needed multiple return inspections to correct unsafe food handling practices.
		{/if}
	{:else}
		<div
			class="bg-neutral text-neutral-content size-16 rounded-full text-xl font-semibold flex items-center justify-center"
		>
			N/A
		</div>
		{#if withLabel}
			<span>No Grade Available</span>
		{/if}
	{/if}
</div>
