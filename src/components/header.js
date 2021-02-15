import React from "react";
import { Link } from "gatsby";

import headerStyles from "./header.module.scss";

import logo from "../../static/logo.svg";
import Search from "./search";
import ReactGA from "react-ga";

const logger = function (linkName, headerLink) {
  ReactGA.event({
    category: "Header Menu Clicks",
    action: `User clicked on ${linkName}`,
    label: `${headerLink}`,
  })
}

const signUplogger = function () {
  ReactGA.event({
    category: "Signup",
    action: "User clicked on Free signup button",
    label: "Signup",
  })
}

const Header = ({ menuLinks, searchIndex }) => {
  return (
    <>
      <div className={headerStyles.header}>
        <Link className={logo} to={"/"}>
          <img src={logo} alt={`logo`} />
        </Link>
        <div className={headerStyles.menuLinks}>
          <nav className={headerStyles.menuLinksinner}>
            <ul>
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.slug}
                    key={index}
                    target="_blank"
                    class="ga_event"
                    rel="noopener noreferrer"
                    onClick={() => logger(link.name, link.slug)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={headerStyles.navRightSide}>
            <div className={headerStyles.freeSignup}>
              <a
                className={"btn-primary small ga_event"}
                href={`https://app.mailazy.com`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={signUplogger}
              >
                {"Dashboard"}
              </a>
            </div>
            <Search searchIndex={searchIndex} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
