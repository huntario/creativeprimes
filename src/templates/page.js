import {Link, graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React from "react"

const pageStyles = {
    color: "#232129",
    padding: 96,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
  }

const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
  }

const TemplatePage = ({
  data: {
    page: {
      name,
      cover,
      childMarkdownRemark: {html},
    },
  },
}) => {
  return (
    <main style={pageStyles}>
        <title>{name}</title>
      <h1 style={headingStyles} >{name}</h1>
      {/*
        To add a cover:
        Add an image in your Google Doc first page header
        https://support.google.com/docs/answer/86629
      */}
      {cover && <GatsbyImage image={getImage(cover.image)} />}
      <div style={pageStyles} dangerouslySetInnerHTML={{__html: html}} />
      <Link to="/">
        <button>{"Home"}</button>
      </Link>
    </main>
  )
}

export default TemplatePage

export const pageQuery = graphql`
  query Page($path: String!) {
    page: googleDocs(slug: {eq: $path}) {
      name
      cover {
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      childMarkdownRemark {
        html
      }
    }
  }
`