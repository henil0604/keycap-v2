<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import { caps, type Cap } from '$lib/store';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { decryptAES } from '$lib/utils';
	import Icon from '@iconify/svelte';

	export let cap: Cap;
	export let index: number;

	let decryptedContent = '';
	let passwordInput = '';

	let unlocked = false;

	function unlock() {
		try {
			let dc = decryptAES(cap.content, passwordInput);

			if (!dc) {
				alert('Failed to unlock');
				unlocked = false;
				decryptedContent = '';
				passwordInput = '';
				return;
			}

			decryptedContent = dc;
			unlocked = true;
			passwordInput = '';
		} catch {
			alert('Failed to unlock');
		}
	}

	function lock() {
		unlocked = false;
		decryptedContent = '';
	}

	function handleDelete() {
		$caps = $caps.filter((e) => {
			return e.id != cap.id;
		});
	}
</script>

<Accordion.Item value="cap-{index}">
	<Accordion.Trigger>
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				{cap.label}
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item on:click={handleDelete} class="text-red-500 flex items-center gap-2"
					><Icon class="text-lg" icon="mdi:delete" />Delete</ContextMenu.Item
				>
			</ContextMenu.Content>
		</ContextMenu.Root>
	</Accordion.Trigger>
	<Accordion.Content>
		<div class="relative w-full max-w-md min-h-[100px] p-4 z-[1] border rounded">
			{#if !unlocked}
				<div class="absolute top-0 left-0 w-full h-full backdrop-blur-sm flex-center z-[2]">
					<!-- password -->
					<div class="flex flex-col w-full px-4 max-w-sm gap-1.5">
						<Label for="password">Password</Label>
						<div class="flex gap-1">
							<Input
								bind:value={passwordInput}
								type="password"
								autocomplete="false"
								autocorrect="false"
								autosave="false"
								id="password"
								placeholder=""
								class="bg-secondary"
							/>
							<Button on:click={unlock}>Unlock</Button>
						</div>
					</div>
				</div>

				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis amet omnis quas voluptas
				commodi quo natus a suscipit voluptatum sit delectus velit voluptates, obcaecati deserunt
				expedita ipsum consequatur ullam modi.
			{/if}

			<div class="absolute top-2 right-2 opacity-20 hover:opacity-100 transition-all">
				<Button on:click={lock} size="sm"><Icon icon="mdi:lock" /></Button>
			</div>

			{decryptedContent}
		</div>
	</Accordion.Content>
</Accordion.Item>
