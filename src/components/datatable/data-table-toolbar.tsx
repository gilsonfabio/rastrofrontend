"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";


interface DataTableToolbarProps {

    search: string;

    setSearch: (value:string)=>void;

    placeholder?: string;

    action?: React.ReactNode;

}


export function DataTableToolbar({

    search,

    setSearch,

    placeholder="Pesquisar...",

    action,

}:DataTableToolbarProps){


    return (

        <div className="flex items-center justify-between gap-4">


            <div className="relative max-w-sm flex-1">


                <Search

                    className="
                        absolute
                        left-3
                        top-3
                        h-4
                        w-4
                        text-muted-foreground
                    "

                />


                <Input

                    value={search}

                    onChange={(e)=>
                        setSearch(e.target.value)
                    }

                    placeholder={placeholder}

                    className="pl-9 pr-9"

                />


                {
                    search && (

                        <Button

                            type="button"

                            variant="ghost"

                            size="icon"

                            className="
                                absolute
                                right-1
                                top-1
                                h-8
                                w-8
                            "

                            onClick={()=>
                                setSearch("")
                            }

                        >

                            <X className="h-4 w-4"/>

                        </Button>

                    )
                }


            </div>


            {
                action && (

                    <div>

                        {action}

                    </div>

                )
            }


        </div>

    );

}