import * as z from "zod";

export const formSchema = z.object({
	firstBimesterGrade: z.coerce
		.number({ invalid_type_error: "Solo se puede ingresar números" })
		.min(0, "Así el profe te odie no te puede poner menos de 0 💀")
		.max(20, "Muy cepillo para que tengas más de 20 🪥"),
	secondBimesterGrade: z.coerce
		.number({ invalid_type_error: "Solo se puede ingresar números" })
		.min(0, "Así el profe te odie no te puede poner menos de 0 💀")
		.max(20, "Muy cepillo para que tengas más de 20 🪥")
});

export type FormSchema = z.infer<typeof formSchema>;
