import * as Yup from "yup";

export const checkoutSchema = Yup.object().shape({
  cardNumber: Yup.string().required("Kart numarası zorunludur"),
  cardHolder: Yup.string().required("Kart sahibi zorunludur"),

  expireDate: Yup.string()
    .required("Son kullanma tarihi zorunludur")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "AA/YY formatında giriniz (örn: 12/27)"),

  cvc: Yup.string()
    .required("Güvenlik kodu zorunludur")
    .matches(/^\d{3}$/, "Güvenlik kodu 3 haneli olmalıdır"),

  firstName: Yup.string().required("Ad zorunludur"),
  lastName: Yup.string().required("Soyad zorunludur"),
  address: Yup.string().required("Adres zorunludur"),
  city: Yup.string().required("İl zorunludur"),
  province: Yup.string().required("İlçe zorunludur"),
});
