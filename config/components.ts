import { lazy, type JSX } from "react";

export const componentConfig: {
  core: {
    [key: string]: {
      name: string;
      filePath: string;
      dependencies?: string[];
      preview?: React.LazyExoticComponent<() => JSX.Element>;
      cover?: string;
      description?: string;
    };
  };
  examples: {
    [key: string]: {
      name: string;
      filePath: string;
      preview: React.LazyExoticComponent<() => JSX.Element>;
    };
  };
} = {
  core: {
    accordion: {
      name: "accordion",
      dependencies: ["@radix-ui/react-accordion", "lucide-react"],
      filePath: "components/retroui/Accordion.tsx",
      cover: "/images/components/accordion.svg",
      description: "Expandable content panels.",
    },
    alert: {
      name: "alert",
      filePath: "components/retroui/Alert.tsx",
      cover: "/images/components/alert.svg",
      description: "Notification messages.",
    },
    areaChart: {
      name: "areaChart",
      filePath: "components/retroui/charts/AreaChart.tsx",
      description: "Area chart visualizations.",
    },
    avatar: {
      name: "avatar",
      filePath: "components/retroui/Avatar.tsx",
      cover: "/images/components/avatar.svg",
      description: "User image placeholders.",
    },
    badge: {
      name: "badge",
      filePath: "components/retroui/Badge.tsx",
      cover: "/images/components/badge.svg",
      description: "Status indicator labels.",
    },
    barChart: {
      name: "barChart",
      filePath: "components/retroui/charts/BarChart.tsx",
      description: "Bar chart visualizations.",
    },
    breadcrumb: {
      name: "breadcrumb",
      filePath: "components/retroui/Breadcrumb.tsx",
      cover: "/images/components/breadcrumb.svg",
      description: "Navigation breadcrumbs.",
    },
    button: {
      name: "button",
      filePath: "components/retroui/Button.tsx",
      cover: "/images/components/button.svg",
      description: "Interactive action triggers.",
    },
    calendar: {
      name: "calendar",
      filePath: "components/retroui/Calendar.tsx",
      cover: "/images/components/calendar.svg",
      description: "Date picker interfaces.",
    },
    card: {
      name: "card",
      filePath: "components/retroui/Card.tsx",
      cover: "/images/components/card.png",
      description: "Content containers.",
    },
    carousel: {
      name: "carousel",
      filePath: "components/retroui/Carousel.tsx",
      cover: "/images/components/carousel.svg",
      description: "Scrollable image galleries.",
    },
    checkbox: {
      name: "checkbox",
      filePath: "components/retroui/Checkbox.tsx",
      description: "Toggle option controls.",
    },
    command: {
      name: "command",
      filePath: "components/retroui/Command.tsx",
      cover: "/images/components/command.svg",
      description: "Command menu interfaces.",
    },
    "context-menu": {
      name: "context-menu",
      filePath: "components/retroui/ContextMenu.tsx",
      cover: "/images/components/context-menu.svg",
      description: "Right-click context panels.",
    },
    dialog: {
      name: "dialog",
      filePath: "components/retroui/Dialog.tsx",
      cover: "/images/components/dialog.svg",
      description: "Modal dialog windows.",
    },
    drawer: {
      name: "drawer",
      filePath: "components/retroui/Drawer.tsx",
      cover: "/images/components/drawer.svg",
      description: "Side panel overlays.",
    },
    empty: {
      name: "empty",
      filePath: "components/retroui/Empty.tsx",
      cover: "/images/components/empty.svg",
      description: "Empty state displays.",
    },
    input: {
      name: "input",
      filePath: "components/retroui/Input.tsx",
      cover: "/images/components/input.svg",
      description: "Text input fields.",
    },
    label: {
      name: "label",
      filePath: "components/retroui/Label.tsx",
      cover: "/images/components/label.svg",
      description: "Form input labels.",
    },
    lineChart: {
      name: "lineChart",
      filePath: "components/retroui/charts/LineChart.tsx",
      description: "Line chart visualizations.",
    },
    loader: {
      name: "loader",
      filePath: "components/retroui/Loader.tsx",
      cover: "/images/components/loader.svg",
      description: "Loading state indicators.",
    },
    menu: {
      name: "menu",
      filePath: "components/retroui/Menu.tsx",
      cover: "/images/components/menu.svg",
      description: "Dropdown menu lists.",
    },
    pieChart: {
      name: "pieChart",
      filePath: "components/retroui/charts/PieChart.tsx",
      description: "Pie chart visualizations.",
    },
    popover: {
      name: "popover",
      filePath: "components/retroui/Popover.tsx",
      cover: "/images/components/popover.svg",
      description: "Floating tooltip panels.",
    },
    progress: {
      name: "progress",
      filePath: "components/retroui/Progress.tsx",
      cover: "/images/components/progress.png",
      description: "Progress bar indicators.",
    },
    radio: {
      name: "radio",
      filePath: "components/retroui/Radio.tsx",
      cover: "/images/components/radio.svg",
      description: "Single choice selectors.",
    },
    select: {
      name: "select",
      filePath: "components/retroui/Select.tsx",
      cover: "/images/components/select.svg",
      description: "Dropdown select menus.",
    },
    slider: {
      name: "slider",
      dependencies: ["@radix-ui/react-slider"],
      filePath: "components/retroui/Slider.tsx",
      cover: "/images/components/slider.png",
      description: "Range input controls.",
    },
    sonner: {
      name: "sonner",
      filePath: "components/retroui/Sonner.tsx",
      cover: "/images/components/sonner.svg",
      description: "Toast notifications.",
    },
    switch: {
      name: "switch",
      filePath: "components/retroui/Switch.tsx",
      cover: "/images/components/switch.svg",
      description: "Toggle switch buttons.",
    },
    table: {
      name: "table",
      filePath: "components/retroui/Table.tsx",
      cover: "/images/components/table.svg",
      description: "Data table displays.",
    },
    text: {
      name: "text",
      filePath: "components/retroui/Text.tsx",
      cover: "/images/components/text.svg",
      description: "Typography elements.",
    },
    toc: {
      name: "toc",
      filePath: "components/retroui/TableOfContents.tsx",
      cover: "/images/components/table-of-contents.svg",
      description: "Table of contents navigation.",
    },
    toggle: {
      name: "toggle",
      filePath: "components/retroui/Toggle.tsx",
      cover: "/images/components/toggle.svg",
      description: "Toggle action buttons.",
    },
    "toggle-group": {
      name: "toggle-group",
      filePath: "components/retroui/ToggleGroup.tsx",
      cover: "/images/components/toggle-group.svg",
      description: "Grouped toggle switches.",
    },
    tooltip: {
      name: "tooltip",
      filePath: "components/retroui/Tooltip.tsx",
      cover: "/images/components/tooltip.svg",
      description: "Hover tooltip popups.",
    },
    "baseui-accordion": {
      name: "baseui-accordion",
      filePath: "components/base-retroui/Accordion.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/accordion.svg",
      description: "Accordion component using Base UI.",
    },
    "baseui-alert": {
      name: "baseui-alert",
      filePath: "components/base-retroui/Alert.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/alert.svg",
      description: "Alert component using Base UI.",
    },
    "baseui-avatar": {
      name: "baseui-avatar",
      filePath: "components/base-retroui/Avatar.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/avatar.svg",
      description: "Avatar component using Base UI.",
    },
    "baseui-badge": {
      name: "baseui-badge",
      filePath: "components/base-retroui/Badge.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/badge.svg",
      description: "Badge component using Base UI.",
    },
    "baseui-breadcrumb": {
      name: "baseui-breadcrumb",
      filePath: "components/base-retroui/Breadcrumb.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/breadcrumb.svg",
      description: "Breadcrumb component using Base UI.",
    },
    "baseui-button": {
      name: "baseui-button",
      filePath: "components/base-retroui/Button.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/button.svg",
      description: "Button component using Base UI.",
    },
    "baseui-calendar": {
      name: "baseui-calendar",
      filePath: "components/base-retroui/Calendar.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/calendar.svg",
      description: "Calendar component using Base UI.",
    },
    "baseui-card": {
      name: "baseui-card",
      filePath: "components/base-retroui/Card.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/card.svg",
      description: "Card component using Base UI.",
    },
    "baseui-carousel": {
      name: "baseui-carousel",
      filePath: "components/base-retroui/Carousel.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/carousel.svg",
      description: "Carousel component using Base UI.",
    },
    "baseui-checkbox": {
      name: "baseui-checkbox",
      filePath: "components/base-retroui/Checkbox.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/checkbox.svg",
      description: "Checkbox component using Base UI.",
    },
    "baseui-command": {
      name: "baseui-command",
      filePath: "components/base-retroui/Command.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/command.svg",
      description: "Command component using Base UI.",
    },
    "baseui-context-menu": {
      name: "baseui-context-menu",
      filePath: "components/base-retroui/Context-menu.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/context-menu.svg",
      description: "Context-menu component using Base UI.",
    },
    "baseui-dialog": {
      name: "baseui-dialog",
      filePath: "components/base-retroui/Dialog.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/dialog.svg",
      description: "Dialog component using Base UI.",
    },
    "baseui-drawer": {
      name: "baseui-drawer",
      filePath: "components/base-retroui/Drawer.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/drawer.svg",
      description: "Drawer component using Base UI.",
    },
    "baseui-empty": {
      name: "baseui-empty",
      filePath: "components/base-retroui/Empty.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/empty.svg",
      description: "Empty component using Base UI.",
    },
    "baseui-input": {
      name: "baseui-input",
      filePath: "components/base-retroui/Input.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/input.svg",
      description: "Input component using Base UI.",
    },
    "baseui-label": {
      name: "baseui-label",
      filePath: "components/base-retroui/Label.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/label.svg",
      description: "Label component using Base UI.",
    },
    "baseui-loader": {
      name: "baseui-loader",
      filePath: "components/base-retroui/Loader.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/loader.svg",
      description: "Loader component using Base UI.",
    },
    "baseui-menu": {
      name: "baseui-menu",
      filePath: "components/base-retroui/Menu.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/menu.svg",
      description: "Menu component using Base UI.",
    },
    "baseui-popover": {
      name: "baseui-popover",
      filePath: "components/base-retroui/Popover.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/popover.svg",
      description: "Popover component using Base UI.",
    },
    "baseui-progress": {
      name: "baseui-progress",
      filePath: "components/base-retroui/Progress.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/progress.svg",
      description: "Progress component using Base UI.",
    },
    "baseui-radio": {
      name: "baseui-radio",
      filePath: "components/base-retroui/Radio.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/radio.svg",
      description: "Radio component using Base UI.",
    },
    "baseui-select": {
      name: "baseui-select",
      filePath: "components/base-retroui/Select.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/select.svg",
      description: "Select component using Base UI.",
    },
    "baseui-slider": {
      name: "baseui-slider",
      filePath: "components/base-retroui/Slider.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/slider.svg",
      description: "Slider component using Base UI.",
    },
    "baseui-sonner": {
      name: "baseui-sonner",
      filePath: "components/base-retroui/Sonner.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/sonner.svg",
      description: "Sonner component using Base UI.",
    },
    "baseui-switch": {
      name: "baseui-switch",
      filePath: "components/base-retroui/Switch.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/switch.svg",
      description: "Switch component using Base UI.",
    },
    "baseui-tab": {
      name: "baseui-tab",
      filePath: "components/base-retroui/Tab.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/tab.svg",
      description: "Tab component using Base UI.",
    },
    "baseui-table": {
      name: "baseui-table",
      filePath: "components/base-retroui/Table.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/table.svg",
      description: "Table component using Base UI.",
    },
    "baseui-text": {
      name: "baseui-text",
      filePath: "components/base-retroui/Text.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/text.svg",
      description: "Text component using Base UI.",
    },
    "baseui-textarea": {
      name: "baseui-textarea",
      filePath: "components/base-retroui/Textarea.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/textarea.svg",
      description: "Textarea component using Base UI.",
    },
    "baseui-toc": {
      name: "baseui-toc",
      filePath: "components/base-retroui/Toc.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/toc.svg",
      description: "Toc component using Base UI.",
    },
    "baseui-toggle-group": {
      name: "baseui-toggle-group",
      filePath: "components/base-retroui/Toggle-group.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/toggle-group.svg",
      description: "Toggle-group component using Base UI.",
    },
    "baseui-toggle": {
      name: "baseui-toggle",
      filePath: "components/base-retroui/Toggle.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/toggle.svg",
      description: "Toggle component using Base UI.",
    },
    "baseui-tooltip": {
      name: "baseui-tooltip",
      filePath: "components/base-retroui/Tooltip.tsx",
      dependencies: ["@base-ui/react"],
      cover: "/images/components/tooltip.svg",
      description: "Tooltip component using Base UI.",
    }
  },
  examples: {
    "accordion-style-default": {
      name: "accordion-style-default",
      filePath: "preview/components/accordion-style-default.tsx",
      preview: lazy(
        () => import("@/preview/components/accordion-style-default"),
      ),
    },
    "alert-style-all-status": {
      name: "alert-style-all-status",
      filePath: "preview/components/alert-style-all-status.tsx",
      preview: lazy(
        () => import("@/preview/components/alert-style-all-status"),
      ),
    },
    "alert-style-default": {
      name: "alert-style-default",
      filePath: "preview/components/alert-style-default.tsx",
      preview: lazy(() => import("@/preview/components/alert-style-default")),
    },
    "alert-style-solid": {
      name: "alert-style-solid",
      filePath: "preview/components/alert-style-solid.tsx",
      preview: lazy(() => import("@/preview/components/alert-style-solid")),
    },
    "alert-style-with-icon": {
      name: "alert-style-with-icon",
      filePath: "preview/components/alert-style-with-icon.tsx",
      preview: lazy(() => import("@/preview/components/alert-style-with-icon")),
    },
    "area-chart-style-default": {
      name: "chart-style-default",
      filePath: "preview/charts/area-chart-style-default.tsx",
      preview: lazy(() => import("@/preview/charts/area-chart-style-default")),
    },
    "area-chart-style-multiple": {
      name: "area-chart-style-multiple",
      filePath: "preview/charts/area-chart-style-multiple.tsx",
      preview: lazy(() => import("@/preview/charts/area-chart-style-multiple")),
    },
    "area-chart-style-stacked": {
      name: "area-chart-style-stacked",
      filePath: "preview/charts/area-chart-style-stacked.tsx",
      preview: lazy(() => import("@/preview/charts/area-chart-style-stacked")),
    },
    "avatar-style-circle": {
      name: "avatar-style-circle",
      filePath: "preview/components/avatar-style-circle.tsx",
      preview: lazy(() => import("@/preview/components/avatar-style-circle")),
    },
    "avatar-style-circle-fallbacks": {
      name: "avatar-style-fallbacks",
      filePath: "preview/components/avatar-style-circle-fallbacks.tsx",
      preview: lazy(
        () => import("@/preview/components/avatar-style-circle-fallbacks"),
      ),
    },
    "avatar-style-circle-sizes": {
      name: "avatar-style-circle-sizes",
      filePath: "preview/components/avatar-style-circle-sizes.tsx",
      preview: lazy(
        () => import("@/preview/components/avatar-style-circle-sizes"),
      ),
    },
    "badge-style-default": {
      name: "badge-style-default",
      filePath: "preview/components/badge-style-default.tsx",
      preview: lazy(() => import("@/preview/components/badge-style-default")),
    },
    "badge-style-rounded": {
      name: "badge-style-default",
      filePath: "preview/components/badge-style-rounded.tsx",
      preview: lazy(() => import("@/preview/components/badge-style-rounded")),
    },
    "badge-style-sizes": {
      name: "badge-style-sizes",
      filePath: "preview/components/badge-style-sizes.tsx",
      preview: lazy(() => import("@/preview/components/badge-style-sizes")),
    },
    "badge-style-variants": {
      name: "badge-style-variants",
      filePath: "preview/components/badge-style-variants.tsx",
      preview: lazy(() => import("@/preview/components/badge-style-variants")),
    },
    "bar-chart-style-default": {
      name: "bar-chart-style-default",
      filePath: "preview/charts/bar-chart-style-default.tsx",
      preview: lazy(() => import("@/preview/charts/bar-chart-style-default")),
    },
    "bar-chart-style-grouped": {
      name: "bar-chart-style-grouped",
      filePath: "preview/charts/bar-chart-style-grouped.tsx",
      preview: lazy(() => import("@/preview/charts/bar-chart-style-grouped")),
    },
    "bar-chart-style-horizontal": {
      name: "bar-chart-style-horizontal",
      filePath: "preview/charts/bar-chart-style-horizontal.tsx",
      preview: lazy(
        () => import("@/preview/charts/bar-chart-style-horizontal"),
      ),
    },
    "bar-chart-style-multiple": {
      name: "bar-chart-style-multiple",
      filePath: "preview/charts/bar-chart-style-multiple.tsx",
      preview: lazy(() => import("@/preview/charts/bar-chart-style-multiple")),
    },
    "bar-chart-style-stacked": {
      name: "bar-chart-style-stacked",
      filePath: "preview/charts/bar-chart-style-stacked.tsx",
      preview: lazy(() => import("@/preview/charts/bar-chart-style-stacked")),
    },
    "breadcrumb-custom-separator": {
      name: "breadcrumb-custom-separator",
      filePath: "preview/components/breadcrumb-custom-separator.tsx",
      preview: lazy(
        () => import("@/preview/components/breadcrumb-custom-separator"),
      ),
    },
    "breadcrumb-link-component": {
      name: "breadcrumb-link-component",
      filePath: "preview/components/breadcrumb-link-component.tsx",
      preview: lazy(
        () => import("@/preview/components/breadcrumb-link-component"),
      ),
    },
    "breadcrumb-style-collapsed": {
      name: "breadcrumb-style-collapsed",
      filePath: "preview/components/breadcrumb-style-collapsed.tsx",
      preview: lazy(
        () => import("@/preview/components/breadcrumb-style-collapsed"),
      ),
    },
    "breadcrumb-style-default": {
      name: "breadcrumb-style-default",
      filePath: "preview/components/breadcrumb-style-default.tsx",
      preview: lazy(
        () => import("@/preview/components/breadcrumb-style-default"),
      ),
    },
    "button-style-default": {
      name: "button-style-default",
      filePath: "preview/components/button-style-default.tsx",
      preview: lazy(() => import("@/preview/components/button-style-default")),
    },
    "button-style-icon": {
      name: "button-style-icon",
      filePath: "preview/components/button-style-icon.tsx",
      preview: lazy(() => import("@/preview/components/button-style-icon")),
    },
    "button-style-link": {
      name: "button-style-link",
      filePath: "preview/components/button-style-link.tsx",
      preview: lazy(() => import("@/preview/components/button-style-link")),
    },
    "button-style-outline": {
      name: "button-style-default",
      filePath: "preview/components/button-style-outline.tsx",
      preview: lazy(() => import("@/preview/components/button-style-outline")),
    },
    "button-style-secondary": {
      name: "button-style-secondary",
      filePath: "preview/components/button-style-secondary.tsx",
      preview: lazy(
        () => import("@/preview/components/button-style-secondary"),
      ),
    },
    "button-style-with-icon": {
      name: "button-style-with-icon",
      filePath: "preview/components/button-style-with-icon.tsx",
      preview: lazy(
        () => import("@/preview/components/button-style-with-icon"),
      ),
    },
    "calendar-style-default": {
      name: "calendar-style-default",
      filePath: "preview/components/calendar-style-default.tsx",
      preview: lazy(() => import("@/preview/components/calendar-style-default")),
    },
    "card-style-commerce": {
      name: "card-style-commerce",
      filePath: "preview/components/card-style-commerce.tsx",
      preview: lazy(() => import("@/preview/components/card-style-commerce")),
    },
    "card-style-default": {
      name: "card-style-default",
      filePath: "preview/components/card-style-default.tsx",
      preview: lazy(() => import("@/preview/components/card-style-default")),
    },
    "card-style-testimonial": {
      name: "card-style-testimonial",
      filePath: "preview/components/card-style-testimonial.tsx",
      preview: lazy(
        () => import("@/preview/components/card-style-testimonial"),
      ),
    },
    "carousel-style-default": {
      name: "carousel-style-default",
      filePath: "preview/components/carousel-style-default.tsx",
      preview: lazy(() => import("@/preview/components/carousel-style-default")),
    },
    "carousel-style-sizes": {
      name: "carousel-style-sizes",
      filePath: "preview/components/carousel-style-sizes.tsx",
      preview: lazy(() => import("@/preview/components/carousel-style-sizes")),
    },
    "carousel-style-vertical": {
      name: "carousel-style-vertical",
      filePath: "preview/components/carousel-style-vertical.tsx",
      preview: lazy(() => import("@/preview/components/carousel-style-vertical")),
    },
    "checkbox-style-default": {
      name: "checkbox-style-default",
      filePath: "preview/components/checkbox-style-default.tsx",
      preview: lazy(
        () => import("@/preview/components/checkbox-style-default"),
      ),
    },
    "checkbox-style-sizes": {
      name: "checkbox-style-default",
      filePath: "preview/components/checkbox-style-sizes.tsx",
      preview: lazy(() => import("@/preview/components/checkbox-style-sizes")),
    },
    "checkbox-style-variants": {
      name: "checkbox-style-toggle",
      filePath: "preview/components/checkbox-style-variants.tsx",
      preview: lazy(
        () => import("@/preview/components/checkbox-style-variants"),
      ),
    },
    "command-style-default": {
      name: "command-style-default",
      filePath: "preview/components/command-style-default.tsx",
      preview: lazy(() => import("@/preview/components/command-style-default")),
    },
    "command-style-dialog": {
      name: "command-style-dialog",
      filePath: "preview/components/command-style-dialog.tsx",
      preview: lazy(() => import("@/preview/components/command-style-dialog")),
    },
    "context-menu-style-default": {
      name: "context-menu-style-default",
      filePath: "preview/components/context-menu-style-default.tsx",
      preview: lazy(
        () => import("@/preview/components/context-menu-style-default"),
      ),
    },
    "dialog-style-default": {
      name: "dialog-style-default",
      filePath: "preview/components/dialog-style-default.tsx",
      preview: lazy(() => import("@/preview/components/dialog-style-default")),
    },
    "dialog-style-width-variant": {
      name: "dialog-style-width-variant",
      filePath: "preview/components/dialog-style-width-variant.tsx",
      preview: lazy(
        () => import("@/preview/components/dialog-style-width-variant"),
      ),
    },
    "dialog-style-with-footer": {
      name: "dialog-style-with-footer",
      filePath: "preview/components/dialog-style-with-footer.tsx",
      preview: lazy(
        () => import("@/preview/components/dialog-style-with-footer"),
      ),
    },
    "dialog-style-with-form": {
      name: "dialog-style-with-form",
      filePath: "preview/components/dialog-style-with-form.tsx",
      preview: lazy(
        () => import("@/preview/components/dialog-style-with-form"),
      ),
    },
    "drawer-style-default": {
      name: "drawer-style-default",
      filePath: "preview/components/drawer-style-default.tsx",
      preview: lazy(() => import("@/preview/components/drawer-style-default")),
    },
    "drawer-style-right-direction": {
      name: "drawer-style-right-direction",
      filePath: "preview/components/drawer-style-right-direction.tsx",
      preview: lazy(() => import("@/preview/components/drawer-style-right-direction")),
    },
    // "dropdown-style-default": {
    //   name: "dropdown-style-default",
    //   filePath: "preview/components/dropdown-style-default.tsx",
    //   preview: lazy(() => import("@/preview/components/dropdown-style-default")),
    // },
    "input-style-default": {
      name: "input-style-default",
      filePath: "preview/components/input-style-default.tsx",
      preview: lazy(() => import("@/preview/components/input-style-default")),
    },
    "input-style-error": {
      name: "input-style-error",
      filePath: "preview/components/input-style-error.tsx",
      preview: lazy(() => import("@/preview/components/input-style-error")),
    },
    "input-style-with-label": {
      name: "input-style-with-label",
      filePath: "preview/components/input-style-with-label.tsx",
      preview: lazy(
        () => import("@/preview/components/input-style-with-label"),
      ),
    },
    "label-style-default": {
      name: "label-style-default",
      filePath: "preview/components/label-style-default.tsx",
      preview: lazy(() => import("@/preview/components/label-style-default")),
    },
    "line-chart-style-default": {
      name: "line-chart-style-default",
      filePath: "preview/charts/line-chart-style-default.tsx",
      preview: lazy(() => import("@/preview/charts/line-chart-style-default")),
    },
    "line-chart-style-multiple": {
      name: "line-chart-style-multiple",
      filePath: "preview/charts/line-chart-style-multiple.tsx",
      preview: lazy(() => import("@/preview/charts/line-chart-style-multiple")),
    },
    "loader-style-custom": {
      name: "loader-style-custom",
      filePath: "preview/components/loader-style-custom.tsx",
      preview: lazy(() => import("@/preview/components/loader-style-custom"))
    },
    "loader-style-default": {
      name: "loader-style-default",
      filePath: "preview/components/loader-style-default.tsx",
      preview: lazy(() => import("@/preview/components/loader-style-default")),
    },
    "loader-style-outline": {
      name: "loader-style-outline",
      filePath: "preview/components/loader-style-outline.tsx",
      preview: lazy(() => import("@/preview/components/loader-style-outline")),
    },
    "loader-style-sizes": {
      name: "loader-style-sizes",
      filePath: "preview/components/loader-style-sizes.tsx",
      preview: lazy(() => import("@/preview/components/loader-style-sizes")),
    },
    "loader-style-solid": {
      name: "loader-style-solid",
      filePath: "preview/components/loader-style-solid.tsx",
      preview: lazy(() => import("@/preview/components/loader-style-solid")),
    },
    "menu-style-default": {
      name: "menu-style-default",
      filePath: "preview/components/menu-style-default.tsx",
      preview: lazy(() => import("@/preview/components/menu-style-default")),
    },
    "pie-chart-style-default": {
      name: "pie-chart-style-default",
      filePath: "preview/charts/pie-chart-style-default.tsx",
      preview: lazy(() => import("@/preview/charts/pie-chart-style-default")),
    },
    "pie-chart-style-donut": {
      name: "pie-chart-style-donut",
      filePath: "preview/charts/pie-chart-style-donut.tsx",
      preview: lazy(() => import("@/preview/charts/pie-chart-style-donut")),
    },
    "popover-style-default": {
      name: "popover-style-default",
      filePath: "preview/components/popover-style-default.tsx",
      preview: lazy(() => import("@/preview/components/popover-style-default")),
    },
    "popover-style-default-shadow": {
      name: "popover-style-default-shadow",
      filePath: "preview/components/popover-style-default-shadow.tsx",
      preview: lazy(
        () => import("@/preview/components/popover-style-default-shadow"),
      ),
    },
    "progress-style-default": {
      name: "progress-style-default",
      filePath: "preview/components/progress-style-default.tsx",
      preview: lazy(
        () => import("@/preview/components/progress-style-default"),
      ),
    },
    "radio-style-default": {
      name: "radio-style-default",
      filePath: "preview/components/radio-style-default.tsx",
      preview: lazy(() => import("@/preview/components/radio-style-default")),
    },
    "radio-style-sizes": {
      name: "radio-style-sizes",
      filePath: "preview/components/radio-style-sizes.tsx",
      preview: lazy(() => import("@/preview/components/radio-style-sizes")),
    },
    "radio-style-variants": {
      name: "radio-style-variants",
      filePath: "preview/components/radio-style-variants.tsx",
      preview: lazy(() => import("@/preview/components/radio-style-variants")),
    },
    "retro-player": {
      name: "retro-player",
      filePath: "preview/components/retro-player.tsx",
      preview: lazy(() => import("@/preview/components/retro-player"))
    },
    "select-style-default": {
      name: "select-style-default",
      filePath: "preview/components/select-style-default.tsx",
      preview: lazy(() => import("@/preview/components/select-style-default")),
    },
    "slider-style-default": {
      name: "slider-style-default",
      filePath: "preview/components/slider-style-default.tsx",
      preview: lazy(() => import("@/preview/components/slider-style-default")),
    },
    "sonner-style-colored-status": {
      name: "sonner-style-colored-status",
      filePath: "preview/components/sonner-style-colored-status.tsx",
      preview: lazy(
        () => import("@/preview/components/sonner-style-colored-status"),
      ),
    },
    "sonner-style-default": {
      name: "sonner-style-default",
      filePath: "preview/components/sonner-style-default.tsx",
      preview: lazy(() => import("@/preview/components/sonner-style-default")),
    },
    "sonner-style-status": {
      name: "sonner-style-status",
      filePath: "preview/components/sonner-style-status.tsx",
      preview: lazy(() => import("@/preview/components/sonner-style-status")),
    },
    "switch-style-default": {
      name: "switch-style-default",
      filePath: "preview/components/switch-style-default.tsx",
      preview: lazy(() => import("@/preview/components/switch-style-default")),
    },
    "switch-style-disabled": {
      name: "switch-style-disabled",
      filePath: "preview/components/switch-style-disabled.tsx",
      preview: lazy(() => import("@/preview/components/switch-style-disabled")),
    },
    "tab-style-default": {
      name: "typography-p",
      filePath: "preview/components/tab-style-default.tsx",
      preview: lazy(() => import("@/preview/components/tab-style-default")),
    },
    "table-style-default": {
      name: "table-style-default",
      filePath: "preview/components/table-style-default.tsx",
      preview: lazy(() => import("@/preview/components/table-style-default")),
    },
    "table-with-checkbox": {
      name: "table-with-checkbox",
      filePath: "preview/components/table-with-checkbox.tsx",
      preview: lazy(() => import("@/preview/components/table-with-checkbox")),
    },
    "table-with-sticky-header": {
      name: "table-with-sticky-header",
      filePath: "preview/components/table-with-sticky-header.tsx",
      preview: lazy(
        () => import("@/preview/components/table-with-sticky-header"),
      ),
    },
    "text-headings": {
      name: "text-headings",
      filePath: "preview/components/text-headings.tsx",
      preview: lazy(() => import("@/preview/components/text-headings")),
    },
    "textarea-style-default": {
      name: "textarea-style-default",
      filePath: "preview/components/textarea-style-default.tsx",
      preview: lazy(
        () => import("@/preview/components/textarea-style-default"),
      ),
    },
    "toc-style-default": {
      name: "toc-style-default",
      filePath: "preview/components/toc-style-default.tsx",
      preview: lazy(() => import("@/preview/components/toc-style-default")),
    },
    "toc-style-depth": {
      name: "toc-style-depth",
      filePath: "preview/components/toc-style-depth.tsx",
      preview: lazy(() => import("@/preview/components/toc-style-depth")),
    },
    "toc-style-manual": {
      name: "toc-style-manual",
      filePath: "preview/components/toc-style-manual.tsx",
      preview: lazy(() => import("@/preview/components/toc-style-manual")),
    },
    "toggle-group-style-default": {
      name: "toggle-group-style-default",
      filePath: "preview/components/toggle-group-style-default.tsx",
      preview: lazy(
        () => import("@/preview/components/toggle-group-style-default"),
      ),
    },
    "toggle-group-style-outline-muted": {
      name: "toggle-group-style-outline-muted",
      filePath: "preview/components/toggle-group-style-outline-muted.tsx",
      preview: lazy(
        () => import("@/preview/components/toggle-group-style-outline-muted"),
      ),
    },
    "toggle-group-style-outlined": {
      name: "toggle-group-style-outlined",
      filePath: "preview/components/toggle-group-style-outlined.tsx",
      preview: lazy(
        () => import("@/preview/components/toggle-group-style-outlined"),
      ),
    },
    "toggle-group-style-solid": {
      name: "toggle-group-style-solid",
      filePath: "preview/components/toggle-group-style-solid.tsx",
      preview: lazy(
        () => import("@/preview/components/toggle-group-style-solid"),
      ),
    },
    "toggle-style-default": {
      name: "toggle-style-default",
      filePath: "preview/components/toggle-style-default.tsx",
      preview: lazy(() => import("@/preview/components/toggle-style-default")),
    },
    "toggle-style-outline-muted": {
      name: "toggle-style-outline-muted",
      filePath: "preview/components/toggle-style-outline-muted.tsx",
      preview: lazy(
        () => import("@/preview/components/toggle-style-outline-muted"),
      ),
    },
    "toggle-style-outlined": {
      name: "toggle-style-outlined",
      filePath: "preview/components/toggle-style-outlined.tsx",
      preview: lazy(() => import("@/preview/components/toggle-style-outlined")),
    },
    "toggle-style-solid": {
      name: "toggle-style-solid",
      filePath: "preview/components/toggle-style-solid.tsx",
      preview: lazy(() => import("@/preview/components/toggle-style-solid")),
    },
    "tooltip-style-default": {
      name: "tooltip-style-default",
      filePath: "preview/components/tooltip-style-default.tsx",
      preview: lazy(() => import("@/preview/components/tooltip-style-default")),
    },
    "tooltip-style-primary": {
      name: "tooltip-style-primary",
      filePath: "preview/components/tooltip-style-primary.tsx",
      preview: lazy(() => import("@/preview/components/tooltip-style-primary")),
    },
    "tooltip-style-solid": {
      name: "tooltip-style-solid",
      filePath: "preview/components/tooltip-style-solid.tsx",
      preview: lazy(() => import("@/preview/components/tooltip-style-solid")),
    },
    "typography-p": {
      name: "typography-p",
      filePath: "preview/components/typography-p.tsx",
      preview: lazy(() => import("@/preview/components/typography-p")),
    },
    "empty-style-default": {
      name: "empty-style-default",
      filePath: "preview/components/empty-style-default.tsx",
      preview: lazy(() => import("@/preview/components/empty-style-default"))
    },
    "empty-style-custom-icon": {
      name: "empty-style-custom-icon",
      filePath: "preview/components/empty-style-custom-icon.tsx",
      preview: lazy(() => import("@/preview/components/empty-style-custom-icon"))
    },
    "empty-style-custom-everything": {
      name: "empty-style-custom-everything",
      filePath: "preview/components/empty-style-custom-everything.tsx",
      preview: lazy(() => import("@/preview/components/empty-style-custom-everything"))
    },
    "empty-style-table": {
      name: "empty-style-table",
      filePath: "preview/components/empty-style-table.tsx",
      preview: lazy(() => import("@/preview/components/empty-style-table"))
    },
  },
};
