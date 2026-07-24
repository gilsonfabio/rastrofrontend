"use client";

import { useEffect } from "react";

import {
  useForm
} from "react-hook-form";

import {
  zodResolver
} from "@hookform/resolvers/zod";

import {
  z
} from "zod";

import {
  toast
} from "sonner";


import {
  Button
} from "@/components/ui/button";


import {
  Input
} from "@/components/ui/input";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import {
  criarEspecie,
  atualizarEspecie,
  Especie,
} from "@/services/especies";



const especieSchema = z.object({

  espNome: z
    .string()
    .min(
      2,
      "Informe o nome da espécie."
    )
    .max(
      50,
      "Máximo de 50 caracteres."
    ),

});



type EspecieFormData =
  z.infer<typeof especieSchema>;



interface EspecieFormProps {


  especie?: Especie;


  onSuccess?: () => void;


}



export function EspecieForm({

  especie,

  onSuccess,

}: EspecieFormProps) {



  const form =
    useForm<EspecieFormData>({

      resolver:
        zodResolver(
          especieSchema
        ),

      defaultValues:{
        espNome:""
      }

    });





  useEffect(()=>{


    if(especie){


      form.reset({

        espNome:
          especie.espNome

      });


    }


  },[
    especie,
    form
  ]);







  async function onSubmit(
    values:EspecieFormData
  ){


    try {



      if(especie){


        await atualizarEspecie(

          especie.espId,

          values

        );



        toast.success(
          "Espécie atualizada com sucesso."
        );


      }

      else {



        await criarEspecie(

          values

        );



        toast.success(
          "Espécie cadastrada com sucesso."
        );


      }



      onSuccess?.();




    }

    catch(error:any){


      toast.error(

        error?.response?.data?.error ??

        "Erro ao salvar espécie."

      );


    }



  }







  return (


    <Form {...form}>


      <form

        onSubmit={
          form.handleSubmit(
            onSubmit
          )
        }

        className="space-y-5"

      >



        <FormField


          control={
            form.control
          }


          name="espNome"


          render={({field})=>(


            <FormItem>


              <FormLabel>

                Nome da espécie

              </FormLabel>



              <FormControl>


                <Input

                  placeholder="
                    Ex: Cachorro
                  "

                  {...field}

                />


              </FormControl>



              <FormMessage />


            </FormItem>


          )}


        />






        <div className="
          flex
          justify-end
          gap-3
        ">


          <Button

            type="submit"

            disabled={
              form.formState
              .isSubmitting
            }

          >


            {

              form.formState
              .isSubmitting

              ?

              "Salvando..."

              :

              especie

              ?

              "Atualizar"

              :

              "Salvar"

            }


          </Button>



        </div>




      </form>


    </Form>


  );

}