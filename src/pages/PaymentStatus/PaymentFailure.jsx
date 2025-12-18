import "./payment_status.scss";
import { FaCircleXmark,FaTriangleExclamation } from "react-icons/fa6";

const PaymentFailure = () => {
  return (
   <div
  className="payment_status_card is-failure"
  role="alert"
  aria-live="assertive"
  aria-labelledby="payment-title"
  aria-describedby="payment-desc payment-message"
>
  <div className="payment_icon_circle" aria-hidden="true">
    <FaCircleXmark />
  </div>

  <h5 className="payment_title" id="payment-title">
    Ödeme Başarısız!
  </h5>

  <p className="payment_description" id="payment-desc">
    Ödeme işlemi sırasında bir hata oluştu.
  </p>

  <div className="process" id="payment-message" aria-label="Bilgilendirme">
    <FaTriangleExclamation />
    <span className="process_text">
      Banka tarafından işlem onaylanmadı.
    </span>
  </div>
</div>


  )
}

export default PaymentFailure