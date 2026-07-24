"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  listarTutores,
  excluirTutor,
  Tutor,
} from "@/services/tutores";
import { useSession } from "next-auth/react";

import { DataTable } from "@/components/datatable/data-table";
import { TutorDialog } from "@/components/tutores/tutor-dialog";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { Button } from "@/components/ui/button";

export default function TutoresPage() {
  const [tutores,setTutores] = useState<Tutor[]>([]);
  const [loading,setLoading] = useState(true);
  const [selected,setSelected] = useState<Tutor | null>(null);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [deleteLoading,setDeleteLoading] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Status:", status);
    console.log("Session:", session);
  }, [status, session]);

  async function carregar(){
      console.log("Session:", session);
      console.log("User:", session?.user);
      console.log("empresaId:", session?.user?.empresaId);
      console.log("typeof:", typeof session?.user?.empresaId);
      console.log("Condição:", !session?.user?.empresaId);

      if (!session?.user?.empresaId) {
        toast.error("Empresa não encontrada.");
        return;
      }
       
      const empresaId = session?.user?.empresaId;

      try{
          setLoading(true);
          const data = await listarTutores(empresaId);
          setTutores(data);
      }catch(error){
          toast.error(
              "Erro ao carregar tutores."
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
      tutor:Tutor
  ){
      setSelected(tutor);
      setDeleteOpen(true);
  }

  async function confirmarExcluir(){
    if(!selected) return;
    try{
        setDeleteLoading(true);
        await excluirTutor(
            selected.tutId
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
      key:"tutId",
      title:"Código",
    },
    {
      key:"tutNome",
      title:"Espécie",
    },
    {
      key:"tutEmpId",
      title:"Empresa",
    },
    {
      key:"acoes",
      title:"Ações",
      render:(item:Tutor)=>(
        <div className="flex gap-2">
            <TutorDialog
                tutor={item}
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
            Tutores
          </h1>
          <p className="text-muted-foreground">
            Cadastro de Tutores.
          </p>
        </div>
        <TutorDialog
            onSuccess={carregar}
        />
      </div>

      <DataTable
          data={tutores}
          columns={columns}
          loading={loading}
          searchField="tutNome"
          searchPlaceholder="Buscar tutor..."
      />

      <DeleteDialog
          open={deleteOpen}
          loading={deleteLoading}
          onOpenChange={setDeleteOpen}
          onConfirm={confirmarExcluir}
          title="Excluir tutor"
          description="Deseja realmente remover este tutor?"
          itemName={
              selected?.tutNome
          }
      />
    </div>
  );

}