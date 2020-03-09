/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
// const _ = require("lodash")
const slugify = require("slugify")
// const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Category implements Node {
      title: String!
      identity: String!
      image: File
      slug: String!
      description: String
      products: [Product] @link(by: "category", from: "sku")
    }
    type Review implements Node {
      name: String!
      image: File
      product: Product @link(by: "sku")
      message: String!
      referal: String
    }
    type Variant {
      name: String!
      image: File
      weight: Float
      price: Float
    }
    type Product implements Node {
      title: String!
      draft: Boolean
      sku: String!
      description: String
      image: File
      discount: Float
      rating: Float
      sold: Int
      slug: String!
      reviews: [Review] @link(by: "product", from: "sku")
      variants: [Variant]
      category: Category @link(by: "identity")
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Product: {
      category: {
        resolve(source, args, context, info) {
          return context.nodeModel
            .getAllNodes({ type: "Category" })
            .find(category => category.identity === source.category)
        },
      },
    },
    Review: {
      product: {
        resolve(source, args, context, info) {
          return context.nodeModel
            .getAllNodes({ type: "Product" })
            .find(p => p.sku === source.product)
        },
      },
    },
    Category: {
      products: {
        resolve(source, args, context, info) {
          return context.nodeModel
            .getAllNodes({ type: "Product" })
            .filter(product => product.category === source.identity)
        },
      },
    },
  }
  createResolvers(resolvers)
}

exports.createPages = async ({ actions, reporter, graphql }) => {
  const { createPage } = actions
  const productTemplate = path.resolve("src/templates/single-product.js")

  const { data, errors } = await graphql(
    `
      query loadProductsQuery($limit: Int!) {
        allProduct(limit: $limit, sort: { fields: sold, order: DESC }) {
          nodes {
            id
            parent {
              ... on Mdx {
                fields {
                  slug
                }
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  )

  if (errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  data.allProduct.nodes.forEach(node => {
    createPage({
      path: node.parent.fields.slug,
      component: productTemplate,
      context: {
        id: node.id,
        slug: node.parent.fields.slug,
      },
    })
  })
}

/**
 * All generate page must have their own slug
 * @param node
 * @param actions
 * @param getNode
 */
exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createContentDigest,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `Yaml`) {
    const parent = getNode(node.parent)
    console.log("create Review node", node.id)
    if (
      parent.internal.type === "File" &&
      parent.sourceInstanceName === "review"
    ) {
      const fieldData = {
        name: node.name,
        image: node.image,
        product: node.product,
        message: node.message,
        referal: node.referal,
      }

      const nodeId = createNodeId(`${node.id} >>> Review`)
      const nodeContent = JSON.stringify(fieldData)

      createNode({
        ...fieldData,
        id: nodeId,
        parent: node.id,
        children: [],
        internal: {
          type: `Review`,
          contentDigest: createContentDigest(fieldData),
          content: nodeContent,
          description: `Review`,
        },
      })
    }
  }

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const path = parent.sourceInstanceName
    const slug = node.frontmatter.slug || slugify(node.frontmatter.title, "-")

    createNodeField({
      name: `slug`,
      node,
      value: `${path}/${slug}`,
    })

    if (
      parent.internal.type === "File" &&
      parent.sourceInstanceName === "product"
    ) {
      const fieldData = {
        ...node.frontmatter,
      }
      const nodeId = createNodeId(`${node.id} >>> Product`)
      const nodeContent = JSON.stringify(fieldData)
      createNode({
        ...fieldData,
        id: nodeId,
        parent: node.id,
        children: [],
        internal: {
          type: `Product`,
          contentDigest: createContentDigest(fieldData),
          content: nodeContent,
          description: `Product`,
        },
      })
    }
    if (
      parent.internal.type === "File" &&
      parent.sourceInstanceName === "category"
    ) {
      const fieldData = {
        ...node.frontmatter,
      }
      const nodeId = createNodeId(`${node.id} >>> Category`)
      const nodeContent = JSON.stringify(fieldData)
      createNode({
        ...fieldData,
        id: nodeId,
        parent: node.id,
        children: [],
        internal: {
          type: `Category`,
          contentDigest: createContentDigest(fieldData),
          content: nodeContent,
          description: `Product Category`,
        },
      })
    }
  }
}
