import "./checkout.scss";
import checkoutLogo from "../../assets/images/kavio_logo.png";
import { useLocation, Link } from "react-router";
import CheckoutSummary from "./CheckoutSummary";
import { useFormik } from "formik";
import { checkoutSchema } from "./validationSchema";
import { useEffect, useRef, useState } from "react";
import Axios from "../../services/Axios";

const Checkout = () => {
  const location = useLocation();
  const cards = location.state?.cards;

  // PayTR form submit için
  const formRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL; // (sende vardı, dokunmadım)

  /* ✅ PayTR init alanları (örnek)
     Bunları production'da backend'den set etmelisin (merchant_oid, paytr_token, user_ip vs)
  */
  const [paytrInit, setPaytrInit] = useState({
    cardNumber: "9792030394440796",
    cardHolder: "PAYTR TEST",
    expireDate: "12/24", // MM/YY
    cvc: "000", // 3 digit
    merchant_id: "",
    user_ip: "",
    merchant_oid: "",
    email: "",
    payment_type: "",
    currency: "",
    test_mode: "",
    non_3d: "",
    merchant_ok_url: "http://localhost:5173/payment-success",
    merchant_fail_url: "http://localhost:5173/payment-failure",
    user_phone: "",
    debug_on: "",
    client_lang: "",
    paytr_token: "",
    non3d_test_failed: "",
    installment_count: "",
    card_type: "",
    user_basket: "",
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardHolder: "PAYTR TEST",
      expireDate: "12/24", // MM/YY
      cvc: "000", // 3 digit
      firstName: "Test Ad",
      lastName: "Test Soyad",
      address: "adress",
      apartment: "cddf",
      city: "dfg",
      province: "dfg",
    },
    validationSchema: checkoutSchema,
    onSubmit: async () => {
      try {
        // 1) Önce senin endpoint’e sipariş/ödeme kaydı aç
        const payload = {
          // totalPrice: Number(paymentAmount),
          totalPrice: 100,
          paymentType: "CARD",
          email: paytrInit.email || "user@test.com",
          name: formik.values.firstName,
          surname: formik.values.lastName,
          fullAddress: `${formik.values.address} ${
            formik.values.apartment || ""
          } ${formik.values.province || ""} ${formik.values.city || ""}`.trim(),
          mobilePhone: paytrInit.user_phone || "05555555555",
          userOrders: (Array.isArray(cards) ? cards : []).map((c) => ({
            item: {
              product: c?.item?.product || "",
              amount: String(c?.item?.amount ?? ""),
              quantity: String(c?.item?.quantity ?? ""),
              layout: c?.item?.layout || "",
              logo: c?.item?.logo || "",
            },
            userInfo: {
              name: c?.userInfo?.name || "",
              surname: c?.userInfo?.surname || "",
            },
          })),
        };

        const res = await Axios.post("/user-orders/card/payment", payload);

        if (res?.data?.paytr_token) {
          setPaytrInit((prev) => ({
            ...prev,
            ...res.data,
          }));
          setPaytrInit((prev) => ({
            ...prev,
            merchant_ok_url: "http://localhost:5173/payment-success",
            merchant_fail_url: "http://localhost:5173/payment-failure",
          }));
        }
      } catch (err) {
        console.error("eft/payment error:", err);
      }
    },
  });

  useEffect(() => {
    if (!paytrInit?.paytr_token) return;

    formRef.current?.submit();
  }, [paytrInit?.paytr_token]);

  /* BIN sorgusu (8 hane) */
  useEffect(() => {
    const number = formik.values.cardNumber.replace(/\s+/g, "").slice(0, 8);

    if (number.length >= 8) {
      Axios.get(`/payment/bin?binNumber=${number}`)
        .then((res) => {
          if (res?.data?.status === "success") {
            // setPaytrInit((prev) => ({...prev,card_type:res?.data?.brand}));
            setPaytrInit((prev) => ({ ...prev, card_type: "bonus" }));
          }
        })
        .catch((err) => {
          console.error("BIN error:", err);
        });
    }
  }, [formik.values.cardNumber]);

  if (!cards) {
    return (
      <div className="container my-5">
        <div className="checkout_message_container">
          <h3 className="checkout_message">
            Sepetiniz boş. Devam etmek için önce bir ürün seçin.
          </h3>
          <Link to="/" className="checkout_message_link">
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const errorClass = (field) =>
    formik.errors[field] && formik.touched[field] ? "error" : "";

  // expireDate -> MM / YY
  const expiryMonth = (formik.values.expireDate || "").split("/")[0] || "";
  const expiryYear = (formik.values.expireDate || "").split("/")[1] || "";

  return (
    <div className="container my-5">
      <div className="checkout_wrapper">
        <div className="checkout_logo">
          <img src={checkoutLogo} alt="" className="checkout_logo_img" />
        </div>
        <div className="checkout_container">
          <div className="payment">
            <div className="payment_title">Ödeme</div>

            <div className="row">
              {/* KART NUMARASI */}
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    name="cardNumber"
                    className={`mui-input ${errorClass("cardNumber")}`}
                    placeholder=" "
                    value={formik.values.cardNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className={`mui-label ${errorClass("cardNumber")}`}>
                    Kart Numarası
                  </label>
                  <span className="mui-line" />

                  {formik.touched.cardNumber && formik.errors.cardNumber && (
                    <p className="mui-error-text">{formik.errors.cardNumber}</p>
                  )}
                </div>
              </div>

              {/* KART SAHİBİ */}
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    name="cardHolder"
                    className={`mui-input ${errorClass("cardHolder")}`}
                    placeholder=" "
                    value={formik.values.cardHolder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className={`mui-label ${errorClass("cardHolder")}`}>
                    Kart Sahibi
                  </label>
                  <span className="mui-line"></span>

                  {formik.touched.cardHolder && formik.errors.cardHolder && (
                    <p className="mui-error-text">{formik.errors.cardHolder}</p>
                  )}
                </div>
              </div>

              {/* SON KULLANMA TARİHİ (MM/YY zorunlu maske) */}
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    name="expireDate"
                    className={`mui-input ${errorClass("expireDate")}`}
                    placeholder=" "
                    value={formik.values.expireDate}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 4); // MMYY
                      const mm = raw.slice(0, 2);
                      const yy = raw.slice(2, 4);
                      const formatted = yy.length ? `${mm}/${yy}` : mm;
                      formik.setFieldValue("expireDate", formatted);
                    }}
                    onBlur={formik.handleBlur}
                    inputMode="numeric"
                  />
                  <label className={`mui-label ${errorClass("expireDate")}`}>
                    Son Kullanma Tarihi (AA/YY)
                  </label>
                  <span className="mui-line"></span>

                  {formik.touched.expireDate && formik.errors.expireDate && (
                    <p className="mui-error-text">{formik.errors.expireDate}</p>
                  )}
                </div>
              </div>

              {/* CVC (3 hane sayı) */}
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    name="cvc"
                    className={`mui-input ${errorClass("cvc")}`}
                    placeholder=" "
                    value={formik.values.cvc}
                    onChange={(e) => {
                      const onlyDigits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 3);
                      formik.setFieldValue("cvc", onlyDigits);
                    }}
                    onBlur={formik.handleBlur}
                    inputMode="numeric"
                  />
                  <label className={`mui-label ${errorClass("cvc")}`}>
                    Güvenlik Kodu
                  </label>
                  <span className="mui-line"></span>

                  {formik.touched.cvc && formik.errors.cvc && (
                    <p className="mui-error-text">{formik.errors.cvc}</p>
                  )}
                </div>
              </div>
            </div>

            {/* TESLİMAT ADRESİ */}
            <div className="payment_title mt-4">Teslimat Adresi</div>

            <div className="row">
              {/* AD */}
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    name="firstName"
                    className={`mui-input ${errorClass("firstName")}`}
                    placeholder=" "
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className={`mui-label ${errorClass("firstName")}`}>
                    Ad
                  </label>
                  <span className="mui-line"></span>

                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="mui-error-text">{formik.errors.firstName}</p>
                  )}
                </div>
              </div>

              {/* SOYAD */}
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    name="lastName"
                    className={`mui-input ${errorClass("lastName")}`}
                    placeholder=" "
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className={`mui-label ${errorClass("lastName")}`}>
                    Soyad
                  </label>
                  <span className="mui-line"></span>

                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="mui-error-text">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* ADRES */}
              <div className="col-md-12">
                <div className="mui-field">
                  <input
                    type="text"
                    name="address"
                    className={`mui-input ${errorClass("address")}`}
                    placeholder=" "
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className={`mui-label ${errorClass("address")}`}>
                    Adres
                  </label>
                  <span className="mui-line"></span>

                  {formik.touched.address && formik.errors.address && (
                    <p className="mui-error-text">{formik.errors.address}</p>
                  )}
                </div>
              </div>

              {/* DAİRE (opsiyonel) */}
              <div className="col-md-12">
                <div className="mui-field">
                  <input
                    type="text"
                    name="apartment"
                    className="mui-input"
                    placeholder=" "
                    value={formik.values.apartment}
                    onChange={formik.handleChange}
                  />
                  <label className="mui-label">Daire, kat, kapı no vb.</label>
                  <span className="mui-line"></span>
                </div>
              </div>

              {/* İL */}
              <div className="col-md-6">
                <div className="mui-field">
                  <select
                    name="city"
                    className={`mui-select ${errorClass("city")}`}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled hidden>
                      İl
                    </option>
                    <option value="istanbul">İstanbul</option>
                    <option value="ankara">Ankara</option>
                  </select>
                  <span className="mui-line"></span>

                  {formik.touched.city && formik.errors.city && (
                    <p className="mui-error-text">{formik.errors.city}</p>
                  )}
                </div>
              </div>

              {/* İLÇE */}
              <div className="col-md-6">
                <div className="mui-field">
                  <select
                    name="province"
                    className={`mui-select ${errorClass("province")}`}
                    value={formik.values.province}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled hidden>
                      İlçe
                    </option>
                    <option value="kadikoy">Kadıköy</option>
                    <option value="besiktas">Beşiktaş</option>
                  </select>
                  <span className="mui-line"></span>

                  {formik.touched.province && formik.errors.province && (
                    <p className="mui-error-text">{formik.errors.province}</p>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="payment_title my-4">Kargo Seçeneği</div>

            <div className="payment-checkbox-group mb-2">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label d-flex align-items-center justify-content-between">
                  Yurtiçi (3-5 iş günü)
                  <span>₺4.00</span>
                </label>
              </div>
            </div>

            <div className="payment-checkbox-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label d-flex align-items-center justify-content-between">
                  DHL (1-5 iş günü)
                  <span>₺3.25</span>
                </label>
              </div>
            </div> */}
          </div>

          {/* ✅ Accept -> formik.submitForm -> onSubmit -> eft/payment -> PayTR submit */}
          <CheckoutSummary cards={cards} onAccept={formik.submitForm} />
          {/* <CheckoutSummary cards={cards} /> */}
        </div>
        <form ref={formRef} action="https://www.paytr.com/odeme" method="post">
          <input
            type="hidden"
            name="cc_owner"
            value={formik?.values?.cardHolder}
          />
          <input
            type="hidden"
            name="card_number"
            value={formik.values.cardNumber.replace(/\s+/g, "")}
          />
          <input type="hidden" name="expiry_month" value={expiryMonth} />
          <input type="hidden" name="expiry_year" value={expiryYear} />
          <input type="hidden" name="cvv" value={formik.values.cvc} />
          <input
            type="hidden"
            name="merchant_id"
            value={paytrInit.merchant_id}
          />
          <input type="hidden" name="user_ip" value={paytrInit.user_ip} />
          <input
            type="hidden"
            name="merchant_oid"
            value={paytrInit.merchant_oid}
          />
          <input type="hidden" name="email" value={paytrInit.email} />
          <input
            type="hidden"
            name="payment_type"
            value={paytrInit.payment_type}
          />
          {/* <input type="hidden" name="payment_amount" value={paymentAmount} /> */}
          <input
            type="hidden"
            name="payment_amount"
            value={paytrInit.payment_amount}
          />

          <input type="hidden" name="currency" value={paytrInit.currency} />
          <input type="hidden" name="test_mode" value={paytrInit.test_mode} />
          <input type="hidden" name="non_3d" value={paytrInit.non_3d} />
          <input
            type="hidden"
            name="merchant_ok_url"
            value={paytrInit.merchant_ok_url}
          />
          <input
            type="hidden"
            name="merchant_fail_url"
            value={paytrInit.merchant_fail_url}
          />
          <input
            type="hidden"
            name="user_name"
            // value={`${formik.values.firstName} ${formik.values.lastName}`.trim()}
            value={`${paytrInit.user_name}`.trim()}
          />
          <input
            type="hidden"
            name="user_address"
            value={`${formik.values.address} ${formik.values.apartment || ""} ${
              formik.values.province || ""
            } ${formik.values.city || ""}`.trim()}
          />
          <input type="hidden" name="user_phone" value={paytrInit.user_phone} />
          <input
            type="hidden"
            name="user_basket"
            value={paytrInit?.user_basket}
          />
          <input type="hidden" name="debug_on" value={paytrInit.debug_on} />
          <input
            type="hidden"
            name="client_lang"
            value={paytrInit.client_lang}
          />
          <input
            type="hidden"
            name="paytr_token"
            value={paytrInit.paytr_token}
          />
          <input
            type="hidden"
            name="non3d_test_failed"
            value={paytrInit.non3d_test_failed}
          />
          <input
            type="hidden"
            name="installment_count"
            value={paytrInit.installment_count}
          />
          <input type="hidden" name="card_type" value={paytrInit.card_type} />
        </form>
      </div>
    </div>
  );
};

export default Checkout;
