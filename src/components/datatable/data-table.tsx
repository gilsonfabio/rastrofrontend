"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Skeleton,
} from "@/components/ui/skeleton";


import {
  DataTableToolbar,
} from "./data-table-toolbar";


import {
  DataTablePagination,
} from "./data-table-pagination";



export interface DataTableColumn<T>{

  key: keyof T | string;

  title: string;

  render?:(
    item:T
  )=>React.ReactNode;

}



interface DataTableProps<T>{


  data:T[];

  columns:DataTableColumn<T>[];

  loading?:boolean;


  searchField?:keyof T;

  searchPlaceholder?:string;


  pageSize?:number;


  toolbarAction?:React.ReactNode;


}



export function DataTable<T extends Record<string,any>>({

  data,

  columns,

  loading=false,

  searchField,

  searchPlaceholder="Pesquisar...",

  pageSize=10,

  toolbarAction,

}:DataTableProps<T>) {



  const [
    search,
    setSearch
  ] = useState("");



  const [
    page,
    setPage
  ] = useState(1);




  const filteredData =
    useMemo(()=>{


      if(!searchField || !search){

        return data;

      }


      return data.filter(item=>{


        const value =
          String(
            item[searchField] ?? ""
          )
          .toLowerCase();



        return value.includes(
          search.toLowerCase()
        );


      });


    },[
      data,
      search,
      searchField
    ]);





  const totalPages =
    Math.ceil(
      filteredData.length /
      pageSize
    );



  const paginatedData =
    useMemo(()=>{


      const start =
        (page-1) *
        pageSize;


      return filteredData.slice(
        start,
        start + pageSize
      );


    },[
      filteredData,
      page,
      pageSize
    ]);




  return (

    <Card>


      <CardContent className="space-y-5 pt-6">


        <DataTableToolbar

          search={search}

          setSearch={(value)=>{

            setSearch(value);

            setPage(1);

          }}

          placeholder={
            searchPlaceholder
          }

          action={
            toolbarAction
          }

        />



        <div className="
          rounded-md
          border
        ">


          <Table>


            <TableHeader>


              <TableRow>


                {
                  columns.map(column=>(

                    <TableHead
                      key={
                        String(column.key)
                      }
                    >

                      {column.title}

                    </TableHead>

                  ))
                }


              </TableRow>


            </TableHeader>




            <TableBody>


              {
                loading ?

                (

                  Array
                  .from({
                    length:5
                  })
                  .map((_,index)=>(

                    <TableRow
                      key={index}
                    >

                      {
                        columns.map(column=>(

                          <TableCell
                            key={
                              String(column.key)
                            }
                          >

                            <Skeleton
                              className="
                                h-5
                                w-full
                              "
                            />

                          </TableCell>

                        ))
                      }


                    </TableRow>


                  ))

                )


                :


                paginatedData.length === 0 ?


                (

                  <TableRow>


                    <TableCell

                      colSpan={
                        columns.length
                      }

                      className="
                        text-center
                        h-24
                        text-muted-foreground
                      "

                    >

                      Nenhum registro encontrado.


                    </TableCell>


                  </TableRow>

                )


                :


                (

                  paginatedData.map(
                    (item,index)=>(


                    <TableRow
                      key={index}
                    >


                      {
                        columns.map(column=>(


                          <TableCell

                            key={
                              String(column.key)
                            }

                          >


                            {

                              column.render

                              ?

                              column.render(item)

                              :

                              String(
                                item[
                                  column.key as keyof T
                                ] ?? ""
                              )

                            }


                          </TableCell>


                        ))
                      }


                    </TableRow>


                  ))

                )

              }


            </TableBody>


          </Table>


        </div>




        {

          totalPages > 1 && (

            <DataTablePagination


              page={page}


              totalPages={
                totalPages
              }


              totalItems={
                filteredData.length
              }


              pageSize={
                pageSize
              }


              onPageChange={
                setPage
              }


            />

          )

        }



      </CardContent>


    </Card>

  );

}