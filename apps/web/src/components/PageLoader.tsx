import { Spinner, LegacyCard, BlockStack, Text } from "@shopify/polaris";

export const PageLoader = () => (
  <LegacyCard sectioned>
    <BlockStack gap="200" align="center">
      <Spinner accessibilityLabel="Loading" size="large" />
      <Text as="p" variant="bodyMd">
        Loading...
      </Text>
    </BlockStack>
  </LegacyCard>
);
