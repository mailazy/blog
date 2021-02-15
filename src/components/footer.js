import React from "react"

import styles from "./footer.module.scss"

import logo from "../../static/logo.svg"

const Footer = ({ menuLinks, socialLinks, postPage }) => {
  return (
    <section className={styles.footerWrap}>
      <div>
        <div className={styles.lrContent}>
          <img src={logo} alt={"logo"} />
          <p>
            Integrate and deliver in minutes with our RESTful APIs, 
            You can integrate Mailazy in minutes with you platform. 
            Build and monitor your email solution on a trusted foundation
            with technical and stategic support when you need it the most.
          </p>
          <nav className={styles.social}>
            <ul>
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.slug} target="_blank" rel="noopener noreferrer">
                    <img
                      src={require(`../../static/${link.name}.svg`)}
                      width="40px"
                      height="40px"
                      alt={link.name}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.copyrightwrap}>
          <div className={styles.copyright}>
            © Copyright {new Date().getFullYear()}
            {`, `}
            <a
              style={{ boxShadow: "none" }}
              href={"https://mailazy.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" Mailazy"}
            </a>
          </div>
          <nav className={styles.menuLinks}>
            <ul>
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.slug}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Footer
