import "./checkout.scss";
import checkoutLogo from "../../assets/images/kavio_logo.png";

const Checkout = () => {
  return (
    <div className="container my-5">
      <div className="checkout_wrapper">
        <div className="checkout_logo">
          <img src={checkoutLogo} alt="" className="checkout_logo_img" />
        </div>
        <div className="checkout_container">
          <div className="payment">
            <div className="payment_title">Payment</div>
            <div className="row">
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mui-input"
                    placeholder=" "
                  />
                  <label htmlFor="cardNumber" className="mui-label">
                    Card Number
                  </label>
                  <span className="mui-line"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mui-input"
                    placeholder=" "
                  />
                  <label htmlFor="cardNumber" className="mui-label">
                    Card Nunitor
                  </label>
                  <span className="mui-line"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mui-input"
                    placeholder=" "
                  />
                  <label htmlFor="cardNumber" className="mui-label">
                    Foirtration Date 1/21
                  </label>
                  <span className="mui-line"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mui-input"
                    placeholder=" "
                  />
                  <label htmlFor="cardNumber" className="mui-label">
                    Security Code
                  </label>
                  <span className="mui-line"></span>
                </div>
              </div>
            </div>
            <div className="payment_title mt-4">Shipping Address</div>
            <div className="row">
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mui-input"
                    placeholder=" "
                  />
                  <label htmlFor="cardNumber" className="mui-label">
                    First Name
                  </label>
                  <span className="mui-line"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mui-field">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mui-input"
                    placeholder=" "
                  />
                  <label htmlFor="cardNumber" className="mui-label">
                    Last Name
                  </label>
                  <span className="mui-line"></span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="mui-field">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mui-input"
                    placeholder=" "
                  />
                  <label htmlFor="cardNumber" className="mui-label">
                    Address
                  </label>
                  <span className="mui-line"></span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="mui-field">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mui-input"
                    placeholder=" "
                  />
                  <label htmlFor="cardNumber" className="mui-label">
                    Apartment, suite, etc...
                  </label>
                  <span className="mui-line"></span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mui-field">
                  <select
                    id="country"
                    name="country"
                    className="mui-select"
                    required
                  >
                    <option value="" disabled selected hidden>
                      City
                    </option>
                    <option value="tr">Türkiye</option>
                    <option value="us">Amerika</option>
                    <option value="de">Almanya</option>
                  </select>
                  <span className="mui-line"></span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mui-field">
                  <select
                    id="country"
                    name="country"
                    className="mui-select"
                    required
                  >
                    <option value="" disabled selected hidden>
                      Provinons
                    </option>
                    <option value="tr">Türkiye</option>
                    <option value="us">Amerika</option>
                    <option value="de">Almanya</option>
                  </select>
                  <span className="mui-line"></span>
                </div>
              </div>
            </div>
            <div className="payment_title my-4">Shipping Method</div>
            <div className="payment-checkbox-group mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customCheck"
                />
                <label className="form-check-label d-flex align-items-center justify-content-between" for="customCheck">
                  Yurtici (3-5 business days)
                  <span>$4.00</span>
                </label>
              </div>
            </div>
            <div className="payment-checkbox-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customCheck"
                />
                <label className="form-check-label d-flex align-items-center justify-content-between" for="customCheck">
                  DHL (1-5 business days)
                  <span>$3.25</span>
                </label>
              </div>
            </div>
          </div>
          <div className="summary">SUMMARY</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
