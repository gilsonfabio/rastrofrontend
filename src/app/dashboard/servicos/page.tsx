"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  listarServicos,
  excluirServico,
  Servico,
} from "@/services/servicos";
import { useSession } from "next-auth/react";

import { DataTable } from "@/components/datatable/data-table";
import { ServicoDialog } from "@/components/servicos/serv-dialog";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { Button } from "@/components/ui/button";

export default function ServicosPage() {
  const [servicos,setServicos] = useState<Servico[]>([]);
  const [loading,setLoading] = useState(true);
  const [selected,setSelected] = useState<Servico | null>(null);
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
          const data = await listarServicos(empresaId);
          setServicos(data);
      }catch(error){
          toast.error(
              "Erro ao carregar serviços."
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
      servico:Servico
  ){
      setSelected(servico);
      setDeleteOpen(true);
  }

  async function confirmarExcluir(){
    if(!selected) return;
    try{
        setDeleteLoading(true);
        await excluirServico(
            selected.serId
        );

        toast.success(
            "Tutor excluído."
        );

        carregar();

    }catch(error){
        toast.error(
            "Erro ao excluir tutor."
        );
    }finally{
        setDeleteLoading(false);
        setDeleteOpen(false);
        setSelected(null);
    }
  }

  const columns = [
    {
      key:"serId",
      title:"Código",
    },
    {
      key:"serNome",
      title:"Espécie",
    },
    {
      key:"serEmpId",
      title:"Empresa",
    },
    {
      key:"acoes",
      title:"Ações",
      render:(item:Servico)=>(
        <div className="flex gap-2">
            <ServicoDialog
                servico={item}
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
            Serviços
          </h1>
          <p className="text-muted-foreground">
            Cadastro de Serviços.
          </p>
        </div>
        <ServicoDialog
            onSuccess={carregar}
        />
      </div>

      <DataTable
          data={servicos}
          columns={columns}
          loading={loading}
          searchField="serNome"
          searchPlaceholder="Buscar serviços..."
      />

      <DeleteDialog
          open={deleteOpen}
          loading={deleteLoading}
          onOpenChange={setDeleteOpen}
          onConfirm={confirmarExcluir}
          title="Excluir Serviço"
          description="Deseja realmente remover este serviço?"
          itemName={
              selected?.serNome
          }
      />
    </div>
  );

}