/**
 * @param semesterGrade - The sum of first and second bisemester grades (0-40)
 * @returns The minimum grade over 40 to approve the subject
 **/
export const getFinalExamGrade = (semesterGrade: number): number => {
	const minimumExamGrade = 24;
	return Math.max(minimumExamGrade, minimumExamGrade * 2 - semesterGrade);
};
