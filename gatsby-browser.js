const React = require('react')
require("prismjs/themes/prism-tomorrow.css");

export function wrapPageElement({ element, props }) {
  const Layout = element.type.Layout ?? React.Fragment

  return <Layout {...props}>{element}</Layout>
}
