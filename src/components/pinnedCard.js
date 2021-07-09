import React from "react"
import styles from "./cardlist.module.scss"
import { Link, StaticQuery } from "gatsby"
import Bio from "./bio"
import defaultImg from "../../content/assets/default-blog.jpg"

// Utilities
import kebabCase from "lodash/kebabCase"
import Img from "gatsby-image"
import getTimeToRead from "../utils/timeToRead"

const PinnedCard = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1
          ) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                html
                frontmatter {
                  description
                  date(formatString: "MMMM DD, YYYY")
                  title
                  tags
                  description
                  coverImage {
                    childImageSharp {
                      fluid(quality: 80) {
                        ...GatsbyImageSharpFluid_noBase64
                      }
                    }
                  }
                  author {
                    id
                    github
                  }
                }
                fields {
                  authorId
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => {
        const node = data.allMarkdownRemark.edges[0].node
        const tags = node.frontmatter.tags || []
        let coverImagePath = node.frontmatter.coverImage
        return (
          <React.Fragment>
            <section className={`${styles.pinnedwrap} py-80`}>
              <div className={styles.blogContentPinned}>
                <div className={styles.avatarPinned}>
                  <Link to={node.fields.slug} className="bs-md">
                    {coverImagePath ? (
                      <Img
                        fluid={coverImagePath.childImageSharp.fluid}
                        Tag="div"
                      />
                    ) : (
                      <img src={defaultImg} alt="default-img" />
                    )}
                  </Link>
                </div>
                <div className={styles.descriptionPinned}>
                  <div className={`${styles.tag} ${styles.pinned}`}>
                    {tags &&
                      tags.map(tag => (
                        <Link to={`/tags/${kebabCase(tag)}/`}> {tag} </Link>
                      ))}
                  </div>
                  <div className={styles.description}>
                    <h1>
                      <Link to={node.fields.slug}>
                        {node.frontmatter.title || node.fields.slug}
                      </Link>
                    </h1>
                    <p
                      className={`${styles.descriptiontext} ${styles.pinned}`}
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </div>
                  {node.frontmatter.author && (
                    <Bio
                      date={node.frontmatter.date}
                      author={node.frontmatter.author}
                      pinned
                      readingTime={getTimeToRead(node.html)}
                    />
                  )}
                </div>
              </div>
            </section>
            {/* CTA section */}
            <section className="bg-bright-01">
              <div className="grid-66-33 cta-small">
                <div>
                  <h3>Send Transactional emails With Confidence</h3>
                  <p>
                    Our dedicated support team works around the clock because
                    transactional emails never stop.
                  </p>
                </div>
                <div className="cta-small-button">
                  <p>
                    <a
                      className="btn-primary btn-white ga_event }"
                      href="https://app.mailazy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Free Sign Up
                    </a>
                    <span>Set up in 2 minutes . No Credit Card Required</span>
                  </p>
                </div>
              </div>
            </section>
          </React.Fragment>
        )
      }}
    />
  )
}

export default PinnedCard
