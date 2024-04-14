<script lang="ts" async="true">
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { formSchema } from "../schemas";

	const { form, errors, enhance, validateForm } = superForm(
		{ firstBimesterGrade: 0, secondBimesterGrade: 0 },
		{ validators: zodClient(formSchema) }
	);

	let isValid: boolean;
	let approved: boolean;
	let suspense: boolean;
	let semesterGrade: number;
	let finalExamGrade: number;

	async function checkApprovedStatus() {
		const result = await validateForm();
		isValid = result.valid;

		semesterGrade = $form.firstBimesterGrade + $form.secondBimesterGrade;

		if (semesterGrade < 18) {
			approved = false;
			suspense = false;
		} else if (semesterGrade >= 18 && semesterGrade < 28) {
			approved = false;
			suspense = true;
			finalExamGrade = 48 - semesterGrade;
			if (finalExamGrade < 24) finalExamGrade = 24;
		} else {
			approved = true;
			suspense = false;
		}
	}
</script>

<form
	use:enhance
	class="border-tertiary-500 flex w-[350px] flex-col gap-y-4 rounded-3xl border p-4 md:w-[460px] md:p-8"
>
	<label class="label" for="firstBimesterGrade">
		<span>Nota primer bimestre</span>
	</label>
	<input
		type="number"
		name="firstBimesterGrade"
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
		name="secondBimesterGrade"
		bind:value={$form.secondBimesterGrade}
		on:input={checkApprovedStatus}
		class="input"
	/>
	{#if $errors.secondBimesterGrade}
		<span class="text-error-500">{$errors.secondBimesterGrade}</span>
	{/if}
	<hr class="!border-tertiary-500 mt-4" />
	{#if isValid}
		{#if approved}
			<p class="text-success-600">
				Aprobaste la materia con {semesterGrade.toFixed(2)}, felicitaciones! 🎉
			</p>
		{:else if suspense}
			<p class="text-warning-700">
				Debes alcanzar <span class="text-warning-500 font-bold">{finalExamGrade.toFixed(2)}/40</span
				>
				en el examen final (supletorio) para aprobar la materia.
				<br />
				Nota a alcanzar sobre 20:
				<span class="text-warning-500 font-bold">{(finalExamGrade / 2).toFixed(2)}</span>
				<br />
				Nota a alcanzar sobre 10:
				<span class="text-warning-500 font-bold">{(finalExamGrade / 4).toFixed(2)}</span>
			</p>
		{:else}
			<p class="text-error-500">Reprobaste la materia con {semesterGrade.toFixed(2)} 😔</p>
		{/if}
	{:else}
		<p class="text-secondary-500">Ingresa las 2 notas sobre 20 para obtener tu resultado.</p>
	{/if}
</form>
