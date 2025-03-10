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
import { toast } from "@/hooks/use-toast"
import router from "next/router"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"

export type Posts = {
  id: string
  name: string
  content: string
  img: string
  date: string
  tags: string[]
  slug: string
}

export const columns: ColumnDef<Posts>[] = [
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
      return <div>{Array.isArray(tags) ? tags.join(", ") : "Sem tags"}</div>
    },
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
          <Image
            src={imgUrl}
            alt="Post image"
            width={64}
            height={64}
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
      const post = row.original;

      const handleDeletePost = async () => {
        const token = localStorage.getItem("authToken");
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/delete/${post.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          );
          toast({
            title: "✅ Projeto excluído com sucesso!",
            description: `O post "${post.name}" foi removido.`,
          });
          router.push("/dashboard/posts")
        } catch {
          toast({
            title: "❌ Erro ao deletar projeto.",
            description: "Tente novamente mais tarde.",
          });
        }
      }

      function dismiss(): void {
        throw new Error("Function not implemented.")
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
              onClick={() => navigator.clipboard.writeText(`/blog/${post?.slug}`)}
            >
              Copiar URL do Post
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/blog/${post?.slug}`}>Ver detalhes</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={`/dashboard/posts/editar-post/${post?.slug}`}>Editar Post</Link></DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast({
                  title: "❌ Você deseja excluir este projeto?",
                  description: (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                        <Image
                          src={post.img}
                          alt="Preview do post"
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="w-[300px]">
                          <h3 className="text-lg font-semibold text-white">
                            {post.name}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {post.content.length > 30
                              ? post.content.substring(0, 30) + "..."
                              : post.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between py-4">
                        <Button
                          className="bg-red-600 text-white hover:text-black"
                          onClick={() => {
                            handleDeletePost();
                          }}
                        >
                          Sim, desejo excluir
                        </Button>
                        <Button
                          className="bg-blue-900 text-white hover:text-black"
                          onClick={() => dismiss()}
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
              Excluir post <TrashIcon color="red" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu >
      )
    },
  },
]

export function DataTableDemo() {
  const [posts, setPosts] = React.useState<Posts[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar posts", error);
      }
    };
    fetchPosts();
  }, []);

  const table = useReactTable({
    data: posts,
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
          <Link href="/dashboard/posts/novo-post" className="flex items-center">
            Adicionar post <PlusIcon className="ml-1" />
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
