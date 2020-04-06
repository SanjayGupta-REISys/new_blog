import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
//import { render } from "react-dom"

class BlogIndex extends React.Component {
  state = {
    loading: true,
    error: false,
    fetchedData: [],
  }

componentDidMount(){
  fetch('https://swapi.co/api/people').then(response => {
    return response.json()
  }).then(json => {
    //console.log(json)
    this.setState({
      fetchedData: json.results,
      loading: false
    })
  })
}
/*componentDidMount(){
  fetch('https://www.ussbir.io/api/awards.json?keyword=sbir',
  {method:'POST',
  headers:{
    'Access-Control-Allow-Origin': '*',
  }}).then(response => {
    return response.json()
  }).then(json => {
    console.log(json)
  })
}
*/

  render(){
    const {loading, fetchedData} = this.state
    const {data} = this.props
    const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={this.props.location} title={siteTitle}>
      <div>Data loading from an API <a href="https://swapi.co/api/people" target="_blank">Link</a></div>
{loading ? (
  <p>LOADING...</p>
):(
      fetchedData.map(character =>(
      <div key={character.name}><strong>{character.name}</strong>
        <ul>
          <li>Hair-color: {' '} {character.hair_color}</li>
          <li>Skin-color: {' '} {character.skin_color}</li>
        </ul>
      </div>
      ))
)}
<div>**********************************************</div>

    </Layout>
  )
}
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
