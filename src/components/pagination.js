import React from "react"
import { Link } from "gatsby"

import styles from "./pagination.module.scss"

const Pagination = ({ pages, currentPage }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === pages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  let pageArray = []
  let intialPages = false
  let lastPages = false
  let startIndex = 0
  if (currentPage <= 3) {
    startIndex = 1;
    intialPages = true;
  } else if (currentPage + 3 > pages) {
    startIndex = pages - 4;
    lastPages = true;
  } else {
    startIndex = currentPage - 2
  }
  pageArray = [startIndex]

  if (!isLast) {
    for (let i = 1; i !== pages; i++) {
      pageArray = pageArray.concat([startIndex + i]);
    }
  } else {
    lastPages = true
  }

  return (
    <section className="bg-light py-40">
      <div className={styles.pagination}>
        {!isFirst && <Link to={prevPage !== "" ? `/${prevPage}/#all-articles`: "/"} rel="prev" />}
        {!intialPages && (
          <Link
            to={`/`}
            className={currentPage === 1 ? styles.active : ""}
          >
            {1}
          </Link>
        )}
        {!intialPages && <p to="">...</p>}
        {pageArray.map((k, i) => (
          <Link
            to={`${k === 1 ? `/` : `/${k}/#all-articles`}`}
            key={k}
            className={currentPage === k ? styles.active : ""}
          >
            {k}
          </Link>
        ))}
        {!lastPages && pages > 4 && <p>...</p>}
        {!lastPages && pages > 4 && (
          <Link
            to={`/${pages}/#all-articles`}
            key={pages}
            className={currentPage === pages ? styles.active : ""}
          >
            {pages}
          </Link>
        )}

        {!isLast && <Link to={`/${nextPage}/#all-articles`} rel="next" />}
      </div>
    </section>
  )
}

export default Pagination
