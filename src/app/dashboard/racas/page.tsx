"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  listarRacas,
  excluirRaca,
  Raca,
} from "@/services/racas";

import { DataTable } from "@/components/datatable/data-table";
import { RacaDialog } from "@/components/racas/raca-dialog";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { Button } from "@/components/ui/button";

export default function RacasPage() {
  const [racas,setRacas] = useState<Raca[]>([]);
  const [loading,setLoading] = useState(true);
  const [selected,setSelected] = useState<Raca | null>(null);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [deleteLoading,setDeleteLoading] = useState(false);

  async function carregar(){
      try{
          setLoading(true);
          const data = await listarRacas();
          setRacas(data);
      }catch(error){
          toast.error(
              "Erro ao carregar raças."
          );
      }finally{
          setLoading(false);
      }
  }

  useEffect(()=>{
      carregar();
  },[]);

  function abrirExcluir(
      raca:Raca
  ){
      setSelected(raca);
      setDeleteOpen(true);
  }

  async function confirmarExcluir(){
    if(!selected) return;
    try{
        setDeleteLoading(true);
        await excluirRaca(
            selected.racId
        );

        toast.success(
            "Raça excluída."
        );

        carregar();

    }catch(error){
        toast.error(
            "Erro ao excluir raça."
        );
    }finally{
        setDeleteLoading(false);
        setDeleteOpen(false);
        setSelected(null);
    }
  }

  const columns = [
    {
      key:"racId",
      title:"Código",
    },
    {
      key:"racNome",
      title:"Espécie",
    },
    {
      key:"racEspId",
      title:"Espécie",
    },
    {
      key:"acoes",
      title:"Ações",
      render:(item:Raca)=>(
        <div className="flex gap-2">
            <RacaDialog
                raca={item}
                onSuccess={carregar}
            />
            <Button
                size="icon"
                variant="ghost"
                className="text-red-600"
                onClick={()=>abrirExcluir(item)}
            >
                🗑️
            </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Espécies
          </h1>
          <p className="text-muted-foreground">
            Cadastro global de espécies.
          </p>
        </div>
        <RacaDialog
            onSuccess={carregar}
        />
      </div>

      <DataTable
          data={racas}
          columns={columns}
          loading={loading}
          searchField="racNome"
          searchPlaceholder="Buscar raça..."
      />

      <DeleteDialog
          open={deleteOpen}
          loading={deleteLoading}
          onOpenChange={setDeleteOpen}
          onConfirm={confirmarExcluir}
          title="Excluir espécie"
          description="Deseja realmente remover esta raça?"
          itemName={
              selected?.racNome
          }
      />
    </div>
  );

}