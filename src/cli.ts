import { handler } from './handler';

if (require.main === module) {
  const {
    RELAYER_API_KEY: apiKey,
    RELAYER_API_SECRET: apiSecret,
    ETHEREUM_GOERLI_PROVIDER_URL: ethereumGoerliProviderURL,
    POLYGON_MUMBAI_PROVIDER_URL: polygonMumbaiProviderURL,
    OPTIMISM_KOVAN_PROVIDER_URL: optimismKovanProviderURL,
  } = process.env;

  handler({
    apiKey,
    apiSecret,
    secrets: {
      ethereumGoerliProviderURL,
      polygonMumbaiProviderURL,
      optimismKovanProviderURL,
    },
  })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export function main() {}
