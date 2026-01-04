import { TableOfContents } from "@/components/retroui/TableOfContents";
import { Text } from "@/components/retroui/Text";

export default function TocStyleManual() {
    const manualData = [
        { id: 'introduction', title: 'Introduction', depth: 1 },
        { id: 'getting-started', title: 'Getting Started', depth: 2 },
        { id: 'installation', title: 'Installation', depth: 3 },
        { id: 'configuration', title: 'Configuration', depth: 3 },
        { id: 'advanced-usage', title: 'Advanced Usage', depth: 1 },
        { id: 'api-reference', title: 'API Reference', depth: 2 },
        { id: 'examples', title: 'Examples', depth: 2 },
        { id: 'troubleshooting', title: 'Troubleshooting', depth: 1 },
    ];

    return <TableOfContents 
        data={manualData}
        className="w-80 h-96"
    >
        <Text className="mb-3 border-b pb-2">Manual TOC</Text>
    </TableOfContents>
}