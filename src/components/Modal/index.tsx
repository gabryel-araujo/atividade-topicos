import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import "./styles.css";
import type React from "react";
import { TransactionDict, type BillType } from "../../types/types";
import { MainContainer } from "../MainContainer";
import { useContext, useRef } from "react";
import { ViewContext } from "../../contexts/ViewContext";

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "receipt" | "expense" | "balance";
};

export function Modal({ open, setOpen, type }: ModalProps) {
  const { setAccountData } = useContext(ViewContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  function handleVerifyTransaction() {
    if (type === "receipt") {
      handleAddReceipt();
    } else if (type === "expense") {
      handleAddExpense();
    }
  }

  function handleAddReceipt() {
    const newReceipt: BillType = {
      title: titleRef.current!.value,
      value: Number(valueRef.current!.value),
    };

    setAccountData((prev) => ({
      ...prev,
      arrReceipts: [...prev.arrReceipts, newReceipt],
    }));
  }

  function handleAddExpense() {
    const newExpense: BillType = {
      title: titleRef.current!.value,
      value: Number(valueRef.current!.value),
    };

    setAccountData((prev) => ({
      ...prev,
      arrExpenses: [...prev.arrExpenses, newExpense],
    }));
  }

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Adicionar {TransactionDict[type].title}
          </Dialog.Title>
          <MainContainer>
            <div className="Fildset">
              <label className="Label" htmlFor="type">
                Tipo
              </label>
              <input
                className="Input"
                id="type"
                placeholder="Premiação"
                ref={titleRef}
              />
            </div>

            <div className="Fildset">
              <label className="Label" htmlFor="value">
                Valor
              </label>
              <input
                className="Input"
                id="value"
                placeholder="R$2000,00"
                ref={valueRef}
                type="number"
              />
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
                onClick={handleVerifyTransaction}
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
