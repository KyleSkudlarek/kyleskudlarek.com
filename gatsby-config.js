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