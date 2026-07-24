"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  listarEspecies,
  excluirEspecie,
  Especie,
} from "@/services/especies";

import { DataTable } from "@/components/datatable/data-table";
import { EspecieDialog } from "@/components/especies/especie-dialog";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { Button } from "@/components/ui/button";

export default function EspeciesPage() {
  const [especies,setEspecies] = useState<Especie[]>([]);
  const [loading,setLoading] = useState(true);
  const [selected,setSelected] = useState<Especie | null>(null);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [deleteLoading,setDeleteLoading] = useState(false);

  async function carregar(){
      try{
          setLoading(true);
          const data = await listarEspecies();
          setEspecies(data);
      }catch(error){
          toast.error(
              "Erro ao carregar espécies."
          );
      }finally{
          setLoading(false);
      }
  }

  useEffect(()=>{
      carregar();
  },[]);

  function abrirExcluir(
      especie:Especie
  ){
      setSelected(especie);
      setDeleteOpen(true);
  }

  async function confirmarExcluir(){
    if(!selected) return;
    try{
        setDeleteLoading(true);
        await excluirEspecie(
            selected.espId
        );

        toast.success(
            "Espécie excluída."
        );

        carregar();

    }catch(error){
        toast.error(
            "Erro ao excluir espécie."
        );
    }finally{
        setDeleteLoading(false);
        setDeleteOpen(false);
        setSelected(null);
    }
  }

  const columns = [
    {
      key:"espId",
      title:"Código",
    },
    {
      key:"espNome",
      title:"Espécie",
    },
    {
      key:"acoes",
      title:"Ações",
      render:(item:Especie)=>(
        <div className="flex gap-2">
            <EspecieDialog
                especie={item}
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
        <EspecieDialog
            onSuccess={carregar}
        />
      </div>

      <DataTable
          data={especies}
          columns={columns}
          loading={loading}
          searchField="espNome"
          searchPlaceholder="Buscar espécie..."
      />

      <DeleteDialog
          open={deleteOpen}
          loading={deleteLoading}
          onOpenChange={setDeleteOpen}
          onConfirm={confirmarExcluir}
          title="Excluir espécie"
          description="Deseja realmente remover esta espécie?"
          itemName={
              selected?.espNome
          }
      />
    </div>
  );

}