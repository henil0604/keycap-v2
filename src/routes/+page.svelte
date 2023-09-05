<script>
	import CreateButton from '$lib/components/CreateButton.svelte';
	import { caps } from '$lib/store';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion';
	import CapItem from '$lib/components/CapItem.svelte';
</script>

<div class="px-5 py-5 flex-center flex-col w-full">
	<div class="w-full flex justify-between items-end">
		<h1 class="text-xl font-semibold">Your Caps</h1>
		<CreateButton />
	</div>
	<hr class="w-full my-3" />

	<Accordion.Root multiple={true} class="w-full">
		<!--  -->
		{#each $caps as cap, index}
			<CapItem {cap} {index} />
		{/each}
	</Accordion.Root>
</div>
