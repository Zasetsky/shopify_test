export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Внимание: использовать только в разработке!
  },
  shopify: {
    url: process.env.SHOPIFY_URL,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  },
});
