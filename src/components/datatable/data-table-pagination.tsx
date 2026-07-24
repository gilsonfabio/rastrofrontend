"use client";


import { Button } from "@/components/ui/button";


interface DataTablePaginationProps {


    page:number;

    totalPages:number;

    totalItems:number;

    pageSize:number;

    onPageChange:(page:number)=>void;


}


export function DataTablePagination({

    page,

    totalPages,

    totalItems,

    pageSize,

    onPageChange,

}:DataTablePaginationProps){



    const inicio =
        totalItems === 0
        ? 0
        : ((page - 1) * pageSize) + 1;



    const fim =
        Math.min(
            page * pageSize,
            totalItems
        );



    return (

        <div className="
            flex
            items-center
            justify-between
            pt-4
        ">


            <p className="
                text-sm
                text-muted-foreground
            ">

                Mostrando {inicio} até {fim}
                {" "}de{" "}
                {totalItems}

            </p>



            <div className="
                flex
                gap-2
            ">


                <Button

                    variant="outline"

                    size="sm"

                    disabled={
                        page <= 1
                    }

                    onClick={()=>
                        onPageChange(page-1)
                    }

                >

                    Anterior

                </Button>



                <Button

                    variant="outline"

                    size="sm"

                    disabled={
                        page >= totalPages
                    }

                    onClick={()=>
                        onPageChange(page+1)
                    }

                >

                    Próxima

                </Button>


            </div>


        </div>

    );

}