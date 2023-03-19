module.exports = {
    siteMetadata: {
        title: "My Super Cool Blog",
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