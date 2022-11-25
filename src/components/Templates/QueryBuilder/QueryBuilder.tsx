import { Button, Card, FlexLayout, Tag } from "@cedcommerce/ounce-ui";
import { useCallback, useEffect, useState } from "react";
import { GroupArrayType } from "../../../types/types";
import Group from "./Group";

interface QueryBuilderProps {
  query: string;
  setQueryMemo: React.Dispatch<React.SetStateAction<string>>;
}

function QueryBuilder({ setQueryMemo, query }: QueryBuilderProps) {
  const [groupArray, setGroupArray] = useState<GroupArrayType[]>([
    {
      id: Math.floor(Math.random() * 269655698),
      rowsArray: [],
    },
  ]);

  const handleAddGroup = () => {
    setGroupArray((prev) => {
      return [
        ...prev,
        {
          id: Math.floor(Math.random() * 269655698),
          rowsArray: [],
        },
      ];
    });
  };

  const setGroupArrayMemo = useCallback(setGroupArray, [setGroupArray]);

  useEffect(() => {
    let s: string = "";
    groupArray?.forEach((g, j) => {
      if (j > 0) {
        if (
          g.rowsArray.length &&
          g.rowsArray[0].first &&
          g.rowsArray[0].second &&
          g.rowsArray[0].third
        ) {
          s += " OR ";
        }
      }

      g.rowsArray?.forEach((r, i) => {
        const { first, second, third } = r;
        if (i > 0) {
          if (first !== "" && second !== "" && third !== "") {
            s += " AND ";
          }
        }
        if (first && second && third) {
          s += `${first} ${second} ${third}`;
        }
      });
    });

    setQueryMemo(s);
  }, [groupArray]);

  return (
    <FlexLayout spacing="loose" direction="vertical">
      <Card>{query && <Tag>{query}</Tag>}</Card>

      {groupArray.map((group) => {
        return (
          <Group
            key={group.id}
            groupId={group.id}
            setGroupArrayMemo={setGroupArrayMemo}
            nGroups={groupArray.length}
          />
        );
      })}
      <FlexLayout spacing="loose">
        <Button type="Outlined" onClick={handleAddGroup}>
          Add Group
        </Button>
        <Button type="Outlined">Run Query</Button>
      </FlexLayout>
    </FlexLayout>
  );
}

export default QueryBuilder;
