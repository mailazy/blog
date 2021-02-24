require("dotenv").config({ path: `${__dirname}/.env` })

module.exports = {
  siteMetadata: {
    title: `Mailazy Blog`,
    titleTemplate: "%s · Mailazy Blog",
    description: "Transactional Emails Redefined!",
    siteUrl: "https://mailazy.com",
    feedUrl: "https://mailazy.com/blog",
    image: "/logo.svg",
    owner: "Mailazy",
    menuLinks: [
      {
        name: "Docs",
        slug: "https://mailazy.com/docs",
      },
      {
        name: "Open Source",
        slug: "https://github.com/mailazy/",
      },
    ],
    footerLinks: [
      {
        name: "Privacy Policy",
        slug: "https://mailazy.com/privacy-policy.html",
      },
      {
        name: "Terms",
        slug: "https://mailazy.com/terms-of-use.html",
      },
    ],
    socialLinks: [
      {
        name: "twitter",
        slug: "https://twitter.com/mailazydotcom",
      },
      {
        name: "linkedin",
        slug: "https://www.linkedin.com/company/mailazy",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          { resolve: "gatsby-remark-copy-linked-files" },
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "Dark+ (default dark)",
              languageAliases: {
                html: "js",
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-177200314-3"],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mailazy Blog`,
        short_name: `Mailazy Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            path: node => node.fields.slug,
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    `gatsby-transformer-yaml`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                feedUrl,
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  url: site.siteMetadata.feedUrl + edge.node.fields.slug,
                  pubDate: edge.node.frontmatter.date,
                  author: edge.node.frontmatter.author.id,
                  categories: edge.node.frontmatter.tags,
                  enclosure: {
                    url:
                      site.siteMetadata.siteUrl +
                      edge.node.frontmatter.coverImage.childImageSharp.fluid.src,
                    type: "image/jpeg",
                    size: 768,
                  },
                  custom_elements: [
                    {
                      "content:encoded": `<p> ${edge.node.frontmatter.description || edge.node.excerpt
                        } </p> <br/>  <a href="${site.siteMetadata.feedUrl + edge.node.fields.slug
                        }">Read On</a>`,
                    },
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000
                  filter: { fileAbsolutePath: { regex: "//content//" } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 280)
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date(formatString: "MMMM DD, YYYY")
                        coverImage {
                          publicURL,
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                        author {
                          id
                        }
                        tags
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Mailazy Blog",
            feed_url: "https://mailazy.com/blog/rss.xml",
            site_url: "https://mailazy.com/blog/",
            description: "Company Updates, Technology Articles from Mailazy",
            language: "en-us",
          },
        ],
      },
    },
  ],
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
  pathPrefix: `/blog`,
}
