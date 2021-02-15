import React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import _ from "lodash"

import SEO from "./seo"
import Bio from "./bio"

import styles from "./post.module.scss"

import { Link } from "gatsby"

import headStyles from "./cardlist.module.scss"
import TagMenu from "./tagMenu"

import ReactGA from "react-ga"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import getTimeToRead from "../utils/timeToRead"

const eventLogger = function ({ category, action, label }) {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}

const Post = ({ post, relatedPost }) => {
  const image = post.frontmatter.coverImage
  const tags = post.frontmatter.tags || []
  const author = post.frontmatter.author
  const githubUrl = author.github
    ? `https://github.com/${author.github}.png?size=100`
    : `https://ui-avatars.com/api/?name=${author.id}&size=460`

  return (
    <>
      <Helmet>
        <script
          id="s9-sdk"
          async
          defer
          content="4b735d9693cd4a9cb7fb169cd2d50141"
          src="//cdn.social9.com/js/socialshare.min.js"
        ></script>
      </Helmet>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image && image.childImageSharp.fluid.src}
        pathname={post.fields.slug}
        article
      />
      <section
        className={`${headStyles.pinnedwrap} ${headStyles.postDetail} py-80`}
      >
        <div className={headStyles.blogContentPinned}>
          <div className={headStyles.avatarPinned}>
            <Img
              fluid={image.childImageSharp.fluid}
              Tag="div"
              className="bs-md"
              alt={post.frontmatter.title}
            />
          </div>
          <div className={headStyles.descriptionPinned}>
            <div className={`${headStyles.tag} ${headStyles.pinned}`}>
              {tags &&
                tags.map(tag => (
                  <Link to={`/tags/${kebabCase(tag)}/`}> {tag} </Link>
                ))}
            </div>
            <div className={headStyles.description}>
              <h1>{post.frontmatter.title || post.fields.slug}</h1>
              <p
                className={`${headStyles.descriptiontext} ${headStyles.pinned}`}
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />
            </div>
            {author && (
              <Bio
                readingTime={getTimeToRead(post.html)}
                date={post.frontmatter.date}
                author={author}
                pinned
              />
            )}
          </div>
        </div>
      </section>
      <section className={`pt-80 ${styles.postDetail}`}>
        <div>
          <div className="grid-70-30">
            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div class={styles.sidebar}>
              {relatedPost.length ? (
                <>
                  <div class={styles.relatedPost}>
                    <h3>Related Posts</h3>
                    {relatedPost.map(({ node }, i) => (
                      <div class={styles.relatedPostRow}>
                        <div class={styles.description}>
                          <h4>
                            <Link to={node.fields.slug} rel="prev">
                              {node.frontmatter.title}
                            </Link>
                          </h4>
                        </div>
                        <div class={styles.tag}>
                          {node.frontmatter.tags.map(tag => (
                            <Link to={`/tags/${kebabCase(tag)}/`}>
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                </>
              ) : null}
              <div>
                <h3>Follow Mailazy </h3>
                <div className={styles.followBtn}>
                  <a
                    href="https://twitter.com/mailazydotcom"
                    onClick={() =>
                      eventLogger({
                        category: "Social Clicks",
                        action: "Clicked on Twitter",
                        label: "Twitter",
                      })
                    }
                    target="blank"
                  >
                    <FontAwesomeIcon icon={faTwitter} title={"Twitter"} />
                    <p> on twitter </p>
                  </a>
                </div>
              </div>
              <hr />
              <div>
                <h3>Mailazy Docs</h3>
                <p>Send Emails in Minutes</p>
                <a
                  className={"btn-primary ga_event"}
                  href={"https://mailazy.com/docs"}
                  key={"docs-link"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    eventLogger({
                      category: "Mailazy Docs",
                      action: "User clicked on Docs button",
                      label: "Docs",
                    })
                  }
                >
                  {"click here"}
                </a>
              </div>
              <hr />
              <TagMenu />
            </div>
          </div>
          <div class={`${styles.author} d-flex py-80`}>
            <div class={styles.authorImage}>
              <img
                className={`circle extra-large`}
                src={githubUrl}
                alt={author.id}
              />
            </div>
            <div class={styles.aboutAuthor}>
              <div class={styles.aboutAuthorInner}>
                <h3>{author.id}</h3>
                <p>{author.bio}</p>
                <Link to={`/author/${_.kebabCase(author.id)}/`}>
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="commento"></div>
      </section>
    </>
  )
}

export default Post
