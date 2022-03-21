import * as Yup from "yup";

export const validationSchema = Yup.object().shape
({
    nev: Yup
           .string()
           .required("A mező kitöltése kötelező!"),
    iranyzitoszam: Yup
           .number()
           .min(1000)
           .required("A mező kitöltése kötelező!"),
    szuletesiEv: Yup.date()
            .max(Yup.ref('szuletesiEv'), ({ max }) => `A dátum nem lehet korábbi mint ${formatDate(max)}!!`)
            .required("A mező kitöltése kötelező!"),
    telepules: Yup
           .string()
           .required("A mező kitöltése kötelező!"),
    lakcim: Yup
           .string()
           .required("A mező kitöltése kötelező!"),
    kategoria: Yup
            .string()
            .required("A mező kitöltése kötelező!")
});

const formatDate = (date: string | Date): string =>
{
    return new Date(date).toLocaleDateString()
}