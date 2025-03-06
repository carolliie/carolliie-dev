"use client"

import * as React from "react"
import Link from "next/link"
import axios from "axios"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, PlusIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast, useToast } from "@/hooks/use-toast"
import router from "next/router"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export type Projects = {
  id: string
  name: string
  content: string
  img: string
  date: string
  tags: string[]
  slug: string
  color: string
}

export const columns: ColumnDef<Projects>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Título",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return <div>{Array.isArray(tags) ? tags.join(", ") : "Sem tags"}</div>},
  },
  {
    accessorKey: "date",
    header: "Data de Publicação",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      const formattedDate = date
        ? format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
        : "Data inválida";
      return <div className="text-left font-medium">{formattedDate}</div>
    },
  },
  {
    accessorKey: "img",
    header: "Imagem",
    cell: ({ row }) => {
      const imgUrl = row.getValue("img") as string;
      return (
        <div className="flex items-center justify-start">
          <img
            src={imgUrl}
            alt="project image"
            className="w-16 h-16 object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original;
      const { dismiss } = useToast();

      async function deleteProject(toastId: string) {
        const token = localStorage.getItem("authToken");
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/delete/${project.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          );
          toast({
            title: "✅ Projeto excluído com sucesso!",
            description: `O project "${project.name}" foi removido.`,
          });
          dismiss(toastId);
          router.push("/dashboard/projects")
        } catch (err) {
          toast({
            title: "❌ Erro ao deletar projeto.",
            description: "Tente novamente mais tarde.",
          });
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-full p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`/projects/${project.slug}`)}
            >
              Copiar URL do projeto
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/projects/${project.slug}`}>Ver detalhes</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={`/dashboard/projetos/editar-projeto/${project.slug}`}>Editar projeto</Link></DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const { id: toastId } = toast({
                  title: "❌ Você deseja excluir este projeto?",
                  description: (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                        <img
                          src={project.img}
                          alt="Preview do project"
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="w-[300px]">
                          <h3 className="text-lg font-semibold text-white">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {project.content.length > 30
                              ? project.content.substring(0, 30) + "..."
                              : project.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between py-4">
                        <Button
                          className="bg-red-600 text-white hover:text-black"
                          onClick={() => {
                            deleteProject(toastId);
                          }}
                        >
                          Sim, desejo excluir
                        </Button>
                        <Button
                          className="bg-blue-900 text-white hover:text-black"
                          onClick={() => dismiss(toastId)}
                        >
                          Não, prefiro cancelar
                        </Button>
                      </div>
                    </div>
                  ),
                  duration: Infinity,
                });
              }}
            >
              Excluir projeto <TrashIcon color="red" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu >
      )
    },
  },
]

export function DataProjectsTableDemo() {
  const [projects, setprojects] = React.useState<Projects[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    const fetchprojects = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
        setprojects(response.data);
      } catch (error) {
        console.error("Erro ao buscar projetos", error);
      }
    };
    fetchprojects();
  }, []);

  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar nomes..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-full"
        />
        <Button variant="outline" className="ml-2">
          <Link href="/dashboard/projetos/novo-projeto" className="flex items-center">
            Adicionar projeto <PlusIcon className="ml-1" />
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
