import "@testing-library/jest-dom/vitest";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { getFinalExamGrade } from "$lib/utils";
import Form from "$lib/components/form.svelte";

describe("Approved status", () => {
	test("Approves", async () => {
		const user = userEvent.setup();

		render(Form);

		const firstBimesterInput = screen.getByLabelText("Nota primer bimestre");
		const secondBimesterInput = screen.getByLabelText("Nota segundo bimestre");

		await user.type(firstBimesterInput, "14");
		await user.type(secondBimesterInput, "14");

		expect(screen.getByText(/Aprobaste la materia/i)).toBeInTheDocument();
	});

	test("Suspended", async () => {
		const user = userEvent.setup();

		render(Form);

		const firstBimesterInput = screen.getByLabelText("Nota primer bimestre");
		const secondBimesterInput = screen.getByLabelText("Nota segundo bimestre");

		await user.type(firstBimesterInput, "14");
		await user.type(secondBimesterInput, "13");

		expect(screen.getByText(/Debes alcanzar/i)).toBeInTheDocument();
	});

	test("Fails", async () => {
		const user = userEvent.setup();

		render(Form);

		const firstBimesterInput = screen.getByLabelText("Nota primer bimestre");
		const secondBimesterInput = screen.getByLabelText("Nota segundo bimestre");

		await user.type(firstBimesterInput, "9");
		await user.type(secondBimesterInput, "8");

		expect(screen.getByText(/Reprobaste la materia/i)).toBeInTheDocument();
	});
});

describe("Final exam grade", async () => {
	test("Minimum grade", () => {
		expect(getFinalExamGrade(27)).toBe(24);
		expect(getFinalExamGrade(24)).toBe(24);
		expect(getFinalExamGrade(23)).toBe(25);
		expect(getFinalExamGrade(18)).toBe(30);
	});
});
