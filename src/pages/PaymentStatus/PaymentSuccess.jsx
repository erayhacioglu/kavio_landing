import "./payment_status.scss";
import { FaCheckCircle } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";


const PaymentSuccess = () => {
  return (
   <div
  className="payment_status_card is-success"
  role="status"
  aria-live="polite"
  aria-labelledby="payment-title"
  aria-describedby="payment-desc"
>
  <div className="payment_icon_circle" aria-hidden="true">
    <FaCheckCircle/>
  </div>

  <h5 className="payment_title" id="payment-title">
    Ödeme Başarılı!
  </h5>

  <p className="payment_description" id="payment-desc">
    Siparişiniz başarıyla alındı. Teşekkür ederiz.
  </p>

  <div className="process" aria-label="İşlem Bilgisi">
    <FaReceipt color="#e5e7eb"/>

    <span className="process_title">
      İşlem No
    </span>

    <span
      className="process_text"
      title="Kopyalamak için seçebilirsiniz"
    >
      #TR-9835673456
    </span>
  </div>
</div>

  )
}

export default PaymentSuccess