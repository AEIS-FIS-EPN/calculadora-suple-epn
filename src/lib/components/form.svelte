<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { formSchema } from "$lib/schemas";
	import { getFinalExamGrade } from "$lib/utils";

	const { form, errors, enhance, validateForm } = superForm(
		{ firstBimesterGrade: 0, secondBimesterGrade: 0 },
		{ validators: zodClient(formSchema) }
	);

	let isValid: boolean;
	let approved: boolean;
	let suspense: boolean;
	let semesterGrade: number;
	let finalExamGrade: number;

	export async function checkApprovedStatus() {
		const result = await validateForm();
		isValid = result.valid;

		semesterGrade = $form.firstBimesterGrade + $form.secondBimesterGrade;

		if (semesterGrade < 18) {
			approved = false;
			suspense = false;
		} else if (semesterGrade < 28) {
			approved = false;
			suspense = true;
			finalExamGrade = getFinalExamGrade(semesterGrade);
		} else {
			approved = true;
			suspense = false;
		}
	}
</script>

<form
	use:enhance
	class="flex w-[350px] flex-col gap-y-4 rounded-3xl border border-tertiary-500 p-4 md:w-[460px] md:p-8"
>
	<label class="label" for="firstBimesterGrade">
		<span>Nota primer bimestre</span>
	</label>
	<input
		type="number"
		id="firstBimesterGrade"
		bind:value={$form.firstBimesterGrade}
		on:input={checkApprovedStatus}
		class="input"
	/>
	{#if $errors.firstBimesterGrade}
		<span class="text-error-500">{$errors.firstBimesterGrade}</span>
	{/if}
	<label class="label" for="secondBimesterGrade">
		<span>Nota segundo bimestre</span>
	</label>
	<input
		type="number"
		id="secondBimesterGrade"
		bind:value={$form.secondBimesterGrade}
		on:input={checkApprovedStatus}
		class="input"
	/>
	{#if $errors.secondBimesterGrade}
		<span class="text-error-500">{$errors.secondBimesterGrade}</span>
	{/if}
	<hr class="mt-4 !border-tertiary-500" />
	{#if isValid}
		{#if approved}
			<p class="text-success-600">
				Aprobaste la materia con {semesterGrade.toFixed(2)}. Felicitaciones! 🎉
			</p>
		{:else if suspense}
			<p class="text-warning-700">
				Debes alcanzar <span class="font-bold text-warning-500">{finalExamGrade.toFixed(2)}/40</span
				>
				en el examen final (supletorio) para aprobar la materia.
				<br />
				Nota a alcanzar sobre 20:
				<span class="font-bold text-warning-500">{(finalExamGrade / 2).toFixed(2)}</span>
				<br />
				Nota a alcanzar sobre 10:
				<span class="font-bold text-warning-500">{(finalExamGrade / 4).toFixed(2)}</span>
			</p>
		{:else}
			<p class="text-error-500">Reprobaste la materia con {semesterGrade.toFixed(2)} 😔</p>
		{/if}
	{:else}
		<p class="text-secondary-500">Ingresa las 2 notas sobre 20 para obtener tu resultado.</p>
	{/if}
</form>
