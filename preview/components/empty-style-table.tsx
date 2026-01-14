import { Empty } from "@/components/retroui/Empty";

import { Table } from "@/components/retroui/Table";

const invoices = [];

export default function TableEmpty() {
  return (
    <Table className="mx-auto">
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
        {invoices?.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={5}>
              <Empty className="border-none shadow-none">
                <Empty.Content>
                  <Empty.Icon className="size-8" />
                  <Empty.Title className="md:text-base">Empty</Empty.Title>
                  <Empty.Description>
                    Get started by creating your first invoice.
                  </Empty.Description>
                </Empty.Content>
              </Empty>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
