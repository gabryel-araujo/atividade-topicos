import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import "./styles.css";
import type React from "react";
import {
  categoriesData,
  TransactionDict,
  type BillType,
  type Categories,
} from "../../types/types";
import { MainContainer } from "../MainContainer";
import { useContext } from "react";
import { ViewContext } from "../../contexts/ViewContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const schema = z.object({
  type: z.string().min(3, "O tipo precisa de pelo menos 3 caracteres"),
  value: z.coerce.number().positive("O valor inserido deve ser maior que 0"),
  category: z.string().min(1, "Selecione uma opção"),
});

type FormData = z.infer<typeof schema>;

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "receipt" | "expense" | "balance" | "card";
};

export function Modal({ open, setOpen, type }: ModalProps) {
  const { setAccountData } = useContext(ViewContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function handleVerifyTransaction(data: FormData) {
    const newTransaction: BillType = {
      title: data.type,
      value: data.value,
      category: data.category as Categories,
    };

    if (type === "receipt") {
      setAccountData((prev) => ({
        ...prev,
        arrReceipts: [...prev.arrReceipts, newTransaction],
      }));
    } else if (type === "expense") {
      setAccountData((prev) => ({
        ...prev,
        arrExpenses: [...prev.arrExpenses, newTransaction],
      }));
    } else if (type === "card") {
      setAccountData((prev) => ({
        ...prev,
        arrCard: [...prev.arrCard, newTransaction],
      }));
    }

    setOpen(false);
    toast.success(`${TransactionDict[type].title} cadastrada com sucesso!`);
  }

  const label = type !== "card" ? `${TransactionDict[type].title}s` : "Despesa";

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Adicionar {label}</Dialog.Title>
          <MainContainer>
            <div className="Fildset">
              <label className="Label" htmlFor="type">
                Tipo
              </label>
              <input
                className="Input"
                id="type"
                placeholder="Digite aqui..."
                {...register("type")}
              />
              {errors.type && <p className="error">{errors.type.message}</p>}
            </div>

            <div className="Fildset">
              <label className="Label" htmlFor="category">
                Categoria
              </label>
              <select className="Input" id="category" {...register("category")}>
                <option value="">Selecione...</option>
                {categoriesData.map((category) => {
                  return <option value={category}>{category}</option>;
                })}
              </select>
              {errors.category && (
                <p className="error">{errors.category.message}</p>
              )}
            </div>

            <div className="Fildset">
              <label className="Label" htmlFor="value">
                Valor
              </label>
              <input
                className="Input"
                id="value"
                placeholder="R$2000,00"
                type="number"
                {...register("value")}
              />
              {errors.value && <p className="error">{errors.value.message}</p>}
            </div>
          </MainContainer>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button
                className="Button green"
                onClick={handleSubmit(handleVerifyTransaction)}
              >
                Salvar
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
