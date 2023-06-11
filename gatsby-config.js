module.exports = {
  siteMetadata: {
    title: "Kyle Skudlarek",
    author: {
      name: 'Kyle Skudlarek',
    },
    siteUrl: 'https://www.kyleskudlarek.com',
    description:
      'Software engineer and designer. This is my personal website.',
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `IBM Plex Mono\:400,600`,
          `Inter\:400,500,700`,
          `Merriweather\:400,700`
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/blog/`,
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "kyleskudlarek.com",
      },
    },
  ],
};