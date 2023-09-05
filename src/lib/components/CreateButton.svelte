<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { caps } from '$lib/store';
	import { encryptAES, randomString } from '$lib/utils';

	let label = '';
	let content = '';
	let password = '';

	let open = false;

	function create() {
		if (!label || !content || !password) {
			alert('Please fill input');
			return;
		}

		const encryptedContent = encryptAES(content, password);

		$caps = [
			...$caps,
			{
				id: randomString(10),
				label,
				content: encryptedContent
			}
		];

		open = false;
		label = '';
		content = '';
		password = '';
	}
</script>

<div>
	<Dialog.Root bind:open>
		<Dialog.Trigger>
			<Button class="gap-1" size="sm"><Icon icon="mdi:plus" /> Create</Button>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>wanna create new <i>Cap</i>?</Dialog.Title>
			</Dialog.Header>

			<div class="flex flex-col gap-4">
				<!-- label -->
				<div class="flex flex-col w-full gap-1.5">
					<Label for="label">Label</Label>
					<Input bind:value={label} type="text" id="label" placeholder="" />
				</div>

				<!-- content -->
				<div class="flex flex-col w-full gap-1.5">
					<Label for="content">Content</Label>
					<Textarea bind:value={content} id="content" placeholder="" />
				</div>

				<!-- password -->
				<div class="flex flex-col w-full gap-1.5">
					<Label for="password">Password</Label>
					<Input
						bind:value={password}
						type="password"
						autocomplete="false"
						autocorrect="false"
						autosave="false"
						id="password"
						placeholder=""
					/>
				</div>

				<div class="mt-4 w-full flex justify-end">
					<Button on:click={create}>Create</Button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>
