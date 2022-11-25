import { Button, Card, FlexLayout } from "@cedcommerce/ounce-ui";
import { useCallback, useEffect, useState } from "react";
import { GroupProps, RowArrayType } from "../../../types/types";
import Row from "./Row";

function Group({ groupId, setGroupArrayMemo, nGroups }: GroupProps) {
  const [rowArray, setRowArray] = useState<RowArrayType[]>([
    {
      id: Math.floor(Math.random() * 448164465),
      first: "",
      second: "",
      third: "",
    },
  ]);

  const handleAddRow = () => {
    setRowArray((prev) => {
      return [
        ...prev,
        {
          id: Math.floor(Math.random() * 448164465),
          first: "",
          second: "",
          third: "",
        },
      ];
    });
  };

  const handleDeleteGroup = () => {
    setGroupArrayMemo((prev) => {
      return prev.filter((grp) => grp.id !== groupId);
    });
  };

  const setRowArrayMemo = useCallback(setRowArray, [setRowArray]);

  useEffect(() => {
    setGroupArrayMemo((prev) => {
      return prev.map((pgrp) => {
        if (pgrp.id === groupId) return { ...pgrp, rowsArray: rowArray };
        return pgrp;
      });
    });
  }, [rowArray]);

  return (
    <>
      <Card cardType="Bordered">
        <FlexLayout halign="fill">
          {nGroups > 1 && (
            <Button type="DangerPlain" onClick={handleDeleteGroup}>
              Delete Group
            </Button>
          )}
          <Button type="Plain" onClick={handleAddRow}>
            + Add Row
          </Button>
        </FlexLayout>
      </Card>
      {rowArray.map((row) => {
        return (
          <Row
            key={row.id}
            rowId={row.id}
            setRowArrayMemo={setRowArrayMemo}
            nRows={rowArray.length}
          />
        );
      })}
    </>
  );
}

export default Group;
