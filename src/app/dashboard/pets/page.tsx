"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  listarPets,
  excluirPet,
  Pet,
} from "@/services/pets";
import { useSession } from "next-auth/react";

import { DataTable } from "@/components/datatable/data-table";
import { PetDialog } from "@/components/pets/pet-dialog";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { Button } from "@/components/ui/button";

export default function TutoresPage() {
  const [pets,setPets] = useState<Pet[]>([]);
  const [loading,setLoading] = useState(true);
  const [selected,setSelected] = useState<Pet | null>(null);
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
          const data = await listarPets(empresaId);
          setPets(data);
      }catch(error){
          toast.error(
              "Erro ao carregar pets."
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
      pet:Pet
  ){
      setSelected(pet);
      setDeleteOpen(true);
  }

  async function confirmarExcluir(){
    if(!selected) return;
    try{
        setDeleteLoading(true);
        await excluirPet(
            selected.petId
        );

        toast.success(
            "Pet excluído."
        );

        carregar();

    }catch(error){
        toast.error(
            "Erro ao excluir pet."
        );
    }finally{
        setDeleteLoading(false);
        setDeleteOpen(false);
        setSelected(null);
    }
  }

  const columns = [
    {
      key:"petId",
      title:"Código",
    },
    {
      key:"petNome",
      title:"Espécie",
    },
    {
      key:"petEmpId",
      title:"Empresa",
    },
    {
      key:"acoes",
      title:"Ações",
      render:(item:Pet)=>(
        <div className="flex gap-2">
            <PetDialog
                pet={item}
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
            Pets
          </h1>
          <p className="text-muted-foreground">
            Cadastro de Pets.
          </p>
        </div>
        <PetDialog
            onSuccess={carregar}
        />
      </div>

      <DataTable
          data={pets}
          columns={columns}
          loading={loading}
          searchField="petNome"
          searchPlaceholder="Buscar pet..."
      />

      <DeleteDialog
          open={deleteOpen}
          loading={deleteLoading}
          onOpenChange={setDeleteOpen}
          onConfirm={confirmarExcluir}
          title="Excluir Pet"
          description="Deseja realmente remover este pet?"
          itemName={
              selected?.petNome
          }
      />
    </div>
  );

}