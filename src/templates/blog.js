import React, { Component } from "react"
import { graphql, navigate } from "gatsby"
import { Button, Col, Row } from "antd"
import CategoriesWidget from "../components/CategoriesWidget"
import RecentCommentsWidget from "../components/RecentCommentsWidget"
import RecentPostsWidget from "../components/RecentPostsWidget"
import PostEntry from "../components/PostEntry"
import HomepageLayout from "../components/HomepageLayout"
import Seo from "../components/Seo"
import Pagination from "../components/Pagination"

class IndexPage extends Component {
  render() {
    const {
      data,
      location,
      pageContext: { pageNumber, hasNextPage, allPosts, itemsPerPage },
    } = this.props
    const blogPageNumber = pageNumber ? ` Page ${pageNumber}` : ``
    return (
      <HomepageLayout pageNumber={pageNumber} location={{ location }}>
        <Seo title={`Blog${blogPageNumber}`} />
        <Row type="flex" gutter={24}>
          <Col xs={24} md={16}>
            {data &&
              data.wpgraphql &&
              data.wpgraphql.posts.nodes.map(post => (
                <div key={post.id}>
                  <PostEntry post={post} />
                </div>
              ))}
          </Col>
          <Col xs={24} md={8}>
            <RecentPostsWidget />
            <CategoriesWidget />
            <RecentCommentsWidget />
          </Col>
        </Row>
        <Pagination
          pageNumber={pageNumber}
          hasNextPage={hasNextPage}
          allPosts={allPosts}
          itemsPerPage={itemsPerPage}
        />
      </HomepageLayout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query GET_POSTS($ids: [ID]) {
    wpgraphql {
      posts(first: 12, where: { in: $ids }) {
        nodes {
          ...PostEntryFragment
        }
      }
    }
  }
`
