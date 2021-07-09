import React from "react"
import styles from "./freeTrial.module.scss"
// import { OutboundLink } from "gatsby-plugin-google-analytics"
import ReactGA from "react-ga"

const logger = function () {
  ReactGA.event({
    category: "Signup",
    action: "User clicked on Free signup button",
    label: "Signup",
  })
}

const FreeTrial = () => {
  return (
    <section className={`${styles.freetrialWrap}`}>
      <div>
        <div className={styles.freetrial}>
          {/* <div className={styles.content}>
          <div className={styles.heading}>
            <h4>{"Send Transactional emails With Confidence"}</h4>
            <p>
              {
                "Partner with the email service trusted by developers and marketers for time-savings, scalability, and delivery expertise. Get help whenever you need it! Contact us here or just drop us a message on the live chat. Our dedicated support team works around the clock because transactional emails never stop"
              }
            </p>
          </div>
          <a
            className={"btn-primary ga_event"}
            href={`https://mailazy.com/`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={logger}
          >
            {"Signup now"}
          </a>
        </div> */}
          <div className={styles.content}>
            <div className="subscribe-section">
              <h3>{"Subscribe to our newsletter!"}</h3>
              <p>
                {
                  "Email best practices and industry news. Delivered monthly. We promise, we will never spam you!"
                }
              </p>
              <div className="field-group">
                <div className="required field mb-0 input-wrapper">
                  <div className={`${styles.ui} ${styles.input}`}>
                    <input
                      name="email"
                      placeholder="Your email"
                      required
                      id="emailsubscribe"
                      type="email"
                    ></input>
                    <button
                      type="submit"
                      id="submitsubscribe"
                      name="send"
                      className="ui button btn btn-primary "
                    >
                      Subscribe
                    </button>
                  </div>
                  <div id="newsLetterMessage"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FreeTrial
