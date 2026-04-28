import { Text } from "@/components/base-retroui/Text";

export default function TextHeadings() {
  return (
    <div className="space-y-4">
      <Text as="h1">This is H1</Text>
      <Text as="h2">This is H2</Text>
      <Text as="h3">This is H3</Text>
      <Text as="h4">This is H4</Text>
      <Text as="h5">This is H5</Text>
      <Text as="h6">This is H6</Text>
    </div>
  );
}
