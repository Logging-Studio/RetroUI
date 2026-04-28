import { Badge } from "@/components/retroui"
import {
    Table,
} from "@/components/base-retroui/Table"

const invoices = [
    {
        invoice: "INV001",
        customer: "John Doe",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        customer: "Jane Doe",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        customer: "Mark Doe",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        customer: "Robert Doe",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        customer: "Isabella Doe",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        customer: "Mrs. Doe",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        customer: "Mr. Doe",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export default function TableStyleDefault() {
    return (
        <Table className="max-w-lg mb-6 mx-auto">
            <Table.Header>
                <Table.Row>
                    <Table.Head className="w-[100px]">Invoice</Table.Head>
                    <Table.Head>Customer</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Method</Table.Head>
                    <Table.Head className="text-right">Amount</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {invoices.map((invoice) => (
                    <Table.Row key={invoice.invoice}>
                        <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
                        <Table.Cell>{invoice.customer}</Table.Cell>
                        <Table.Cell><Badge variant="solid" size="sm">{invoice.paymentStatus}</Badge></Table.Cell>
                        <Table.Cell>{invoice.paymentMethod}</Table.Cell>
                        <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell colSpan={4}>Total</Table.Cell>
                    <Table.Cell className="text-right">$2,500.00</Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}