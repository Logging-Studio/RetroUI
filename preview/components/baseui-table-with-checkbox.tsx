"use client";

import { Badge, Checkbox } from "@/components/retroui"
import {
  Table,
} from "@/components/base-retroui/Table"
import { useState } from "react"

const employees = [
  {
    id: "1",
    name: "Alice Johnson",
    department: "Engineering",
    status: "Active",
    salary: "85,000",
  },
  {
    id: "2",
    name: "Bob Smith",
    department: "Product",
    status: "Active",
    salary: "95,000",
  },
  {
    id: "3",
    name: "Carol Williams",
    department: "Design",
    status: "On Leave",
    salary: "70,000",
  },
  {
    id: "4",
    name: "David Brown",
    department: "Engineering",
    status: "Active",
    salary: "90,000",
  },
  {
    id: "5",
    name: "Eve Davis",
    department: "Engineering",
    status: "Active",
    salary: "75,000",
  },
  {
    id: "6",
    name: "Frank Wilson",
    department: "Marketing",
    status: "Inactive",
    salary: "80,000",
  },
]

export default function TableWithCheckbox() {
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set())

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(new Set(employees.map(emp => emp.id)))
    } else {
      setSelectedEmployees(new Set())
    }
  }

  const handleSelectEmployee = (employeeId: string, checked: boolean) => {
    const newSelected = new Set(selectedEmployees)
    if (checked) {
      newSelected.add(employeeId)
    } else {
      newSelected.delete(employeeId)
    }
    setSelectedEmployees(newSelected)
  }

  const isAllSelected = selectedEmployees.size === employees.length

  return (
    <Table className="max-w-lg mb-6 mx-auto">
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[50px]">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
          </Table.Head>
          <Table.Head>Name</Table.Head>
          <Table.Head>Department</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head className="text-right">Salary</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {employees.map((employee) => (
          <Table.Row key={employee.id}>
            <Table.Cell>
              <Checkbox
                checked={selectedEmployees.has(employee.id)}
                onCheckedChange={(checked) => handleSelectEmployee(employee.id, Boolean(checked))}
              />
            </Table.Cell>
            <Table.Cell className="font-medium">{employee.name}</Table.Cell>
            <Table.Cell>{employee.department}</Table.Cell>
            <Table.Cell>
              <Badge
                variant={employee.status === 'Active' ? 'default' : employee.status === 'On Leave' ? 'outline' : 'solid'}
                size="sm"
              >
                {employee.status}
              </Badge>
            </Table.Cell>
            <Table.Cell className="text-right">$ {employee.salary}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={4}>Selected: {selectedEmployees.size} / {employees.length}</Table.Cell>
          <Table.Cell className="text-right font-semibold">$ {employees.reduce((total, employee) => total + Number(employee.salary.replace(',', '')), 0)}</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}