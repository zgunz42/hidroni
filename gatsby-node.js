/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const _ = require("lodash")
const slugify = require("slugify")
// const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const formatter = new Intl.NumberFormat("id-ID", {
  currency: "IDR",
  style: "currency",
})

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Category implements Node {
      title: String!
      identity: String!
      image: File @fileByRelativePath
      slug: String!
      description: String
      products: [Product] @link(by: "category", from: "sku")
    }
    type Review implements Node {
      name: String!
      image: File @fileByRelativePath
      product: Product @link(by: "sku")
      message: String!
      referral: String
    }
    type Tag {
      name: String
    }
    type Facet {
      name: String
      value: String
    }
    type Stats {
      ratingCount: Int
      averageRating: Int
      totalSales: Int
    }
    type Variant {
      sku: String
      name: String!
      group: String
      image: File @fileByRelativePath
      weight: Float
      isPart: Boolean
      stock: Int
      price: Float
    }
    type Product implements Node {
      name: String!
      available: Boolean
      sku: String!
      slug: String!
      images: [File] @fileByRelativePath
      facets: [Facet]
      category: Category @link(by: "identity")
      tags: [Tag]
      description: String
      notice: String
      stats: Stats
      price: Float
      stock: Int
      reviews: [Review] @link(by: "product", from: "sku")
      variants: [Variant]
      dateCreated: Date
      dateModified: Date
    }
  `
  createTypes(typeDefs)
}

// import { transform, set } from 'lodash'
// import {
//   isArray, isObjectLike, isPlainObject, map,
// } from 'lodash/fp'

function createIteratee(converter, self) {
  return (result, value, key) =>
    _.set(result, converter(key), _.isObjectLike(value) ? self(value) : value)
}

function toCamelKeys(node) {
  if (_.isArray(node)) return _.map(toCamelKeys, node)
  if (_.isPlainObject(node))
    return _.transform(node, createIteratee(_.camelCase, toCamelKeys))
  return node
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
        allProduct(limit: $limit) {
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
  const applyer = fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `Yaml`) {
    const parent = getNode(node.parent)
    applyer(node, parent.absolutePath)

    if (
      parent.internal.type === "File" &&
      parent.sourceInstanceName === "reviews"
    ) {
      const fieldData = {
        name: node.name,
        image: node.image,
        product: node.product,
        message: node.message,
        referral: node.referral,
      }

      const nodeId = createNodeId(`${node.id} >>> Review`)
      const nodeContent = JSON.stringify(toCamelKeys(fieldData))

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

    applyer(node.frontmatter, node.fileAbsolutePath) // convert image paths for gatsby images

    createNodeField({
      name: `slug`,
      node,
      value: `${path}/${slug}`,
    })

    if (
      parent.internal.type === "File" &&
      parent.sourceInstanceName === "products"
    ) {
      const fieldData = {
        ...node.frontmatter,
      }
      const nodeId = createNodeId(`${node.id} >>> Product`)
      const nodeContent = JSON.stringify(toCamelKeys(fieldData))
      const price = _.get(
        node.frontmatter,
        "variants[0].price",
        node.frontmatter.price
      )

      createNodeField({
        name: `money`,
        node,
        value: formatter.format(price),
      })

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
      parent.sourceInstanceName === "categories"
    ) {
      const fieldData = {
        ...node.frontmatter,
      }
      const nodeId = createNodeId(`${node.id} >>> Category`)
      const nodeContent = JSON.stringify(toCamelKeys(fieldData))
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
