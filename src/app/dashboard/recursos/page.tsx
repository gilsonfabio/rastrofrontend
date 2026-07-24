"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  listarRecursos,
  excluirRecurso,
  Recurso,
} from "@/services/recursos";
import { useSession } from "next-auth/react";

import { DataTable } from "@/components/datatable/data-table";
import { RecursoDialog } from "@/components/recursos/recurso-dialog";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { Button } from "@/components/ui/button";

export default function RecursosPage() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading,setLoading] = useState(true);
  const [selected,setSelected] = useState<Recurso | null>(null);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [deleteLoading,setDeleteLoading] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Status:", status);
    console.log("Session:", session);
  }, [status, session]);

  async function carregar(){
      if (!session?.user?.empresaId) {
        toast.error("Empresa não encontrada.");
        return;
      }
       
      const empresaId = session?.user?.empresaId;

      try{
          setLoading(true);
          const data = await listarRecursos(empresaId);
          setRecursos(data);
      }catch(error){
          toast.error(
              "Erro ao carregar recursos."
          );
      }finally{
          setLoading(false);
      }
  }
   
  useEffect(() => {
    if (session?.user?.empresaId) {
      carregar();
    }
  }, [session]);
     
  function abrirExcluir(
      recurso:Recurso
  ){
      setSelected(recurso);
      setDeleteOpen(true);
  }

  async function confirmarExcluir(){
    if(!selected) return;
    try{
        setDeleteLoading(true);
        await excluirRecurso(
            selected.recId
        );

        toast.success(
            "Recurso excluído."
        );

        carregar();

    }catch(error){
        toast.error(
            "Erro ao excluir Recurso."
        );
    }finally{
        setDeleteLoading(false);
        setDeleteOpen(false);
        setSelected(null);
    }
  }

  const columns = [
    {
      key:"recId",
      title:"Código",
    },
    {
      key:"recNome",
      title:"Espécie",
    },
    {
      key:"recEmpId",
      title:"Empresa",
    },
    {
      key:"acoes",
      title:"Ações",
      render:(item:Recurso)=>(
        <div className="flex gap-2">
            <RecursoDialog
                recurso={item}
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
            Recursos
          </h1>
          <p className="text-muted-foreground">
            Cadastro de Recursos.
          </p>
        </div>
        <RecursoDialog
            onSuccess={carregar}
        />
      </div>

      <DataTable
          data={recursos}
          columns={columns}
          loading={loading}
          searchField="recNome"
          searchPlaceholder="Buscar serviços..."
      />

      <DeleteDialog
          open={deleteOpen}
          loading={deleteLoading}
          onOpenChange={setDeleteOpen}
          onConfirm={confirmarExcluir}
          title="Excluir Serviço"
          description="Deseja realmente remover este recurso?"
          itemName={
              selected?.recNome
          }
      />
    </div>
  );

}