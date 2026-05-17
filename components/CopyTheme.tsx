import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { Theme, themeConfig } from "@/config/theme";
import { CodeBlock } from "./CodeBlock";

export default function CopyTheme({ theme, hasRadius = false }: { theme: Theme, hasRadius?: boolean }) {
    return (
        <Dialog>
            <Dialog.Trigger>
                <Button>Copy Theme</Button>
            </Dialog.Trigger>
            <Dialog.Content className={`theme-${theme} ${hasRadius ? "with-radius" : ""}`}>
                <Dialog.Header>
                    <Text as="h5">Copy Theme</Text>
                </Dialog.Header>
                <section className="w-full p-4">
                    <Text className="text-lg mb-4 text-muted-foreground">Copy and paste the following theme code into your CSS file.</Text>

                    <CodeBlock className="w-full max-h-[480px] text-gray-300 text-sm overflow-y-auto">
                        {themeConfig({ hasRadius })[theme].color}
                    </CodeBlock>
                </section>
            </Dialog.Content>
        </Dialog>
    );
}
