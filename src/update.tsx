import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { MyTableWithoutPaper } from "./table";

import { updateList } from "./data";

export type UpdateProgram = {
  changeSkill: number;
  powerUp: number;
  extend: number;
  radicalization: number;
  paint: number;
  unite: number;
  rayConstruction: number;
  addVariation: number;
  exploit: number;
  homing: number;
  repair: number;
  summon: number;
};

const paddingRight = { paddingRight: "0.5em" };

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>特典名</TableCell>
        <TableCell align="center">回数</TableCell>
        <TableCell align="center">経験点</TableCell>
        <TableCell style={paddingRight}>効果</TableCell>
        <TableCell align="center">参照P</TableCell>
      </TableRow>
    </TableHead>
  );
};

const UpdateTr = ({
  index,
  value,
  setState
}: {
  index: number;
  value: number;
  setState: any;
}) => {
  return (
    <TableRow key={index}>
      <TableCell>{updateList[index].label}</TableCell>
      <TableCell align="center">
        <TextField style={{ width: "2em" }} value={value} onChange={setState} />
      </TableCell>
      <TableCell align="center">{updateList[index].cost}</TableCell>
      <TableCell style={paddingRight}>{updateList[index].desc}</TableCell>
      <TableCell align="center">{updateList[index].page}</TableCell>
    </TableRow>
  );
};

export type UpdateState = [
  UpdateProgram,
  React.Dispatch<React.SetStateAction<UpdateProgram>>
];

export const Update = ({ updateState }: { updateState: UpdateState }) => {
  const isUpdated = updateList.some(
    (update) => Number(updateState[0][update.name]) > 0
  );
  return (
    <Accordion defaultExpanded={isUpdated}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>アップデート特典</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}>
        <MyTableWithoutPaper title="">
          <Header />
          <TableBody>
            {updateList.map((_, index) => {
              const name = updateList[index].name;
              type Target = { target: { value: number } };

              const setState = ({ target }: Target) => {
                return updateState[1]({
                  ...updateState[0],
                  [name]: target.value
                });
              };

              return (
                <UpdateTr
                  index={index}
                  value={updateState[0]?.[name] ?? 0}
                  setState={setState}
                />
              );
            })}
          </TableBody>
        </MyTableWithoutPaper>
      </AccordionDetails>
    </Accordion>
  );
};
